import { Slot } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <View>
      <SafeAreaView>
        <Slot />
      </SafeAreaView>
    </View>
  );
};

export default Layout;
