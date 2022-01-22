import { createPortal } from 'react-dom';
import React, { useEffect, ReactNode, MouseEvent } from 'react';
import Button from '@/components/Button';
import styles from './index.less';

const defaultProps = {
  bodyStyle: {},
  cancelText: 'Cancel',
  centered: false,
  closable: true,
  okText: 'Ok',
  width: 520,
  mask: true,
  maskClosable: true,
  keyboard: true,
  maskStyle: {},
  zIndex: 1000,
  footer: null,
  destroyOnClose: false,
};

type Props = {
  afterClose?: () => void;
  bodyStyle?: object;
  cancelText?: string | ReactNode;
  centered?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  children: ReactNode;
  okText?: string | ReactNode;
  title?: string | ReactNode;
  footer?: String | ReactNode;
  visible: boolean;
  keyboard?: boolean; // 是否支持键盘 esc 关闭
  mask?: boolean;
  maskClosable?: boolean; // 点击蒙层是否允许关闭
  maskStyle?: object;
  onCancel?: () => void;
  onOk?: () => void;
  width?: number;
  zIndex?: number;
  destroyOnClose?: boolean;
} & typeof defaultProps;

function Modal(props: Props) {
  const {
    zIndex,
    maskStyle,
    maskClosable,
    keyboard,
    onCancel,
    visible,
    closable,
    title,
    width,
    children,
    afterClose,
    bodyStyle,
    footer,
    cancelText,
    okText,
    onOk,
    centered,
    closeIcon,
    destroyOnClose,
  } = props;

  function handleCloseByMask(e: MouseEvent) {
    e.stopPropagation();
    if (!maskClosable) {
      return;
    }
    if (e.target === e.currentTarget) {
      onCancel && onCancel();
    }
    return false;
  }

  // 监听 esc 键， 关闭 Modal
  useEffect(() => {
    function handleKeyBoardESC(e: KeyboardEvent) {
      if (!keyboard) {
        return;
      }
      const escKeyCode = 27;
      if (e.keyCode === escKeyCode) {
        onCancel && onCancel();
      }
    }
    window.addEventListener('keypress', handleKeyBoardESC);
    return () => {
      window.removeEventListener('keypress', handleKeyBoardESC);
    };
  }, [keyboard, onCancel]);

  // 阻止 Modal 后面的内容滚动
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    if (visible) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'auto';
    }

    if (!visible) {
      afterClose && afterClose();
    }

    return () => {
      if (!visible) {
        body.style.overflowY = 'auto';
      }
    };
  }, [visible]);

  if (destroyOnClose && !visible) {
    return null;
  }

  return createPortal(
    <div
      className={`${styles.wrapper} ${visible && styles.show_modal}`}
      onClick={handleCloseByMask}
      style={Object.assign({}, maskStyle, { zIndex })}
    >
      <div
        className={`${styles.content_wrapper} ${
          centered && styles.content_wrapper_centered
        }`}
        style={Object.assign(
          {},
          {
            width: width + 'px',
          },
          bodyStyle
        )}
      >
        {closable && (
          <a className={styles.close_icon_wrapper} onClick={onCancel}>
            {closeIcon || (
              <i className={`iconfont iconclose ${styles.close_icon}`}></i>
            )}
          </a>
        )}
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.content}>{children}</div>
        {footer || (
          <div className={styles.footer_wrapper}>
            <Button
              size='small'
              onClick={() => onCancel && onCancel()}
              wrapperStyle={{ marginRight: '10px' }}
            >
              {cancelText}
            </Button>
            <Button type='primary' size='small' onClick={() => onOk && onOk()}>
              {okText}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
