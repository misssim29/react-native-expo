import { router } from "expo-router";
import { View, Text, Pressable } from "react-native";
import styled from "styled-components/native";

const SubHeader = ({ submit, title }) => {
  const HistoryBack = () => {
    router.back();
  };
  const SubmitWrite = () => {
    submit();
  };

  return (
    <SubHeaderWrap>
      <BtnReturn onPress={HistoryBack}>
        <Text>뒤로가기</Text>
      </BtnReturn>
      <HeaderTitle>
        <Title>{title}</Title>
      </HeaderTitle>
      <BtnSubmit>
        {submit ? (
          <Pressable onPress={SubmitWrite}>
            <Text>완료</Text>
          </Pressable>
        ) : (
          ""
        )}
      </BtnSubmit>
    </SubHeaderWrap>
  );
};

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const SubHeaderWrap = styled(View)`
  flex-direction: row;
  padding: 15px 5%;
  border-bottom-color: ${(props: any) => props.theme.color.main};
  border-bottom-width: 0.5px;
`;
const BtnReturn = styled(Pressable)`
  flex: 1;
  align-items: flex-start;
`;
const HeaderTitle = styled(View)`
  flex: 1;
  align-items: center;
`;
const BtnSubmit = styled(View)`
  flex: 1;
  align-items: flex-end;
`;
export default SubHeader;
