import theme from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import store from "@/store/index";
import { Provider } from "react-redux";
import LayoutInner from "./LayoutInner";

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <LayoutInner />
      </Provider>
    </ThemeProvider>
  );
}

export default Layout;
