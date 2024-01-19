import { Slot, router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OneSignal from "../components/OneSignal";
const Layout = () => {
  return (
    <View>
      <SafeAreaView>
        <OneSignal />
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default Layout;
