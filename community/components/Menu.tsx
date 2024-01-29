import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import statusSlice from "@/slices/status";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState, useCallback } from "react";

const Menu = () => {
  const dispatch = useDispatch();

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
      <MenuWrap>
        <SafeAreaView>
          <View>
            <Pressable onPress={closeMenu}>
              <Text>닫기</Text>
            </Pressable>
          </View>
          <Text style={{ color: "#222" }}>Menu</Text>
        </SafeAreaView>
      </MenuWrap>
    </Animated.View>
  );
};

const MenuWrap = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background-color: ${(props: any) => props.theme.color.main};
  z-index: 101;
`;

export default Menu;
