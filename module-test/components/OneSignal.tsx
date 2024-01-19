import { router } from "expo-router";
import { View, Text } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

let OneSignal: any;

if (!isExpoGo) {
  OneSignal = require("react-native-onesignal").OneSignal;
} else {
  OneSignal = View;
}

const OneSignalComponent = () => {
  if (!isExpoGo) {
    OneSignal.initialize("c87ff605-e618-421e-bc28-bbff082c3b78");
    OneSignal.Notifications.requestPermission(true);
    //밖에서 클릭
    OneSignal.Notifications.addEventListener("click", (event) => {
      router.replace(`/article/${event.notification.additionalData?.id}`);
    });
    //인앱일때
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (event) => {
        router.replace(`/article/${event.notification.additionalData?.id}`);
      }
    );
  }
  return <></>;
};

export default OneSignalComponent;
