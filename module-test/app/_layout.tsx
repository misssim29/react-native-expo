import { Slot } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogLevel, OneSignal } from "react-native-onesignal";

const Layout = () => {
  OneSignal.initialize("c87ff605-e618-421e-bc28-bbff082c3b78");
  OneSignal.Notifications.requestPermission(true);

  return (
    <View>
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default Layout;
