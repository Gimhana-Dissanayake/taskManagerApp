import React, { FC } from "react";
import "./LoadingIndicator.scss";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const LoadingIndicator: FC<Props> = (props) => {
  return (
    <div className={`com-progress ${props.className}`} style={props.style}>
      <div className="com-indeterminate"></div>
      {/* <Overlay transparent={true} /> */}
    </div>
  );
};
export default LoadingIndicator;
