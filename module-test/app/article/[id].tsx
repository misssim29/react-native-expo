import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ArticleView = () => {
  const { id } = useLocalSearchParams();

  return (
    <>
      <View>
        <Text>뷰페이지</Text>
      </View>
      <View>
        <Text>현재 페이지 주소 id값 : {id}</Text>
      </View>
    </>
  );
};

export default ArticleView;
