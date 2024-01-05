import { Text, View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Slot, Link, SplashScreen, usePathname } from "expo-router";
import Header from "@/components/Header";
import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import store from "@/store/index";
import { Provider } from "react-redux";
import * as Updates from "expo-updates";
import { useEffect } from "react";

function Layout() {
  const PathName = usePathname();

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
  }, []);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // 메인 로딩 풀릴때까지 스플래시 화면 보여줌
  async function delay_splach() {
    await SplashScreen.preventAutoHideAsync();
    await sleep(100);
    await SplashScreen.hideAsync();
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaView style={styles.wrap}>
          {PathName !== "/write" ? <Header /> : ""}
          <View style={styles.container}>
            <Slot />
          </View>
        </SafeAreaView>
      </Provider>
    </ThemeProvider>
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

export default Layout;
