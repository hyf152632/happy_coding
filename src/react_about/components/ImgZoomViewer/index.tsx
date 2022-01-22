import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import throttle from 'lodash/throttle';
import styles from './index.less';

const defaultProps = {
  isWithZoom: true,
  zoomStyle: {},
};

type Props = {
  imgUrl: string;
  isWithZoom?: boolean;
  zoomStyle?: object;
} & typeof defaultProps;

const zoomOffset = 20;

function ImgViewer(props: Props) {
  const { imgUrl, isWithZoom, zoomStyle } = props;
  const [isShowZoom, setIsShowZoom] = useState(false);
  const [zoomRefInfos, setZoomRefInfos] = useState<DOMRect>();
  const [imgActualSize, setImgActualSize] = useState({ width: 0, height: 0 });
  const zoomRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // get image actual size.
  useEffect(() => {
    if (imgRef && imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setImgActualSize({ width: naturalWidth, height: naturalHeight });
    }
  }, []);

  function handleMouseEnterBox() {
    if (!isWithZoom) {
      return;
    }
    if (!isShowZoom) {
      setIsShowZoom(true);
    }
  }

  function handleMouseLeaveBox() {
    if (!isWithZoom) {
      return;
    }
    if (isShowZoom) {
      setIsShowZoom(false);
    }
  }

  function handleMouseMoveOnBox(e: MouseEvent) {
    if (!isWithZoom) {
      return;
    }
    if (!imgRef || !imgRef.current || !zoomRef || !zoomRef.current) {
      return;
    }

    // initial zoomRefInfos
    if (!zoomRefInfos?.width) {
      setZoomRefInfos(zoomRef?.current?.getBoundingClientRect());
      return;
    }

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const { width: zoomWidth, height: zoomHeight } = zoomRefInfos;
    const { width: imgActualWidth, height: imgActualHeight } = imgActualSize;

    let hoverX = e.pageX;
    let hoverY = e.pageY;

    let posX = hoverX - left + zoomOffset;
    let posY = hoverY - top + zoomOffset;

    //limit zoom position
    if (hoverX > left + width - zoomOffset - zoomWidth) {
      posX = hoverX - (zoomWidth + zoomOffset);
    }

    if (hoverY > top + height - zoomOffset - zoomHeight) {
      posY = hoverY - (zoomHeight * 1.5 + zoomOffset);
    }

    let bgOffsetX = ((hoverX - left) / width) * imgActualWidth - zoomWidth / 2;

    let bgOffsetY =
      ((hoverY - top) / height) * imgActualHeight - zoomHeight / 2;

    transferZoom(posX, posY, bgOffsetX, bgOffsetY);
  }

  const throttledHandleMouseMoveOnBox = throttle((e) => {
    handleMouseMoveOnBox(e);
  }, 30);

  function transferZoom(posX: number, posY: number, bgX: number, bgY: number) {
    if (!zoomRef || !zoomRef.current) {
      return;
    }

    zoomRef.current.style.left = posX + 'px';
    zoomRef.current.style.top = posY + 'px';
    zoomRef.current.style.backgroundPosition = -bgX + 'px ' + -bgY + 'px';
  }
  return (
    <div
      className={styles.retina_box}
      onMouseEnter={handleMouseEnterBox}
      onMouseLeave={handleMouseLeaveBox}
      onMouseMove={(e) => {
        e.persist();
        throttledHandleMouseMoveOnBox(e);
      }}
    >
      <div
        className={`${styles.retina_radius} ${
          isShowZoom && styles.retina_radius_show
        }`}
        style={Object.assign({}, zoomStyle, {
          background: 'url(' + imgUrl + ')',
        })}
        ref={zoomRef}
      ></div>
      <img ref={imgRef} className={styles.retina_image} src={imgUrl} />
    </div>
  );
}

ImgViewer.defaultProps = defaultProps;

export default ImgViewer;
