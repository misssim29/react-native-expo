import { View, Text } from "react-native";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";

const LoadingWrap = () => {
  return (
    <Wrap>
      <ActivityIndicator
        color="rgb(253, 57, 149)"
        style={{ flex: 1 }}
      ></ActivityIndicator>
    </Wrap>
  );
};

const Wrap = styled(View)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  flex: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export default LoadingWrap;
