import { Slot, router } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OneSignal } from "react-native-onesignal";
import { useState } from "react";

const Layout = () => {
  const [onesignalData, setOnesignalData] = useState("");
  OneSignal.initialize("c87ff605-e618-421e-bc28-bbff082c3b78");
  OneSignal.Notifications.requestPermission(true);

  //밖에서 클릭
  OneSignal.Notifications.addEventListener("click", (event) => {
    router.replace(`/article/${event.notification.rawPayload?.custom.a.id}`);
  });

  //인앱일때
  OneSignal.Notifications.addEventListener("foregroundWillDisplay", (event) => {
    router.replace(`/article/${event.notification.rawPayload?.custom.a.id}`);
  });

  return (
    <View>
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default Layout;
