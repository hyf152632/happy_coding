import React, { PureComponent, Component } from "react";
import ReactDOM from "react-dom";

export default class PortalSample extends PureComponent {
  state = { visible: false };
  renderButton = () => {
    return (
      <button type="primary" onClick={() => this.setState({ visible: true })}>
        打开对话框
      </button>
    );
  };
  renderDialog = () => {
    return (
      <div className="portal-sample">
        <div>这是一个对话框！</div>
        <br />
        <button
          type="primary"
          onClick={() => this.setState({ visible: false })}
        >
          关闭对话框
        </button>
      </div>
    );
  };
  render() {
    if (!this.state.visible) return this.renderButton();
    return ReactDOM.createPortal(
      this.renderDialog(),
      document.getElementById("dialog-container")
    );
  }
}

class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
  }

  componentWillUnmount(){
    document.body.removeChild(this.container)
  }

  renderModal() {
    const {onClose, children} = this.props
    return (
      <div className='modal'>
        <span onClick={onClose} className='close'>&times</span>
        <div className='content'>{children}</div>
      </div>
    )
  }

  render() {
    //创建的DOM树挂载到this.container指向的div节点下面
    return ReactDOM.createPortal(this.renderModal, this.container)
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {showModal: true}
  }
  closeModal = () => {
    this.setState({showModal: false})
  }

  render() {
    const {showModal} = this.state
    return (
      <div>
      <h2>Dashboard</h2>
      {
        showModal && (
          <Modal onClose={this.closeModal}>Modal Dialog</Modal>
        )
      }
      </div>
    )
  }
}

export App