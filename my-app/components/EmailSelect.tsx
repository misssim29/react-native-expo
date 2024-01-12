import { View, Text, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FlatList } from "react-native-gesture-handler";
import modalSlice from "@/slices/modal";
import { useDispatch } from "react-redux";

const EmailSelect = () => {
  const emailtype = [
    "naver.com",
    "hanmail.net",
    "nate.com",
    "gmail.com",
    "hotmail.com",
    "lycos.com",
    "empal.com",
  ];

  const dispatch = useDispatch();
  const SelectEmail = (item: string) => {
    dispatch(modalSlice.actions.setEmail(item));
    dispatch(modalSlice.actions.setModal(false));
  };

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <ListBox
        onPress={() => {
          SelectEmail(item);
        }}
      >
        <ListText>{item}</ListText>
      </ListBox>
    );
  }, []);
  return (
    <EmailWrap>
      <ListWrap
        data={emailtype}
        keyExtractor={(item: string) => item}
        renderItem={renderItem}
      />
    </EmailWrap>
  );
};
const ListText = styled(Text)`
  font-size: 16px;
  text-align: center;
`;

const ListBox = styled(Pressable)`
  flex: 1;
  padding: 20px 0;
`;

const ListWrap = styled(FlatList)`
  flex: 1;
`;

const EmailWrap = styled(View)`
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 200px;
`;

export default EmailSelect;
