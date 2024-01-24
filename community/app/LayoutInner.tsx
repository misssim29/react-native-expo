import { View, Platform, SafeAreaView, Pressable, Text } from "react-native";
import { Slot } from "expo-router";
import Header from "@/components/Header";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import BtnWrite from "@/components/BtnWrite";

const LayoutInner = () => {
  const [Token, setToken] = useState(null);
  const [fontsLoaded, setfontsLoaded] = useState(false);
  useEffect(() => {
    getUserData();
    getFont();
  }, []);
  async function getUserData() {
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      setToken(token);
    }
  }

  async function getFont() {
    await Font.loadAsync({
      myIcon: require("@/assets/fonts/myIcon.ttf"),
    });
    setfontsLoaded(true);
  }
  const insertToken = () => {
    SecureStore.setItemAsync("token", "토큰값 입력");
    console.log("입력");
  };

  if (!fontsLoaded) {
    return null; // 폰트 로딩 중에는 렌더링을 방지
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : 40,
      }}
    >
      <Header />
      <Text>{Token}</Text>
      <Pressable onPress={insertToken}>
        <Text>setToken</Text>
      </Pressable>
      <Slot />
      <BtnWrite />
    </SafeAreaView>
  );
};

export default LayoutInner;
