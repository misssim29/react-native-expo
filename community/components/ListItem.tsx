import { View, Text, Dimensions } from "react-native";
import { Buffer } from "@craftzdog/react-native-buffer";
import { btoa } from "react-native-quick-base64";
import { Link } from "expo-router";
import styled from "styled-components/native";

function ListItem({ item }: any) {
  const btoaText = btoa(item.id);
  const bufferTitle = item.title;
  const title = Buffer.from(bufferTitle, "base64").toString("utf8");
  return (
    <ListBox>
      <Link href={`/cate/${btoaText}`}>
        <View>
          <TitleBox>
            <Title numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Title>
          </TitleBox>
          <InfoBox>
            <Text>조회수 : {item.view_count}</Text>
            <Text> | 좋아요 : {item.like_count}</Text>
            <Text> | 댓글 : {item.reply_count}</Text>
            <Text> | 스크랩 : {item.scrap_count}</Text>
          </InfoBox>
        </View>
      </Link>
    </ListBox>
  );
}

const ListBox = styled(View)`
  padding: 20px 20px 0px 20px;
`;
const TitleBox = styled(View)`
  width: 100%;
`;
const Title = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;
const InfoBox = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export default ListItem;
