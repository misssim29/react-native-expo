import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { decode } from "base-64";
import { Buffer } from "@craftzdog/react-native-buffer";
import styled from "styled-components";
import HTML from "react-native-render-html";
import { ScrollView } from "react-native-gesture-handler";
import LoadingBox from "@/components/LoadingBox";

function Viewpage() {
  const [loading, setLoading] = useState(true);
  const Params = useLocalSearchParams();
  const id = decode(Params.id);
  const [data, setData] = useState({
    title: "",
    nickName: "",
    id: "",
    date: "",
    viewCnt: 0,
    content: "",
    imgs: [],
  });
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const DeviceWidth = Dimensions.get("window").width * 0.88;
  useEffect(() => {
    const getData = async () => {
      try {
        const response: any = await axios.get(
          `${APIURL}/categories/articles/${id}`
        );
        const res = response.data.data.article;
        let titleTxt = res.title;
        titleTxt = Buffer.from(titleTxt, "base64").toString("utf8");
        let ContentTxt = res.body;
        ContentTxt = Buffer.from(ContentTxt, "base64").toString("utf8");
        console.log(res.images);
        setData({
          title: titleTxt,
          nickName: res.user.nick_name,
          id: res.id,
          date: res.date,
          viewCnt: res.view_count,
          content: ContentTxt,
          imgs: res.images,
        });
        // console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <ScrollView>
          <TitleBox>
            <TitleTxt>{data.title}</TitleTxt>
          </TitleBox>
          <NameBox>
            <Text>{data.nickName}</Text>
          </NameBox>
          <InfoBox>
            <Text>작성일 : {data.date} | </Text>
            <Text>조회 : {data.viewCnt}</Text>
          </InfoBox>
          <ContentBox>
            <HTML
              source={{ html: data.content }}
              contentWidth={DeviceWidth}
            ></HTML>
          </ContentBox>
        </ScrollView>
      )}
    </>
  );
}
const Flex = styled(View)`
  flex: 1;
`;
const InfoBox = styled(View)`
  flex-direction: row;
  padding: 5px 5%;
`;
const NameBox = styled(View)`
  padding: 10px 5%;
`;
const TitleBox = styled(View)`
  padding: 20px 5%;
  border-bottom-color: #000;
  border-bottom-width: 0.2px;
`;
const TitleTxt = styled(Text)`
  font-size: 20px;
  font-weight: bold;
`;
const ContentBox = styled(View)`
  padding: 0 5%;
  flex: 1;
`;

export default Viewpage;
