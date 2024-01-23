import { View, Platform, SafeAreaView } from "react-native";
import { Slot } from "expo-router";
import Header from "@/components/Header";

const LayoutInner = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : 40,
      }}
    >
      <Header />
      <Slot />
    </SafeAreaView>
  );
};

export default LayoutInner;
