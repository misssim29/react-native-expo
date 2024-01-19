import { Slot, router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OneSignal from "../components/OneSignal";
import Header from "../components/Header";

const Layout = () => {
  return (
    <View style={{ flex: 1 }}>
      <OneSignal />
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default Layout;
