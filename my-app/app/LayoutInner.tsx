import { View, SafeAreaView, StyleSheet } from "react-native";
import { Slot, SplashScreen, usePathname } from "expo-router";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import Modal from "@/components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";

function LayoutInner() {
  const PathName = usePathname();
  const onModal = useSelector((state: RootState) => state.user.onModal);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      alert(`Error fetching latest Expo Update : ${error}`);
    }
  }

  // eas build 할때만 적용
  useEffect(() => {
    // onFetchUpdateAsync();
    delay_splach();
    loadFonts();
  }, []);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function loadFonts() {
    await Font.loadAsync({
      customIcon: require("@/assets/customIcon.ttf"),
    });
    await SplashScreen.hideAsync();
  }

  // 메인 로딩 풀릴때까지 스플래시 화면 보여줌
  async function delay_splach() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(100);
  }

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <SafeAreaView style={styles.wrap}>
        <StatusBar
          translucent={false}
          backgroundColor={onModal ? "rgba(0,0,0,0.5)" : "#fff"}
        />
        {PathName === "/write" || PathName === "/SignUp" ? "" : <Header />}
        <View style={styles.container}>
          <Slot />
        </View>
      </SafeAreaView>
      {onModal ? <Modal /> : ""}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default LayoutInner;
