import { View, Text, Pressable } from "react-native";
import Icon from "@/components/Icon";
import styled from "styled-components";

const BtnWrite = () => {
  return (
    <WriteButton>
      <Icon name="write" size={40} color="#fff" />
    </WriteButton>
  );
};

const WriteButton = styled(Pressable)`
  background-color: ${(props: any) => props.theme.color.main};
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 2;
  border-radius: 80px;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

export default BtnWrite;
