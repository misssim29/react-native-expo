import { View, Platform, SafeAreaView, Pressable, Text } from "react-native";
import { Slot, SplashScreen } from "expo-router";
import Header from "@/components/Header";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import BtnWrite from "../components/BtnWrite";
import Modal from "@/components/Modal";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";

const LayoutInner = () => {
  const [Token, setToken] = useState(null);
  const [fontsLoaded, setfontsLoaded] = useState(false);
  const onModal = useSelector((state: RootState) => state.status.modal);
  // 유저데이터 가져오기
  async function getUserData() {
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      //로그인정보가 있을때
      setToken(token);
    } else {
      setToken("empty");
    }
  }
  // 메인 로딩 풀릴때까지 스플래시 화면 보여줌
  function delay_splach() {
    SplashScreen.preventAutoHideAsync();
  }
  // 아이콘폰트 가져오기
  async function getFont() {
    await Font.loadAsync({
      myIcon: require("@/assets/fonts/myIcon.ttf"),
    });
    setfontsLoaded(true);
  }
  useEffect(() => {
    delay_splach();
    getUserData();
    getFont();
  }, []);
  useEffect(() => {
    if (fontsLoaded && Token !== null) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, Token]);
  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 렌더링을 방지
  }

  const insertToken = () => {
    SecureStore.setItemAsync("token", "토큰값 입력");
    console.log("입력");
  };

  return (
    <>
      <StatusBar style="dark"></StatusBar>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : 40,
        }}
      >
        <Header />
        <Slot />
        <BtnWrite />
      </SafeAreaView>
      {onModal ? <Modal /> : ""}
    </>
  );
};

export default LayoutInner;
