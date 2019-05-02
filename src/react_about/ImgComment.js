import React, { Component } from 'react';
import { Tooltip, message, Popover, Input, Button } from 'antd';
import styles from './index.less';
import classNames from 'classnames/bind';
import withHover from './../HOC/withHover';
import { throttle } from './../../../src/utils/util';

const cx = classNames.bind(styles);
const { TextArea } = Input;
class ZoomPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgRealWidth: 0, //图片的实际宽度
      imgRealHeight: 0, //图片的实际高度
      imgWidth: 0, //图片应该显示的宽度
      imgHeight: 0, //图片应该显示的高度
      currentImgZoomPercent: '0%', //当前图片缩放的比例
      isCommentMode: false, //是否在图评模式
      isLongClick: false, //是否长按图片
      offsetLeft: 0, //拖拽图片的偏移量
      offsetTop: 0, //拖拽图片的偏移量

      // isCommitStart: false, //图评模式的时候，当mousedown的时候，判定为图评开始
      commitBlockWith: 48, //图评模式，图评开始之后，mousemove的水平距离，
      commitBlockHeight: 48, //图评模式，图评开始之后，mousemose的垂直距离，
      isShowCommitBlock: false, //是否显示评论块

      commitInputPlaceholder: '', //图评输入框 placeholder
      showCommitPublishBtn: false, //是否显示图评评论框发布按钮

      commitBlockPopoverVisible: false, //图评块 popover visible

      commitPublishText: '', //图评块的 textArea value
      isHideCommentList: false, //是否隐藏图评
    };

    // this.handleCommitBlockCornerMouseMove = throttle(
    //   this.handleCommitBlockCornerMouseMove,
    //   30
    // );
    //图片 wrapper ref
    this.imgRef = React.createRef();
    //容器视口 ref
    this.containerRef = React.createRef();
    //图评块 commitBlock ref
    this.commitBlockRef = React.createRef();
    //图评输入框 ref
    this.commitInputRef = React.createRef();

    //判定为长按的时长
    this.asLongClickTime = 500;
    //图片点击信息
    this.imgClickInfo = {
      mouseDown: {},
      mouseUp: {},
      mouseMove: {},
      imgInfo: {},
      containerInfo: {}
    };
    //图评块点击和移动信息
    this.commitBlockInfo = {
      mouseDown: {},
      mouseMove: {}
    };
    //点击图片的 mouseDown 计时器
    this.timer = null;
    //图片单击信息
    this.isMouseUp = false;
    //是否开始图评，在图评模式并且 mousedown 中，将 isCommitStart 置为 true,
    //mouseup 的时候，置为 false,
    this.isCommitStart = false;
    //是否用户手动调整图评块的大小，当mousedown之后，在 mousemove 中，将 isUserAdjustBlockSize 置为 true
    //当图评模式，开始图评，mousedown之后， 在mousemove事件中，将这一参数true
    this.isUserAdjustBlockSize = false;
    //是否开始调整 图评块的大小 ，在图评块的四个角处的块的mousedown 中置为 true,
    //在图评块的四个角处的块的mouseup中，置为false
    this.isCommitBlockResizeStart = false;
    //commentListItem zindex
    this.commentListItemZIndex = 10;
  }
  loadImage = url => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Could not load image at ' + url));
      image.src = url;
    });
  };
  setCurrentImgSize = (opts = {}) => {
    this.setState({ ...opts });
  };
  genCurrentImgZoomPercent = (type = 'reset') => {
    const { currentImgZoomPercent } = this.state;
    const { zoomStep } = this.props;
    const getNumFromStr = (str = '') => {
      let num = 0;
      try {
        num = parseInt(str);
      } catch (e) {
        return 0;
      }
      return num;
    };
    const cond = {
      reset: '100%',
      sup: `${getNumFromStr(currentImgZoomPercent) + getNumFromStr(zoomStep)}%`,
      sub: `${getNumFromStr(currentImgZoomPercent) - getNumFromStr(zoomStep)}%`
    };
    return cond[type];
  };
  handleOperator = key => {
    const {
      imgRealWidth,
      imgRealHeight,
      currentImgZoomPercent,
      offsetLeft,
      offsetTop
    } = this.state;
    const cond = {
      resetSize: () => {
        const isCurrentHasOnResetState =
          currentImgZoomPercent === '100%' &&
          offsetLeft === 0 &&
          offsetTop === 0;
        if (isCurrentHasOnResetState) return;
        this.setCurrentImgSize({
          imgWidth: imgRealWidth,
          imgHeight: imgRealHeight,
          currentImgZoomPercent: this.genCurrentImgZoomPercent('reset'),
          offsetLeft: 0,
          offsetTop: 0
        });
      },
      magnify: () => this.handleClickedImg(undefined, 'sup'),
      shrink: () => this.handleClickedImg(undefined, 'sub'),
      addCommit: () =>{
      const {isHideCommentList} = this.state
      if(isHideCommentList) return
        this.setState({
          isCommentMode: true,
          isLongClick: false
        })
      },
      hideCommit: () => {
      const {isHideCommentList} = this.state
        this.setState({
          isHideCommentList: !isHideCommentList,
        })
      },
      exitCommitMode: () =>
        this.setState({
          isCommentMode: false,
          isShowCommitBlock: false,
          commitBlockPopoverVisible: false,
          commitPublishText: ''
        })
    };
    cond[key]();
    console.log(key, 'operator key.');
  };
  getMoreImgInfo = () => {
    const {
      imgInfo: { url }
    } = this.props;
    const getImgWidthAndHeight = image => {
      if (!(image && image.width)) return;

      const {
        componentInfo: { width: containerWidth, height: containerHeight }
      } = this.props;
      //根据图片的容器尺寸和图片的实际尺寸，确定图片显示的初始尺寸
      const { width, height } = image;
      const { imgInitDisplayWidth, imgInitDisplayHeight } = this.genImgInitSize(
        containerWidth,
        containerHeight,
        width,
        height
      );
      this.setState({
        imgRealWidth: image.width,
        imgRealHeight: image.height,
        imgWidth: imgInitDisplayWidth,
        imgHeight: imgInitDisplayHeight,
        currentImgZoomPercent: `${parseInt(
          (imgInitDisplayWidth / image.width) * 100
        )}%`
      });
    };
    this.loadImage(url)
      .then(image => getImgWidthAndHeight(image))
      .catch(err => message.error('加载预览图片失败'));
  };
  updateImgSize = (imgWidth, imgHeight, zoomStep, type = 'sup') => {
    const { imgRealWidth, imgRealHeight } = this.state;
    //捕获缩放步进单位
    let getUnit = /^\d*(\S*)\s*$/.exec(zoomStep)[1];
    if (!getUnit) {
      //如果只是一个数字或纯数字的字符串那么按百分比处理
      getUnit = '%';
    }
    const unitCond = {
      px: ({
        imgWidth,
        imgHeight,
        zoomStep,
        type,
        imgRealWidth,
        imgRealHeight,
        which,
        aspectRadio
      }) => {
        //如果是 px 为单位， 那么就以宽高最大的为准
        //如果宽小于高
        //如果是加
        if (type === 'sup') {
          //如果宽高比小于1, 那么以高为准
          if (aspectRadio < 1) {
            const heightBulk = imgHeight + parseFloat(zoomStep);
            if (which === 'height') {
              return heightBulk;
            }
            return heightBulk * aspectRadio;
          } else {
            const widthBulk = imgWidth + parseFloat(zoomStep);
            if (which === 'width') {
              return widthBulk;
            }
            return widthBulk / aspectRadio;
          }
        } else {
          if (aspectRadio < 1) {
            const heightBulk = imgHeight - parseFloat(zoomStep);
            if (which === 'height') {
              return heightBulk;
            }
            return heightBulk * aspectRadio;
          } else {
            const widthBulk = imgWidth - parseFloat(zoomStep);
            if (which === 'width') {
              return widthBulk;
            }
            return widthBulk / aspectRadio;
          }
        }
      },
      '%': ({
        imgWidth,
        imgHeight,
        zoomStep,
        type,
        imgRealWidth,
        imgRealHeight,
        which,
        aspectRadio
      }) => {
        //如果是加
        if (type === 'sup') {
          //如果宽高比小于1, 那么以高为准
          if (aspectRadio < 1) {
            const heightBulk =
              imgHeight + imgRealHeight * (parseFloat(zoomStep) / 100);
            if (which === 'height') {
              return heightBulk;
            }
            return heightBulk * aspectRadio;
          } else {
            const widthBulk =
              imgWidth + imgRealWidth * (parseFloat(zoomStep) / 100);
            if (which === 'width') {
              return widthBulk;
            }
            return widthBulk / aspectRadio;
          }
        } else {
          if (aspectRadio < 1) {
            const heightBulk =
              imgHeight - imgRealHeight * (parseFloat(zoomStep) / 100);
            if (which === 'height') {
              return heightBulk;
            }
            return heightBulk * aspectRadio;
          } else {
            const widthBulk =
              imgWidth - imgRealWidth * (parseFloat(zoomStep) / 100);
            if (which === 'width') {
              return widthBulk;
            }
            return widthBulk / aspectRadio;
          }
        }
      }
    };
    const aspectRadio = imgRealWidth / imgRealHeight;
    //按比例缩放
    return {
      imgWidthUpdated: unitCond[getUnit]({
        imgWidth,
        imgHeight,
        zoomStep,
        type,
        imgRealWidth,
        imgRealHeight,
        which: 'width',
        aspectRadio
      }),
      imgHeightUpdated: unitCond[getUnit]({
        imgWidth,
        imgHeight,
        zoomStep,
        type,
        imgRealWidth,
        imgRealHeight,
        which: 'height',
        aspectRadio
      })
    };
  };
  handleImgOnMouseLeave = e => {
    if (e) e.stopPropagation();
    const { isLongClick } = this.state;
    if (isLongClick) {
      this.setState({
        isLongClick: false
      });
    }
  };
  genUserAdjustCommitBlock = e => {
    const { clientX, clientY } = e;
    if (clientX === null || clientY === null) return;
    const {
      mouseDown: { clientX: mouseDownClientX, clientY: mouseDownClientY }
    } = this.imgClickInfo;
    // const {mouseMove: {clientX: prevClientX, clientY: prevClientY}} = this.imgClickInfo
    // this.imgClickInfo = Object.assign({}, this.imgClickInfo, {mouseMove: {clientX, clientY}})

    const deltaX = clientX - mouseDownClientX;
    const deltaY = clientY - mouseDownClientY;

    this.setState(
      {
        commitBlockWith: Math.abs(deltaX),
        commitBlockHeight: Math.abs(deltaY),
        commitBlockPopoverVisible: false
      },
      () => {
        //因为确定图评框的位置是根据 mouseup 时的 clientX, clientY 确定的，
        //所以，这里实时修改其值
        this.imgClickInfo = Object.assign({}, this.imgClickInfo, {
          mouseUp: Object.assign({}, this.imgClickInfo.mouseUp, {
            clientX: mouseDownClientX + deltaX / 2,
            clientY: mouseDownClientY + deltaY / 2
          })
        });
      }
    );
  };
  handleImgWrapperOnMouseLeave = e => {
    //修复在图评模式的时候，如果是用户在调整评论框的大小，如果离开图片的边界，那么直接默认它选择最大
    this.isCommitStart = false;
  };
  handleImgOnMouseMove = e => {
    if (e) e.stopPropagation();
    const { isLongClick, isCommentMode } = this.state;

    this.isCommitBlockResizeStart = false;

    //如果是在非图评模式下
    if (!isCommentMode) {
      if (!isLongClick) {
        return;
      }
      //如果是长按模式下，那么
      const {
        mouseDown: { x, y }
      } = this.imgClickInfo;

      const { pageX, pageY } = e;
      const pageXFlag = pageX < 0 ? -1 : 1;
      const pageYFlag = pageY < 0 ? -1 : 1;

      this.setState(state => {
        const {
          commitBlockWith,
          commitBlockHeight,
          offsetLeft,
          offsetTop
        } = this.state;
        const {
          mouseUp: { clientX: mouseUpLeft, clientY: mouseUpTop },
          imgInfo: {
            top: imgTop,
            left: imgLeft,
            width: imgWidth,
            height: imgHeight
          },
          containerInfo: {
            top: containerTop,
            left: containerLeft,
            width: containerWidth,
            height: containerHeight
          }
        } = this.imgClickInfo;

        let imgOffsetLeftMax;
        let imgOffsetLeftMin;
        let imgOffsetTopMax;
        let imgOffsetTopMin;

        if (imgWidth < containerWidth) {
          imgOffsetLeftMin = 0;
          imgOffsetLeftMax = 0;
        }
        if (imgWidth >= containerWidth) {
          imgOffsetLeftMin = containerWidth - imgWidth;
          imgOffsetLeftMax = 0;
        }

        if (imgHeight < containerHeight) {
          imgOffsetTopMin = 0;
          imgOffsetTopMax = 0;
        }
        if (imgHeight >= containerHeight) {
          imgOffsetTopMax = 0;
          imgOffsetTopMin = containerHeight - imgHeight;
        }
        const imgOffsetLeft = Math.max(
          imgOffsetLeftMin,
          Math.min(
            imgOffsetLeftMax,
            offsetLeft * pageXFlag - (x - pageX) * 0.05
          )
        );
        const imgOffsetTop = Math.max(
          imgOffsetTopMin,
          Math.min(imgOffsetTopMax, offsetTop * pageYFlag - (y - pageY) * 0.05)
        );
        return {
          offsetLeft: imgOffsetLeft,
          offsetTop: imgOffsetTop
        };
        // return {
        //   offsetLeft: offsetLeft * pageXFlag - (x - pageX) * 0.05,
        //   offsetTop: offsetTop * pageYFlag - (y - pageY) * 0.05
        // };
      });
    } else {
      if (!this.isCommitStart) {
        return;
      }
      this.isUserAdjustBlockSize = true;

      const { isShowCommitBlock } = this.state;

      if (!isShowCommitBlock) {
        this.setState(
          {
            isShowCommitBlock: true
          },
          () => {
            this.genUserAdjustCommitBlock(e);
          }
        );
      } else {
        //动态生成用户评论框
        this.genUserAdjustCommitBlock(e);
      }

      console.log('================ adjust commit block ==============');
    }
  };
  handleImgOnMouseUp = e => {
    if (e) e.stopPropagation();
    console.log(
      '----------------------- mouseup info begin -----------------------------'
    );
    console.log(e, '============= e ====================');
    console.log(
      e.clientX,
      e.clientY,
      `============== clientX, clientY ====================`
    );
    if (this.imgRef) {
      console.log(
        this.imgRef.current.getBoundingClientRect(),
        '===========img getBoundingClientReact ==============='
      );
    }
    if (this.containerRef) {
      console.log(
        this.containerRef.current.getBoundingClientRect(),
        '=============== container getBoundingClientReact =================='
      );
    }
    console.log(
      e.pageX,
      e.pageY,
      '============ pageX, pageY ==================='
    );
    console.log(
      '-------------------------- mouseup info end --------------------------------------'
    );

    this.isMouseUp = true;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState({
      commitPublishText: ''
    });

    this.imgClickInfo.mouseMove = {};
    //如果是在非图评模式，通过直接点击图片放大的时候，会记录放大前的信息，
    //而不是本次点击，图片放大之后的信息
    const storeMouseUpInfo = () => {
      const { clientX, clientY, timeStamp, pageX, pageY } = e;
      const imgInfo = this.imgRef.current.getBoundingClientRect();
      const containerInfo = this.containerRef.current.getBoundingClientRect();
      this.imgClickInfo = Object.assign(
        {},
        this.imgClickInfo,
        { mouseUp: { timeStamp, x: pageX, y: pageY, clientX, clientY } },
        { imgInfo },
        { containerInfo }
      );
    };
    storeMouseUpInfo();
    const { isCommentMode } = this.state;
    //如果是在图评模式
    //有两种标定图评区域的方式
    //第一种，直接点击（mousedown, mouseup)，先生成一个固定大小的图评块，然后可以调整大小
    //第二种， 按住鼠标左键(mousedown, mousemove....), 直接拖拽鼠标调整图评块的大小，
    if (isCommentMode) {
      const isMouseNotMove = (mouseDownX, mouseDownY, mouseUpX, mouseUpY) => {
        const delta = 10;
        return (
          Math.abs(mouseDownX - mouseUpX) < delta &&
          Math.abs(mouseDownY - mouseUpY) < delta
        );
      };
      const {
        mouseDown: { x: mouseDownX, y: mouseDownY },
        mouseUp: { x: mouseUpX, y: mouseUpY }
      } = this.imgClickInfo;
      //如果mouse没有移动，并且没有触发 mousemove 事件， 那么说明是第一种方式
      //直接在点击位置，显示默认大小的图评块
      this.isCommitStart = false;
      if (
        isMouseNotMove(mouseDownX, mouseDownY, mouseUpX, mouseUpY) &&
        !this.isUserAdjustBlockSize
      ) {
        this.setState({
          isShowCommitBlock: true,
          commitBlockPopoverVisible: true
        });
        console.log('=============== solid commit block ==================');
      } else {
        const { commitBlockPopoverVisible } = this.state;
        if (!commitBlockPopoverVisible) {
          this.setState({
            commitBlockPopoverVisible: true
          });
        }
      }
    } else {
      const { isLongClick } = this.state;
      if (isLongClick) {
        //初始化长点击
        this.setState({
          isLongClick: false
        });
        return;
      }
      this.handleClickedImg(undefined, 'sup');
    }

    // const aisLongClick = ({mouseDown: {timeStamp: mouseDownTimeStamp}, mouseUp: {timeStamp: mouseUpTimeStamp}}, asLongClickTime) => {
    //   const timeBetween = mouseUpTimeStamp - mouseDownTimeStamp
    //   return timeBetween > asLongClickTime
    // }
    // if(isLongClick(this.imgClickInfo, this.asLongClickTime)) {
    //   return
    // }
  };
  handleImgOnMouseDown = e => {
    if (e) e.stopPropagation();
    this.isMouseUp = false;
    this.isUserAdjustBlockSize = false;

    const storeMouseDownInfo = () => {
      this.imgClickInfo.mouseDown = {
        timeStamp: e.timeStamp,
        x: e.pageX,
        y: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY
      };
    };
    storeMouseDownInfo();

    //如果是评论模式
    const { isCommentMode } = this.state;
    if (isCommentMode) {
      this.setState({
        commitBlockWith: 48,
        commitBlockHeight: 48
      });
      this.isCommitStart = true;
      this.imgClickInfo = Object.assign({}, this.imgClickInfo, {
        mouseMove: { clientX: e.clientX, clientY: e.clientY }
      });
    }

    //非评论模式
    const isLongTimeClick = () => {
      let result = false;
      const {
        mouseDown: { timeStamp }
      } = this.imgClickInfo;
      let currentTime = timeStamp;
      const that = this;
      this.timer = setInterval(() => {
        currentTime += 50;
        if (currentTime - timeStamp > this.asLongClickTime && !this.isMouseUp) {
          result = true;
          that.setState(
            {
              isLongClick: true
            },
            () => that.forceUpdate()
          );
          clearInterval(that.timer);
        }
      }, 50);
    };
    isLongTimeClick();
    console.log('mousedown timeStamp', e.timeStamp);
    console.log('mousedown x, y', e.pageX, e.pageY);
  };
  handleCommitBlockCornerMouseMove = (e, direction) => {
    if (e) e.stopPropagation();
    if (!this.isCommitBlockResizeStart) {
      return;
    }
    const { clientX, clientY } = e;

    if (clientX === null || clientY === null) return;
    this.setState(state => {
      const { commitBlockWith, commitBlockHeight } = state;
      const {
        mouseMove: { clientX: prevClientX, clientY: prevClientY }
      } = this.commitBlockInfo;

      this.commitBlockInfo = Object.assign({}, this.commitBlockInfo, {
        mouseMov: { clientX, clientY }
      });

      let deltaX = 0;
      let deltaY = 0;
      const rate = 0.12;
      if (direction === 'leftTop') {
        deltaX = prevClientX - clientX;
        deltaY = prevClientY - clientY;
      }
      if (direction === 'leftBottom') {
        deltaX = prevClientX - clientX;
        deltaY = clientY - prevClientY;
      }
      if (direction === 'rightTop') {
        deltaX = clientX - prevClientX;
        deltaY = prevClientY - clientY;
      }
      if (direction === 'rightBottom') {
        deltaX = clientX - prevClientX;
        deltaY = clientY - prevClientY;
      }
      const incrementX = deltaX * rate;
      const incrementY = deltaY * rate;

      //修改图评块的中心点
      const {
        mouseUp: { clientX: mouseUpClientX, clientY: mouseUpClientY }
      } = this.imgClickInfo;
      const mouseUpClientXDeltaX = incrementX / 2;
      const mouseUpClientYDeltaY = incrementY / 2;
      if (direction === 'leftTop') {
        Object.assign(this.imgClickInfo, {
          mouseUp: {
            clientX: mouseUpClientX - mouseUpClientXDeltaX,
            clientY: mouseUpClientY - mouseUpClientYDeltaY
          }
        });
      }
      if (direction === 'leftBottom') {
        Object.assign(this.imgClickInfo, {
          mouseUp: {
            clientX: mouseUpClientX - mouseUpClientXDeltaX,
            clientY: mouseUpClientY + mouseUpClientYDeltaY
          }
        });
      }
      if (direction === 'rightTop') {
        Object.assign(this.imgClickInfo, {
          mouseUp: {
            clientX: mouseUpClientX + mouseUpClientXDeltaX,
            clientY: mouseUpClientY - mouseUpClientYDeltaY
          }
        });
      }
      if (direction === 'rightBottom') {
        Object.assign(this.imgClickInfo, {
          mouseUp: {
            clientX: mouseUpClientX + mouseUpClientXDeltaX,
            clientY: mouseUpClientY + mouseUpClientYDeltaY
          }
        });
      }
      return {
        commitBlockWith: Math.abs(commitBlockWith + incrementX),
        commitBlockHeight: Math.abs(commitBlockHeight + incrementY)
      };
    });
    console.log('move move move move.....................');
  };
  handleCommitBlockCornerMouseUp = e => {
    if (e) e.stopPropagation();
    this.isCommitBlockResizeStart = false;
    this.isCommitStart = false;

    this.setState({
      commitBlockPopoverVisible: true
    });
    this.commitBlockInfo.mouseMove = {};
  };
  handleCommitBlockCornerMouseDown = e => {
    if (e) e.stopPropagation();
    this.isCommitBlockResizeStart = true;
    const { clientX, clientY } = e;
    this.commitBlockInfo.mouseMove = { clientX, clientY };
    this.setState({
      commitBlockPopoverVisible: false,
      commitPublishText: ''
    });

    this.commitBlockInfo = Object.assign({}, this.commitBlockInfo, {
      mouseDown: { x: clientX, y: clientY }
    });
  };
  handleCommitBlockWrapperOnMouseUp = e => {
    if (e) e.stopPropagation();
    if (this.isCommitStart) {
      this.isCommitStart = false;
    }
  };
  handleCommitBlockWrapperOnMouseMove = e => {
    if (e) e.stopPropagation();
    if (this.isCommitBlockResizeStart) {
      this.isCommitBlockResizeStart = false;
    }
    if (this.isCommitStart) {
      this.genUserAdjustCommitBlock(e);
      // this.isCommitStart = false
    }
  };
  handleClickedCommitBlockWrapper = e => {
    if (e) e.stopPropagation();
    this.setState({
      commitBlockPopoverVisible: true
    });
  };
  handleDoubleClickedImg = e => {
    if (e) e.stopPropagation();
    console.log('double click............................');
  };
  handleUpdataImgSize = type => {
    const { zoomStep, zoomMax } = this.props;
    const { imgWidth, imgHeight, currentImgZoomPercent } = this.state;

    //判断图片是否可以进一步缩放
    const isCanUpdateImgSize = (
      currentImgZoomPercent,
      zoomStep,
      zoomMax,
      type
    ) => {
      const enoughSmallPrompt = '不能缩到更小了';
      const enoughBigPrompt = '已经放大最大了';
      const isCurrentImgZoomIsEnoughSmall = (
        currentImgZoomPercent,
        zoomStep,
        type
      ) =>
        parseInt(currentImgZoomPercent) <= parseInt(zoomStep) && type === 'sub';
      const isCurrentImgZoomIsEnoughBig = (
        currentImgZoomPercent,
        zoomStep,
        zoomMax,
        type
      ) =>
        parseInt(zoomMax) - parseInt(currentImgZoomPercent) <=
          parseInt(zoomStep) && type === 'sup';
      if (
        isCurrentImgZoomIsEnoughSmall(currentImgZoomPercent, zoomStep, type)
      ) {
        message.info(enoughSmallPrompt);
        return false;
      }
      if (
        isCurrentImgZoomIsEnoughBig(
          currentImgZoomPercent,
          zoomStep,
          zoomMax,
          type
        )
      ) {
        message.info(enoughBigPrompt);
        return false;
      }
      return true;
    };

    if (!isCanUpdateImgSize(currentImgZoomPercent, zoomStep, zoomMax, type)) {
      return;
    }

    const { imgWidthUpdated, imgHeightUpdated } = this.updateImgSize(
      imgWidth,
      imgHeight,
      zoomStep,
      type
    );
    this.setCurrentImgSize({
      imgWidth: imgWidthUpdated,
      imgHeight: imgHeightUpdated,
      currentImgZoomPercent: this.genCurrentImgZoomPercent(type)
    });
  };
  handleAddCommit = e => {
    console.log(e, '=========== e =================');
    console.log('add a commit here ==========================');
  };
  handleClickedImg = (e, type = 'sup') => {
    if (e) e.stopPropagation();
    const { isCommentMode } = this.state;
    if (isCommentMode) {
      this.handleAddCommit(e);
    } else {
      this.handleUpdataImgSize(type);
    }
  };
  onCommitPublishTextChange = e => {
    this.setState({
      commitPublishText: e.target.value
    });
  };
  getCommitBlockPositionInfo = () => {
    const {
      left: commitBlockLeft,
      top: commitBlockTop
    } = this.commitBlockRef.current.getBoundingClientRect();
    const { imgRealWidth, commitBlockWith, commitBlockHeight } = this.state;

    const {
      imgInfo: { top: imgTop, left: imgLeft, width: imgWidth }
    } = this.imgClickInfo;

    const rate = imgWidth / imgRealWidth;

    const commitRealLeftRelativeImgReal = (commitBlockLeft - imgLeft) / rate;
    const commitRealTopRealativeImgReal = (commitBlockTop - imgTop) / rate;
    const commitRealWidth = commitBlockWith / rate;
    const commitRealHeight = commitBlockHeight / rate;
    return {
      x: commitRealLeftRelativeImgReal,
      y: commitRealTopRealativeImgReal,
      width: commitRealWidth,
      height: commitRealHeight
    };
  };
  handleCommitPublishText = e => {
    const { handleGetNewComment } = this.props;
    if (e) e.stopPropagation();
    const { x, y, width, height } = this.getCommitBlockPositionInfo();
    const { commitPublishText } = this.state;
    handleGetNewComment({
      coordinates: { x, y, width, height },
      comment: commitPublishText
    });
    this.setState({
      commitPublishText: ''
    });
    console.log(x, y, width, height, 'commit block position info.....');
  };
  handleFocusCommitInput = e => {
    if (e) e.stopPropagation();
    console.log('00000000000000000000000000000000000000000000000000000000000');
    this.setState({
      commitInputPlaceholder: '按 Enter 发布图评',
      showCommitPublishBtn: true
    });
  };

  genImgInitSize = (
    containerWidth,
    containerHeight,
    imgRealWidth,
    imgRealHeight
  ) => {
    //当图片的实际尺寸超过容器的尺寸的时候，容器的内边距
    const containerPadding = 20;
    //从字符串中解析数字，因为输入可能是 '600px' 之类的字符串
    const parseNum = str => parseFloat(str);
    //图片宽高比
    const aspectRadio = parseNum(imgRealWidth) / parseNum(imgRealHeight);

    const isImgSizeBiggerThanContainer = (container, img) => {
      return img > container;
    };

    //如果图片的宽高都小于容器的可用空间
    if (
      !isImgSizeBiggerThanContainer(
        parseNum(containerWidth) - containerPadding * 2,
        imgRealWidth
      ) &&
      !isImgSizeBiggerThanContainer(
        parseNum(containerHeight) - containerPadding * 2,
        imgRealHeight
      )
    ) {
      return {
        imgInitDisplayWidth: imgRealWidth,
        imgInitDisplayHeight: imgRealHeight
      };
    }

    //否则，就是图片不能在容器的可用空间中放得下，那么就需要按图片的宽高比缩小图片
    const isImgWidthBiggerThanHeight = (width, height) => width >= height;

    //确定图片的宽高，以较长的边为准
    if (isImgWidthBiggerThanHeight(imgRealWidth, imgRealHeight)) {
      const imgInitDisplayWidth =
        parseNum(containerWidth) - containerPadding * 2;
      return {
        imgInitDisplayWidth,
        imgInitDisplayHeight: imgInitDisplayWidth / aspectRadio
      };
    }
    const imgInitDisplayHeight =
      parseNum(containerHeight) - containerPadding * 2;
    return {
      imgInitDisplayWidth: imgInitDisplayHeight * aspectRadio,
      imgInitDisplayHeight
    };
  };
  genCommitBlockInfoNew = () => {
    //可能还会有颜色之类的选项
    const {
      commitBlockWith,
      commitBlockHeight,
      offsetLeft,
      offsetTop
    } = this.state;
    const {
      mouseUp: { clientX: mouseUpLeft, clientY: mouseUpTop },
      imgInfo: {
        top: imgTop,
        left: imgLeft,
        width: imgWidth,
        height: imgHeight
      },
      containerInfo: {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight
      }
    } = this.imgClickInfo;

    //之前考虑的是，图评块的位置相对于图片来做
    //但是因为图片是可以缩放的，所以转换思路，
    //根据位置固定的 img 的 content_weraper 来做更加简单

    //图评块的最大偏移量, 不能超过图片容器的范围，如果图片小于容器，那么也不能超过图片的范围。
    let commitBlockOffsetLeftRelativeImgMax;
    let commitBlockOffsetTopRelativeImgMax;
    let commitBlockOffsetLeftRelativeImgMin;
    let commitBlockOffsetTopRelativeImgMin;

    //如果图片的左边界比容器的左边界大，那么以图片的左边界为准
    if (imgLeft >= containerLeft) {
      commitBlockOffsetLeftRelativeImgMin = imgLeft - containerLeft;
      if (imgLeft + imgWidth >= containerLeft + containerWidth) {
        commitBlockOffsetLeftRelativeImgMax = containerWidth - commitBlockWith;
      } else {
        commitBlockOffsetLeftRelativeImgMax =
          imgLeft + imgWidth - containerLeft - commitBlockWith;
      }
    }
    if (imgLeft < containerLeft) {
      commitBlockOffsetLeftRelativeImgMin = 0;
      if (imgLeft + imgWidth >= containerLeft + containerWidth) {
        commitBlockOffsetLeftRelativeImgMax = containerWidth - commitBlockWith;
      } else {
        commitBlockOffsetLeftRelativeImgMax =
          imgLeft + imgWidth - containerLeft - commitBlockWith;
      }
    }

    if (imgTop >= containerTop) {
      commitBlockOffsetTopRelativeImgMin = imgTop - containerTop;
      if (imgTop + imgHeight >= containerTop + containerHeight) {
        commitBlockOffsetTopRelativeImgMax =
          containerHeight - commitBlockHeight;
      } else {
        commitBlockOffsetTopRelativeImgMax =
          imgTop + imgHeight - containerTop - commitBlockHeight;
      }
    }
    if (imgTop < containerTop) {
      commitBlockOffsetTopRelativeImgMin = 0;
      if (imgTop + imgHeight >= containerTop + containerHeight) {
        commitBlockOffsetTopRelativeImgMax =
          containerHeight - commitBlockHeight;
      } else {
        commitBlockOffsetTopRelativeImgMax =
          imgTop + imgHeight - containerTop - commitBlockHeight;
      }
    }

    //图评块相对于图片容器的偏移量
    const commitBlockOffsetLeftRelativeImgContainer = Math.max(
      commitBlockOffsetLeftRelativeImgMin,
      Math.min(
        mouseUpLeft - containerLeft - commitBlockWith / 2,
        commitBlockOffsetLeftRelativeImgMax
      )
    );
    const commitBlockOffsetTopRelativeImgContainer = Math.max(
      commitBlockOffsetTopRelativeImgMin,
      Math.min(
        mouseUpTop - containerTop - commitBlockHeight / 2,
        commitBlockOffsetTopRelativeImgMax
      )
    );

    //图评块 popover 方向
    //根据图评块的位置和图片容器的相对关系来确定
    //而图评块的位置可以通过mouseupTop,和 mouseupLeft 大致获得
    const containerCenterPointX = containerLeft + containerWidth / 2;
    const containerCenterPointY = containerTop + containerHeight / 2;
    const popoverPlacement = () => {
      if (mouseUpTop >= containerCenterPointY) {
        if (mouseUpLeft >= containerCenterPointX) {
          return 'leftBottom';
        }
        return 'rightBottom';
      } else {
        if (mouseUpLeft >= containerCenterPointX) {
          return 'leftTop';
        }
        return 'rightTop';
      }
    };

    return {
      commitBlockWith,
      commitBlockHeight,
      left: commitBlockOffsetLeftRelativeImgContainer,
      top: commitBlockOffsetTopRelativeImgContainer,
      popoverPlacement: popoverPlacement()
    };
  };
  genCommitBlockInfo = () => {
    //可能还会有颜色之类的选项
    const {
      commitBlockWith,
      commitBlockHeight,
      offsetLeft,
      offsetTop
    } = this.state;
    const {
      mouseUp: { clientX: mouseUpLeft, clientY: mouseUpTop },
      imgInfo: {
        top: imgTop,
        left: imgLeft,
        width: imgWidth,
        height: imgHeight
      },
      containerInfo: {
        top: containerTop,
        left: containerLeft,
        width: containerWidth,
        height: containerHeight
      }
    } = this.imgClickInfo;

    //图评块的限制，
    //它不可以超出图片容器的可视范围，
    //而且，如果图片没有铺满的情况下，它会受到图片的边界的限制
    //图评块的显示位置相对于图片的第一层父容器的位置的，但是因为图片的第一层父容器和图片的大小位置是一致的，
    //所以，可以认为它的位置是根据图片的位置偏移的(letf, top)

    //图评块的最大left偏移量： 最大偏移量 + 图评块大小 = containerClientX + container width
    // const commitBlockOffsetLeftRelativeImgMax = containerLeft + containerWidth - commitBlockWith * 2
    // const commitBlockOffsetTopRelativeImgMax = containerTop + containerHeight - commitBlockHeight / 2

    // const commitBlockOffsetLeftRelativeImgMax =  mouseUpLeft - imgLeft

    //图评块的最大偏移量和图片元素及container的大小关系有关
    let commitBlockOffsetLeftRelativeImgMax;
    let commitBlockOffsetTopRelativeImgMax;
    let commitBlockOffsetLeftRelativeImgMin;
    let commitBlockOffsetTopRelativeImgMin;

    if (imgWidth < containerWidth) {
      commitBlockOffsetLeftRelativeImgMax =
        imgWidth - commitBlockWith + offsetLeft;
      commitBlockOffsetLeftRelativeImgMin = 0 + offsetLeft;
    }
    if (imgHeight < containerHeight) {
      commitBlockOffsetTopRelativeImgMax =
        imgHeight - commitBlockHeight + offsetTop;
      commitBlockOffsetTopRelativeImgMin = 0 + offsetTop;
    }
    if (imgWidth >= containerWidth) {
      if (offsetLeft >= 0) {
        commitBlockOffsetLeftRelativeImgMin = 0 + offsetLeft;
        commitBlockOffsetLeftRelativeImgMax =
          containerLeft -
          imgLeft +
          containerWidth -
          commitBlockWith +
          offsetLeft;
      }
      if (offsetLeft < 0) {
        commitBlockOffsetLeftRelativeImgMin =
          containerLeft - imgLeft + offsetLeft;
        commitBlockOffsetLeftRelativeImgMax =
          containerLeft -
          imgLeft +
          containerWidth -
          commitBlockWith +
          offsetLeft;
      }
    }

    if (imgHeight >= containerHeight) {
      if (offsetTop >= 0) {
        commitBlockOffsetTopRelativeImgMin = 0 + offsetTop;
        commitBlockOffsetTopRelativeImgMax =
          containerTop -
          imgTop +
          containerHeight -
          commitBlockHeight +
          offsetTop;
      }
      if (offsetTop < 0) {
        commitBlockOffsetTopRelativeImgMin = containerTop - imgTop + offsetTop;
        commitBlockOffsetTopRelativeImgMax =
          containerTop -
          imgTop +
          containerHeight -
          commitBlockHeight +
          offsetTop;
      }
    }

    //图评块相对于图片的偏移量
    const commitBlockOffsetLeftRelativeImg = Math.max(
      commitBlockOffsetLeftRelativeImgMin,
      Math.min(
        mouseUpLeft - imgLeft - commitBlockWith / 2 + offsetLeft,
        commitBlockOffsetLeftRelativeImgMax
      )
    );
    const commitBlockOffsetTopRelativeImg = Math.max(
      commitBlockOffsetTopRelativeImgMin,
      Math.min(
        mouseUpTop - imgTop - commitBlockHeight / 2 + offsetTop,
        commitBlockOffsetTopRelativeImgMax
      )
    );

    //图评块相对于图片实际大小的偏移量
    //。。。

    //图评块 popover 方向
    //根据图评块的位置和图片容器的相对关系来确定
    //而图评块的位置可以通过mouseupTop,和 mouseupLeft 大致获得
    const containerCenterPointX = containerLeft + containerWidth / 2;
    const containerCenterPointY = containerTop + containerHeight / 2;
    const popoverPlacement = () => {
      if (mouseUpTop >= containerCenterPointY) {
        if (mouseUpLeft >= containerCenterPointX) {
          return 'leftBottom';
        }
        return 'rightBottom';
      } else {
        if (mouseUpLeft >= containerCenterPointX) {
          return 'leftTop';
        }
        return 'rightTop';
      }
    };

    return {
      commitBlockWith,
      commitBlockHeight,
      left: commitBlockOffsetLeftRelativeImg,
      top: commitBlockOffsetTopRelativeImg,
      popoverPlacement: popoverPlacement()
    };
  };
  componentDidMount() {
    //由于后台返回的图片信息中，没有图片的实际宽高等信息，需要手动获取
    this.getMoreImgInfo();
  }
  renderOperatorBar = () => {
    const { hovering } = this.props;
    const { currentImgZoomPercent, isCommentMode, isHideCommentList } = this.state;
    const operatorList = [
      {
        label: '缩小',
        key: 'shrink',
        onClick: () => this.handleOperator('shrink')
      },
      {
        label: currentImgZoomPercent,
        key: 'resetSize',
        toolTipText: '重置到100%大小',
        onClick: () => this.handleOperator('resetSize')
      },
      {
        label: '放大',
        key: 'magnify',
        onClick: () => this.handleOperator('magnify')
      },
      {
        label: '添加圈点评论',
        key: 'addCommit',
        disabled: isHideCommentList,
        onClick: () => this.handleOperator('addCommit')
      },
      {
        label: isHideCommentList ? '显示圈点' : '隐藏圈点',
        key: 'hideCommit',
        onClick: () => this.handleOperator('hideCommit')
      },
      {
        label: '全屏',
        key: 'fullScreen',
        onClick: () => this.handleOperator('fullScreen')
      }
    ];
    const operatorListWhenCommit = [
      {
        label: '退出圈点模式',
        key: 'exitCommitMode',
        onClick: () => this.handleOperator('exitCommitMode')
      }
    ];
    const wrapperClassName = cx({
      operatorBarWrapper: !isCommentMode ? true : false,
      commitModeOperatorBarWrapper: isCommentMode ? true : false,
      operatorBarWrapperOpacity: hovering ? false : true
    });
    const getOperatorBarCellClass = ({disabled}) => cx({
      operatorBarCell: true,
      operatorBarCellDisabled: !!disabled
    })
    return (
      <div className={wrapperClassName}>
        {!isCommentMode &&
          operatorList.map(i => (
            <Tooltip title={i.toolTipText} key={i.key}>
              <div onClick={i.onClick} className={getOperatorBarCellClass(i)}>
                {i.label}
              </div>
            </Tooltip>
          ))}
        {isCommentMode &&
          operatorListWhenCommit.map(i => (
            <div
              key={i.key}
              onClick={i.onClick}
              className={styles.operatorBarCell}
            >
              {i.label}
            </div>
          ))}
      </div>
    );
  };
  renderCommitBlockPopoverContent = () => {
    const {
      commitInputPlaceholder,
      showCommitPublishBtn,
      commitPublishText
    } = this.state;
    return (
      <div className={styles.commitPopoverContentWrapper}>
        <TextArea
          ref={this.commitInputRef}
          placeholder={commitInputPlaceholder}
          onPressEnter={e => this.handleCommitPublishText(e)}
          onFocus={e => this.handleFocusCommitInput(e)}
          value={commitPublishText}
          onChange={this.onCommitPublishTextChange}
        />
        {showCommitPublishBtn && (
          <div className={styles.commitPublishWrapper}>
            <Button
              type="primary"
              size="small"
              onClick={e => this.handleCommitPublishText(e)}
              disabled={!commitPublishText.trim()}
            >
              发布
            </Button>
          </div>
        )}
      </div>
    );
  };
  renderCommitBlock = () => {
    const {
      commitBlockWith,
      commitBlockHeight,
      left,
      top,
      popoverPlacement
    } = this.genCommitBlockInfoNew();
    // const {} = this.gen
    const { commitBlockPopoverVisible } = this.state;
    console.log(left, top, 'lllllllllllllllllllllllll');
    //相对于 img_wrapper, img_wrapper 和图片的尺寸保持一致
    const wrapperStyle = {
      width: commitBlockWith + 'px',
      height: commitBlockHeight + 'px',
      left: left + 'px',
      top: top + 'px'
    };
    return (
      <Popover
        content={this.renderCommitBlockPopoverContent()}
        title={null}
        placement={popoverPlacement}
        visible={commitBlockPopoverVisible}
      >
        <div
          className={styles.commitBlockWrapper}
          style={wrapperStyle}
          onMouseMove={e => this.handleCommitBlockWrapperOnMouseMove(e)}
          onMouseUp={e => this.handleCommitBlockWrapperOnMouseUp(e)}
          onClick={e => this.handleClickedCommitBlockWrapper(e)}
          ref={this.commitBlockRef}
        >
          <div
            className={styles.commitBlockBorder}
            style={{
              left: 0,
              top: 0,
              height: '16px',
              width: commitBlockWith
            }}
          />
          <div
            className={styles.commitBlockBorder}
            style={{
              right: 0,
              top: 0,
              height: commitBlockHeight,
              width: '16px'
            }}
          />
          <div
            className={styles.commitBlockBorder}
            style={{
              right: 0,
              bottom: 0,
              height: '16px',
              width: commitBlockWith
            }}
          />
          <div
            className={styles.commitBlockBorder}
            style={{
              left: 0,
              bottom: 0,
              height: commitBlockHeight,
              width: '16px'
            }}
          />
          <div
            className={`${styles.commitBlockCorner} ${
              styles.commitBlockCornerLeftTop
            }`}
            onMouseDown={e => this.handleCommitBlockCornerMouseDown(e)}
            onMouseUp={e => this.handleCommitBlockCornerMouseUp(e)}
            onMouseMove={e =>
              this.handleCommitBlockCornerMouseMove(e, 'leftTop')
            }
          />
          <div
            className={`${styles.commitBlockCorner} ${
              styles.commitBlockCornerRightTop
            }`}
            onMouseDown={e => this.handleCommitBlockCornerMouseDown(e)}
            onMouseUp={e => this.handleCommitBlockCornerMouseUp(e)}
            onMouseMove={e =>
              this.handleCommitBlockCornerMouseMove(e, 'rightTop')
            }
            style={{ right: 0, top: 0 }}
          />
          <div
            className={`${styles.commitBlockCorner} ${
              styles.commitBlockCornerRightBottom
            }`}
            onMouseDown={e => this.handleCommitBlockCornerMouseDown(e)}
            onMouseUp={e => this.handleCommitBlockCornerMouseUp(e)}
            onMouseMove={e =>
              this.handleCommitBlockCornerMouseMove(e, 'rightBottom')
            }
            style={{ right: 0, bottom: 0 }}
          />
          <div
            className={`${styles.commitBlockCorner} ${
              styles.commitBlockCornerLeftBottom
            }`}
            onMouseDown={e => this.handleCommitBlockCornerMouseDown(e)}
            onMouseUp={e => this.handleCommitBlockCornerMouseUp(e)}
            onMouseMove={e =>
              this.handleCommitBlockCornerMouseMove(e, 'leftBottom')
            }
            style={{ left: 0, bottom: 0 }}
          />
        </div>
      </Popover>
    );
  };
  getCommentBlockListItemPosition = (x, y, width, height) => {
    const {imgRealWidth, imgWidth} = this.state
    const rate = imgWidth / imgRealWidth
    return {
      offsetLeft: x * rate,
      offsetTop: y * rate,
      relativeWidth: width * rate,
      relativeHeight: height * rate,
    }

  }
  renderCommentList = () => {
    const {commentList} = this.props
    const commentBlockList = commentList.reduce((acc, curr) => {
      const isExisted = acc.find(i => i.flag === curr.flag)
      if(isExisted) return acc
      return [...acc, curr]
    }, [])

    return <>{commentBlockList.map(({flag, id, coordinates: {x, y, width, height} = {}}) => {
      const {offsetLeft, offsetTop, relativeWidth, relativeHeight} = this.getCommentBlockListItemPosition(x, y, width, height)
      const wrapperStyle = {
        left: offsetLeft + 'px',
        top: offsetTop + 'px',
        width: relativeWidth + 'px',
        height: relativeHeight + 'px',
        zIndex: this.commentListItemZIndex ++
      }
      return(<div key={id} style={wrapperStyle} className={styles.commentBlockListItemWrapper}><div className={styles.commentBlockListItemFlag}>{flag}</div></div>)
    })}</>
  }
  renderImg = () => {
    const {
      imgInfo: { url }
    } = this.props;
    const {
      isCommentMode,
      imgWidth,
      imgHeight,
      isLongClick,
      offsetLeft,
      offsetTop
    } = this.state;
    console.log(offsetTop, offsetLeft, '=============offset================');
    console.log(
      imgWidth,
      imgHeight,
      '=========================img width, img height==========================='
    );
    const imgStyle = {
      cursor: isCommentMode ? 'crosshair' : isLongClick ? 'grab' : 'zoom-in',
      width: imgWidth,
      height: imgHeight,
      top: offsetTop + 'px',
      left: offsetLeft + 'px'
    };
    const className = cx({
      content_img: true,
      content_img_cursor_grab: isLongClick ? true : false
    });
    return (
      <>
        <img
          // onClick={e => this.handleClickedImg(e)}
          // onDoubleClick={e => this.handleDoubleClickedImg(e)}
          draggable={false}
          onMouseDown={e => this.handleImgOnMouseDown(e)}
          onMouseUp={e => this.handleImgOnMouseUp(e)}
          onMouseMove={e => this.handleImgOnMouseMove(e)}
          onMouseLeave={e => this.handleImgOnMouseLeave(e)}
          className={className}
          src={url}
          style={imgStyle}
          alt=""
          ref={this.imgRef}
        />
      </>
    );
  };
  render() {
    const {
      imgInfo: { url },
      componentInfo: { width, height }
    } = this.props;
    const { imgWidth, imgHeight, isShowCommitBlock, isHideCommentList } = this.state;
    if (!url) return null;
    const wrapperStyle = {
      width,
      height
    };
    const containerWidthNum = parseFloat(width);
    const containerHeightNum = parseFloat(height);
    const imgWrapperStyle = {
      width: `${imgWidth}px`,
      height: `${imgHeight}px`,
      marginLeft: `${
        imgWidth > containerWidthNum
          ? 0
          : (containerWidthNum - imgWidth - 4) / 2
      }px`,
      marginRight: `${
        imgWidth > containerWidthNum
          ? 0
          : (containerWidthNum - imgWidth - 4) / 2
      }px`,
      marginTop: `${
        imgHeight > containerHeightNum
          ? 0
          : (containerHeightNum - imgHeight - 4) / 2
      }px`,
      marginBottom: `${
        imgHeight > containerHeightNum
          ? 0
          : (containerHeightNum - imgHeight - 4) / 2
      }px`
    };
    return (
      <div
        className={styles.wrapper}
        style={wrapperStyle}
        ref={this.containerRef}
      >
        <div className={styles.content_wrapper}>
          <div className={styles.img_wrapper} style={imgWrapperStyle}>
            {this.renderImg()}
            {!isHideCommentList && this.renderCommentList()}
          </div>
          {isShowCommitBlock && this.renderCommitBlock()}
        </div>
        <>{this.renderOperatorBar()}</>
      </div>
    );
  }
}

