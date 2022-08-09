import React from "react";
import styled, { keyframes } from "styled-components";
import PanIcon from "./PanIcon";
import QuasarIcon from "./QuasarIcon";
import { SpinnerProps } from "./types";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(10px);
	}
	100% {
		transform: translatey(0px);
	}
`;

const Container = styled.div`
  position: relative;
`;

const RotatingQuasarIcon = styled(QuasarIcon)`
  position: absolute;
  top: 0;
  left: 0;
  animation: ${rotate} 2s linear infinite;
  transform: translate3d(0, 0, 0);
`;

const FloatingPanIcon = styled(PanIcon)`
  animation: ${float} 6s ease-in-out infinite;
  transform: translate3d(0, 0, 0);
`;

const LoadingGif = styled.img`
  position: relative;
  height: 200px;
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <LoadingGif src="/images/loading.gif" />
    </Container>
  );
};

export default Spinner;
