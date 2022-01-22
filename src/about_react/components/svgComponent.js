import React, { Component } from "react";
class Info extends Component {
  state = { hovering: false };

  mouseOver = () => this.setState({ hovering: true });
  mouserOut = () => this.setState({ hovering: false });

  render() {
    const { hovering, height } = this.state;
    const { id } = this.props;

    const Tooltip = ({ id }) => <div>{id}</div>;

    return (
      <>
        {hovering === true ? <Tooltip id={id} /> : null}
        <svg
          onMouseOver={this.mouserOver}
          onMouseOut={this.mouserOut}
          className="Icon-svg Icon-hoverable-svg"
          height={height}
          width="16"
        >
          <path d="M9 8a1 1 0 0 0-1-1H5.5a1 1 0 1 0 0 2H7v4a1 1 0 0 0 2 0zM4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm4 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
      </>
    );
  }
}

export default Info;