ZoomPicture.defaultProps = {
  imgInfo: {}, //需要预览的图片信息,
  componentInfo: {
    //组件信息
    width: '600px',
    height: '600px'
  },
  zoomStep: '10%', //缩放步进,每次点击放大缩小，图片变化的比例
  zoomMax: '500%', //最大的放大倍数
  handleGetNewComment: function(info) {
    //当新发布一个评论的时候，返回的信息
    // info:
    // {
    //   coordinates: {x, y, width, height},
    //   comment: commitPublishText,
    // }
  },
  //已有的图评列表
  commentList: [
    {
      update_time: '1556616000',
      flag: '1',
      full_name: '13600419123',
      create_time: '1556616000',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 180.3, y: 103, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123155024856354816',
      text: 'kjkljdkjfkjds',
      type: '1'
    },
    {
      update_time: '1556616097',
      flag: '2',
      full_name: '13600419123',
      create_time: '1556616097',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 227.3, y: 196, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123155432702087168',
      text: 'bbbbbbbbbbb',
      type: '1'
    },
    {
      update_time: '1556616105',
      flag: '2',
      full_name: '13600419123',
      create_time: '1556616105',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 227.3, y: 196, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123155464968867840',
      text: 'adsaaaaadfds',
      type: '1'
    },
    {
      update_time: '1556616489',
      flag: '4',
      full_name: '13600419123',
      create_time: '1556616489',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: {
        x: 18.299999999999997,
        y: 128,
        width: 48,
        height: 48,
        isAready: false
      },
      mobile: '13600419123',
      id: '1123157074788880384',
      text: 'sdfsdf',
      type: '1'
    },
    {
      update_time: '1556621666',
      flag: '5',
      full_name: '13600419123',
      create_time: '1556621666',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 298.3, y: 74, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123178791020138496',
      text: 'sdjfkdsj',
      type: '1'
    },
    {
      update_time: '1556622652',
      flag: '6',
      full_name: '13600419123',
      create_time: '1556622652',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 147.3, y: 275, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123182925035212800',
      text: 'iiiiiiiiiiiiiiiiiiiii',
      type: '1'
    },
    {
      update_time: '1556623994',
      flag: '7',
      full_name: '13600419123',
      create_time: '1556623994',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 314.3, y: 300, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123188553539522560',
      text: 'aaaaaa',
      type: '1'
    },
    {
      update_time: '1556624133',
      flag: '8',
      full_name: '13600419123',
      create_time: '1556624133',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 91.3, y: 15, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123189137046900736',
      text: 'rrrrrrrrrrrrrr',
      type: '1'
    },
    {
      update_time: '1556624508',
      flag: '8',
      full_name: '13600419123',
      create_time: '1556624508',
      user_id: '1111189894887247872',
      board_id: '1120583872338333696',
      file_id: '1122396197282254848',
      coordinates: { x: 91.3, y: 15, width: 48, height: 48, isAready: false },
      mobile: '13600419123',
      id: '1123190710980448256',
      text: 'ldksjflkds',
      type: '1'
    }
  ]
  //   {
  //     "update_time": "1556624508",
  //     "flag": "8",
  //     "full_name": "13600419123",
  //     "create_time": "1556624508",
  //     "user_id": "1111189894887247872",
  //     "board_id": "1120583872338333696",
  //     "file_id": "1122396197282254848",
  //     "coordinates": "{"x":91.3,"y":15,"width":48,"height":48,"isAready":false}",
  //     "mobile": "13600419123",
  //     "id": "1123190710980448256",
  //     "text": "ldksjflkds",
  //    "type": "1"
  // }
};

export default withHover(ZoomPicture);
