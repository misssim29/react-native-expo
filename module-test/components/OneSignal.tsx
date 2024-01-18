import { OneSignal } from "react-native-onesignal";
import { useState } from "react";
import { router } from "expo-router";

const OneSignalComponent = () => {
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
  return <></>;
};

export default OneSignalComponent;
