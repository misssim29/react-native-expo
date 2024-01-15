import { View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { useState } from "react";
import kakaoLogin from "@react-native-seoul/kakao-login";
import naverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
} from "@react-native-seoul/naver-login";

const Home = () => {
  const [result, setResult] = useState<string>("");
  const loginWithKakao = async (): Promise<void> => {
    try {
      const data = await kakaoLogin.login();
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };
  const kakaoProfile = async (): Promise<void> => {
    try {
      const data = await kakaoLogin.getProfile();
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };
  const loginWidthNaver = async (): Promise<any> => {
    try {
      const data = await naverLogin.login({
        appName: "testapp",
        consumerKey: "9EA3zeWt9_QIYqUJUnFa",
        consumerSecret: "Dm9ZantsWZ",
        serviceUrlScheme: "com.misssim2929.snstest",
      });
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KakaoBtn onPress={loginWithKakao}>
        <KakaoBtnText>카카오 로그인</KakaoBtnText>
      </KakaoBtn>
      <KakaoBtn onPress={kakaoProfile}>
        <KakaoBtnText>카카오 프로필</KakaoBtnText>
      </KakaoBtn>
      <NaverBtn onPress={loginWidthNaver}>
        <KakaoBtnText>네이버 로그인</KakaoBtnText>
      </NaverBtn>
      <DataContent>
        <Text>data : {result ? result : ""}</Text>
      </DataContent>
    </ScrollView>
  );
};
const NaverBtn = styled(Pressable)`
  background-color: #2db400;
  margin: 10px 5%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const KakaoBtn = styled(Pressable)`
  background-color: #ffe812;
  margin: 10px 5%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
const KakaoBtnText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;

const DataContent = styled(View)`
  padding: 20px 5%;
`;

export default Home;
