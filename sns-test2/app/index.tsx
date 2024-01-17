import { View, Text, Pressable, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { useState } from "react";
import { login, getProfile } from "@react-native-seoul/kakao-login";
import naverLogin, {
  NaverLoginResponse,
  GetProfileResponse,
} from "@react-native-seoul/naver-login";
import { AccessToken, LoginManager, Profile } from "react-native-fbsdk-next";
import * as AppleAuthentication from "expo-apple-authentication";

const Home = () => {
  const [result, setResult] = useState<string>("");

  //카카오
  const loginWithKakao = async (): Promise<void> => {
    try {
      const data = await login();
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };
  const kakaoProfile = async (): Promise<void> => {
    try {
      const data = await getProfile();
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };

  //네이버
  const [NaverResult, setNaverResult] =
    useState<NaverLoginResponse["successResponse"]>();
  const loginWithNaver = async (): Promise<void> => {
    try {
      const { successResponse } = await naverLogin.login({
        appName: "testapp",
        consumerKey: "9EA3zeWt9_QIYqUJUnFa",
        consumerSecret: "Dm9ZantsWZ",
        serviceUrlScheme: "com.misssim2929.snstest2",
      });
      setResult("성공 :" + JSON.stringify(successResponse));
      setNaverResult(successResponse);
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };
  const getProfileWidthNaver = async (): Promise<void> => {
    try {
      const data = await naverLogin.getProfile(NaverResult.accessToken);
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };

  //페이스북
  const loginWithFacebook = async (): Promise<void> => {
    try {
      const data = await LoginManager.logInWithPermissions(["public_profile"]);
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };
  const getProfileFacebook = async (): Promise<void> => {
    try {
      const data = await Profile.getCurrentProfile();
      setResult("성공 :" + JSON.stringify(data));
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };

  //애플
  const loginWithApple = async (): Promise<void> => {
    try {
      const data = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      setResult("성공 :" + JSON.stringify(data));
      // signed in
    } catch (err) {
      setResult("실패 :" + JSON.stringify(err));
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <Boxes>
        <KakaoBtn onPress={loginWithKakao}>
          <KakaoBtnText>카카오 로그인</KakaoBtnText>
        </KakaoBtn>
        <KakaoBtn onPress={kakaoProfile}>
          <KakaoBtnText>카카오 프로필</KakaoBtnText>
        </KakaoBtn>
      </Boxes>
      <Boxes>
        <NaverBtn onPress={loginWithNaver}>
          <NaverBtnText>네이버 로그인</NaverBtnText>
        </NaverBtn>
        <NaverBtn onPress={getProfileWidthNaver}>
          <NaverBtnText>네이버 프로필</NaverBtnText>
        </NaverBtn>
      </Boxes>
      <Boxes>
        <FacebookBtn onPress={loginWithFacebook}>
          <NaverBtnText>페이스북 로그인</NaverBtnText>
        </FacebookBtn>
        <FacebookBtn onPress={getProfileFacebook}>
          <NaverBtnText>페이스북 프로필</NaverBtnText>
        </FacebookBtn>
      </Boxes>
      {Platform.OS === "ios" ? (
        <Boxes>
          <AppleBtn onPress={loginWithApple}>
            <NaverBtnText>애플 로그인</NaverBtnText>
          </AppleBtn>
        </Boxes>
      ) : (
        ""
      )}
      <DataContent>
        <Text>data : {result ? result : ""}</Text>
      </DataContent>
    </ScrollView>
  );
};
const Boxes = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 5%;
`;

const AppleBtn = styled(Pressable)`
  background-color: #a2aaad;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 49%;
`;

const FacebookBtn = styled(Pressable)`
  background-color: #3b5998;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 49%;
`;

const NaverBtn = styled(Pressable)`
  background-color: #2db400;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 49%;
`;

const KakaoBtn = styled(Pressable)`
  background-color: #ffe812;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  width: 49%;
`;
const KakaoBtnText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;
const NaverBtnText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const DataContent = styled(View)`
  padding: 20px 5%;
`;

export default Home;
