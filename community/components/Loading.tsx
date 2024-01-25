import { ActivityIndicator } from "react-native";

const Loading = ({ size = "small" }: any) => {
  return (
    <ActivityIndicator
      color="#db6764"
      style={{ flex: 1 }}
      size={size}
    ></ActivityIndicator>
  );
};
export default Loading;
