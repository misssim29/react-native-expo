import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import statusSlice from "@/slices/status";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState, useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import { RootState } from "@/store/reducer";

const Menu = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state: RootState) => state.status.loggedIn);
  const [onMenu, setOnMenu] = useState(false);

  const closeMenu = useCallback(() => {
    setOnMenu(false);
    setTimeout(() => {
      dispatch(statusSlice.actions.setShowMenu(false));
    }, 300);
  }, [onMenu]);

  const animatedStyle = useAnimatedStyle(() => {
    let status: number;
    if (onMenu) {
      status = 0;
    } else {
      status = 500;
    }
    return {
      left: withTiming(status, {
        duration: 300,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });

  useEffect(() => {
    setOnMenu(true);
  }, []);

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: "100%",
          backgroundColor: "#db6764",
          bottom: 0,
          left: "100%",
          zIndex: 101,
          position: "absolute",
          flex: 1,
        },
        animatedStyle,
      ]}
    >
      <SafeAreaView>
        <MenuHeader>
          <Pressable onPress={closeMenu}>
            <AntDesign name="close" size={30} color="#fff" />
          </Pressable>
        </MenuHeader>
        <View>
          {loggedIn ? (
            <BtnLogin>
              <BtnLoginText>마이페이지</BtnLoginText>
            </BtnLogin>
          ) : (
            <BtnLogin>
              <BtnLoginText>로그인</BtnLoginText>
            </BtnLogin>
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const BtnLogin = styled(TouchableOpacity)`
  background-color: #fff;
  margin: 0 5%;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;
const BtnLoginText = styled(Text)`
  font-size: 24px;
  color: ${(props) => props.theme.color.main};
  font-weight: bold;
`;

const MenuHeader = styled(View)`
  padding: 15px 5%;
  flex-direction: row;
  justify-content: flex-end;
`;

export default Menu;
