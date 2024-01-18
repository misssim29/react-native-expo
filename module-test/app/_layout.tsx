import { Slot, router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OneSignal from "../components/OneSignal";
import Constants, { ExecutionEnvironment } from "expo-constants";
const Layout = () => {
  const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  return (
    <View>
      {!isExpoGo ? <OneSignal /> : ""}
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default Layout;
