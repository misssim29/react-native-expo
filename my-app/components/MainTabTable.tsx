import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { useCallback, useRef, useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "@craftzdog/react-native-buffer";
import LoadingBox from "./LoadingBox";
import { Link } from "expo-router";
import { encode } from "base-64";

const MainTabTable = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const [Paging, setPaging] = useState(0);

  const getList = async (idx: number) => {
    setLoading(false);
    setPaging(idx);
    let Cate: String;
    switch (idx) {
      case 0:
        Cate = "c%2Fteen";
        break;
      case 1:
        Cate = "c%2Ftwenty";
        break;
      case 2:
        Cate = "c%2Fthirty";
        break;
      default:
        Cate = "c%2Fteen";
    }
    try {
      const response: any = await axios.get(
        `${APIURL}/classifications?limit=10&object=${Cate}`
      );
      setDataList(response.data.data.articles);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    getList(0);
  }, []);

  const tabList = useCallback(({ item }: { item: any }) => {
    const decodeTxt = item.title;
    const title = Buffer.from(decodeTxt, "base64").toString("utf8");
    const encodeText = encode(item.id);
    return (
      <TabList>
        <Link href={`/cate/${encodeText}`} style={{ flex: 1 }}>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Title>
        </Link>
      </TabList>
    );
  }, []);
  const DeviceWidth = Dimensions.get("window").width;

  const scrollViewRef = useRef(null);
  const SwipeTap = (idx?: number) => {
    setLoading(false);
    getList(idx);
    scrollViewRef?.current?.scrollTo({ x: idx * DeviceWidth, animated: true });
  };
  const changeScroll = (e: any) => {
    const { contentOffset } = e.nativeEvent;
    if (contentOffset.x === 0 && Paging !== 0) {
      getList(0);
    } else if (DeviceWidth === contentOffset.x && Paging !== 1) {
      getList(1);
    } else if (DeviceWidth * 2 === contentOffset.x && Paging !== 2) {
      getList(2);
    }
  };
  return (
    <>
      <TapSwipe>
        <TabBtn onPress={() => SwipeTap(0)}>
          <TabText>10대</TabText>
        </TabBtn>
        <TabBtn onPress={() => SwipeTap(1)}>
          <TabText>20대</TabText>
        </TabBtn>
        <TabBtn onPress={() => SwipeTap(2)}>
          <TabText>30대</TabText>
        </TabBtn>
      </TapSwipe>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={scrollViewRef}
        onScroll={changeScroll}
        scrollEventThrottle={0}
      >
        <View style={{ width: DeviceWidth }}>
          {loading ? (
            <FlatList
              data={dataList}
              keyExtractor={(item) => item.id}
              renderItem={tabList}
            />
          ) : (
            <LoadingBox />
          )}
        </View>
        <View style={{ width: DeviceWidth }}>
          {loading ? (
            <FlatList
              data={dataList}
              keyExtractor={(item) => item.id}
              renderItem={tabList}
            />
          ) : (
            <LoadingBox />
          )}
        </View>
        <View style={{ width: DeviceWidth }}>
          {loading ? (
            <FlatList
              data={dataList}
              keyExtractor={(item) => item.id}
              renderItem={tabList}
            />
          ) : (
            <LoadingBox />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const TabList = styled(View)`
  flex: 1;
  border-bottom-width: 0.5px;
  border-bottom-color: #919191;
  margin: 0 5%;
  padding: 10px 0;
`;

const TapSwipe = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  margin-bottom: 20px;
`;
const TabBtn = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  background: ${(props: any) => props.theme.color.main};
  margin: 0 5px;
  border-radius: 10px;
`;

const TabText = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Title = styled(Text)`
  font-size: 16px;
`;

export default MainTabTable;
