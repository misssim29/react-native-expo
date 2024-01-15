import { View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { useState } from "react";
import KaKaoLogins, {
  login,
  getAccessToken,
  getProfile,
  loginWithKakaoAccount,
} from "@react-native-seoul/kakao-login";

const Home = () => {
  const [result, setResult] = useState<string>("");
  const loginWithKakao = async (): Promise<void> => {
    try {
      const data = await loginWithKakaoAccount();
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

  return (
    <ScrollView style={{ flex: 1 }}>
      <KakaoBtn onPress={loginWithKakao}>
        <KakaoBtnText>카카오 로그인</KakaoBtnText>
      </KakaoBtn>
      <KakaoBtn onPress={kakaoProfile}>
        <KakaoBtnText>카카오 프로필</KakaoBtnText>
      </KakaoBtn>
      <DataContent>
        <Text>data : {result ? result : ""}</Text>
      </DataContent>
    </ScrollView>
  );
};

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
