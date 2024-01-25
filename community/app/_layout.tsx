import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import store from "@/store/index";
import { Provider } from "react-redux";
import LayoutInner from "./LayoutInner";

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LayoutInner />
      </Provider>
    </ThemeProvider>
  );
};

export default Layout;
