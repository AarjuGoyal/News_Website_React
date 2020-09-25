import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  top: 50%;
  position: relative;
`;
 
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
      <div className="PageLoading"
      style = {{
        top: '50%',
        left: '50%',
        position: 'absolute'}}>
        <BounceLoader
          css={override}
          size={45}
          color={"#123abc"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Loading;