import { View, Text } from "react-native";
import * as React from "react";
import { WebView } from "react-native-webview";

const Webview = () => {
  return (
    <>
      <WebView source={{ uri: "https://www.socdoc.co.kr" }} />
    </>
  );
};
export default Webview;
