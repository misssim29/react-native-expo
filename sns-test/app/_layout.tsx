import { View, SafeAreaView, StyleSheet, Platform } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

function LayoutInner() {
  return (
    <View style={{ position: "relative", flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : 40,
        }}
      >
        <StatusBar translucent={true} />
        <View style={styles.container}>
          <Slot />
        </View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LayoutInner;
