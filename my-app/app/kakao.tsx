import { View, Text, Pressable, StyleSheet } from "react-native";
import KaKaoLogins, {
  login,
  getAccessToken,
  getProfile,
} from "@react-native-seoul/kakao-login";
import { useState } from "react";

function kakao() {
  const [result, setResult] = useState<string>("");
  const [AccessToken, setAccessToken] = useState<string>("");
  const [profile, setProfile] = useState<string>("");

  const loginWithKakao = async (): Promise<void> => {
    try {
      const data = await login();
      setResult(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  const getkakaoToken = async (): Promise<void> => {
    try {
      const data = await getAccessToken();
      setAccessToken(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  const getkakaoProfile = async (): Promise<void> => {
    try {
      const data = await getProfile();
      setProfile(JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  const getData = () => {
    setResult("데이터");
  };

  return (
    <View>
      <Pressable onPress={loginWithKakao} style={styles.kakaoBtn}>
        <Text style={styles.kakaoBtnTxt}>카카오 로그인</Text>
      </Pressable>
      <Pressable onPress={getkakaoToken} style={styles.kakaoBtn}>
        <Text style={styles.kakaoBtnTxt}>카카오 액세스 토큰조회</Text>
      </Pressable>
      <Pressable onPress={getkakaoProfile} style={styles.kakaoBtn}>
        <Text style={styles.kakaoBtnTxt}>카카오 프로필 불러오기</Text>
      </Pressable>
      <Pressable onPress={getData} style={styles.kakaoBtn}>
        <Text style={styles.kakaoBtnTxt}>데이터 넣기</Text>
      </Pressable>
      <View>
        <Text>결과값 : {result ? result : ""}</Text>
      </View>
      <View>
        <Text>액세스토큰 : {AccessToken ? AccessToken : ""}</Text>
      </View>
      <View>
        <Text>프로필 : {profile ? profile : ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  kakaoBtn: {
    backgroundColor: "#f6e24b",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
  },
  kakaoBtnTxt: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
});

export default kakao;
