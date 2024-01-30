import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { useCallback, useEffect, useState } from "react";
import ListItem from "@/components/ListItem";
import axios from "axios";
import Loading from "@/components/Loading";
import styled from "styled-components";

function list() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <>
          <ListItem item={item} idx={index}></ListItem>
        </>
      );
    },
    []
  );

  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  useEffect(() => {
    const getList = async () => {
      try {
        const response: any = await axios.get(
          `${APIURL}/classifications?limit=30&object=c%2Ftwenty`
        );
        setDataList(response.data.data.articles);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getList();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        ></FlatList>
      )}
    </>
  );
}

const BtnWrite = styled(TouchableOpacity)`
  position: absolute;
  bottom: 50px;
  right: 50px;
  background-color: ${(props: any) => props.theme.color.main};
  width: 100px;
  height: 100px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;
const BtnText = styled(Text)`
  color: #fff;
  font-size: 25px;
  font-weight: bold;
`;

export default list;
