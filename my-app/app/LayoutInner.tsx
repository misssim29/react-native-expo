import { View, SafeAreaView, StyleSheet, Platform } from "react-native";
import { Slot, SplashScreen, usePathname } from "expo-router";
import Header from "@/components/Header";
import { Provider, useDispatch } from "react-redux";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import Modal from "@/components/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import LoadingWrap from "@/components/LoadingWrap";
import * as SecureStore from "expo-secure-store";
import userSlice from "@/slices/user";

function LayoutInner() {
  const PathName = usePathname();
  const onModal = useSelector((state: RootState) => state.modal.onModal);
  const onLoading = useSelector((state: RootState) => state.user.onLoading);
  const dispatch = useDispatch();
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
    getUserData();
  }, []);

  async function getUserData() {
    let id = await SecureStore.getItemAsync("id");
    let nickname = await SecureStore.getItemAsync("nickname");
    let token = await SecureStore.getItemAsync("token");
    if (id && nickname && token) {
      dispatch(
        userSlice.actions.setUser({
          id: id,
          nickname: nickname,
          token: token,
        })
      );
    }
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
  }

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : 30,
        }}
      >
        <StatusBar
          translucent={true}
          backgroundColor={onModal ? "rgba(0,0,0,0.5)" : "#fff"}
        />
        {PathName === "/write" || PathName === "/SignUp" ? "" : <Header />}
        <View style={styles.container}>
          <Slot />
        </View>
      </SafeAreaView>
      {onModal ? <Modal /> : ""}
      {onLoading ? <LoadingWrap /> : ""}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LayoutInner;
