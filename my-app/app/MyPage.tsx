import userSlice from "@/slices/user";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BtnDefaultStyle, BtnDefaultTextStyle } from "@/styles/globalStyls";
import { router } from "expo-router";
import { RootState } from "@/store/reducer";
import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";

const MyPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const LoggedOut = useCallback(() => {
    dispatch(userSlice.actions.setLoggedOut());
    SecureStore.deleteItemAsync("id");
    SecureStore.deleteItemAsync("nickname");
    SecureStore.deleteItemAsync("token");
    router.push("/");
  }, [router, user]);
  return (
    <View>
      <View>
        <Text>닉네임 : {user.nickname}</Text>
      </View>
      <View>
        <Text>UserId : {user.userId}</Text>
      </View>
      <View>
        <Text>Token : {user.token}</Text>
      </View>
      <Pressable onPress={LoggedOut} style={BtnDefaultStyle}>
        <Text style={BtnDefaultTextStyle}>로그아웃</Text>
      </Pressable>
    </View>
  );
};
export default MyPage;
