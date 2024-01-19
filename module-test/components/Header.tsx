import { View, Text } from "react-native";
import { Link } from "expo-router";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingLeft: "5%",
        paddingRight: "5%",
        justifyContent: "space-between",
      }}
    >
      <Link href="/" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Home
      </Link>
      <Link href="/Camera" style={{ paddingTop: 10, paddingBottom: 10 }}>
        Camera
      </Link>
      <Link href="/CameraExpo" style={{ paddingTop: 10, paddingBottom: 10 }}>
        CameraExpo
      </Link>
    </View>
  );
};
export default Header;
