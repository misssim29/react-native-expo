import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import store from "@/store/index";
import { Provider } from "react-redux";
import LayoutInner from "./LayoutInner";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import Constants, { ExecutionEnvironment } from "expo-constants";

const Layout = () => {
  const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  useEffect(() => {
    if (!isExpoGo) {
      onFetchUpdateAsync();
    }
  }, []);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log("업데이트가 실패하였습니다.");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LayoutInner />
      </Provider>
    </ThemeProvider>
  );
};

export default Layout;
