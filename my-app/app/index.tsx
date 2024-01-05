import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import { useAppDispatch } from "@/store";
import userSlice from "@/slices/user";
import MainTabTable from "@/components/MainTabTable";

function Page() {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const dispatch = useAppDispatch();
  console.log("로그인 : ", loggedIn);
  const LoginStatus = () => {
    dispatch(userSlice.actions.setUser(!loggedIn));
  };

  return (
    <>
      <Container>
        <TextBox>Hello React Native Expo!</TextBox>
        <View>
          <LoginBtn onPress={LoginStatus}>
            <LoginBtnText>로그인전환</LoginBtnText>
          </LoginBtn>
        </View>
      </Container>
      <MainTabTable></MainTabTable>
      <View style={{ flex: 1 }}></View>
    </>
  );
}

const LoginBtn = styled(TouchableOpacity)`
  background-color: ${(props: any) => props.theme.color.main};
  padding: 20px;
  border-radius: 10px;
  margin: 20px;
`;

const LoginBtnText = styled(Text)`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
const Container = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const TextBox = styled(Text)`
  text-align: center;
  color: ${(props: any) => props.theme.color.main};
`;

export default Page;
