import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/reducer";
import Icon from "@/components/Icon";
import statusSlice from "@/slices/status";

function Header() {
  const loggedIn = useSelector((state: RootState) => state.status.loggedIn);
  const dispatch = useDispatch();
  const showMenu = () => {
    dispatch(statusSlice.actions.setModal(true));
  };

  return (
    <Container>
      <Navgation>
        <LinkBox href="/" asChild>
          <Pressable>
            <Text style={{ color: "#fff", fontSize: 18 }}>Home</Text>
          </Pressable>
        </LinkBox>
        <LinkBox href="/list" asChild>
          <Pressable>
            <Text style={{ color: "#fff", fontSize: 18 }}>list</Text>
          </Pressable>
        </LinkBox>
      </Navgation>
      <MenuBtn href="/" asChild>
        <Pressable onPress={showMenu}>
          <Icon name="menu" size={20} color="#fff" />
        </Pressable>
      </MenuBtn>
    </Container>
  );
}
const Navgation = styled(View)`
  flex-direction: row;
`;
const MenuBtn = styled(Link)`
  padding: 20px 0;
`;

const LinkBox = styled(Link)`
  padding: 20px 20px 20px 0;
`;
const Container = styled(View)`
  flex-direction: row;
  background-color: ${(props: any) => props.theme.color.main};
  justify-content: space-between;
  padding: 0 5%;
`;

export default Header;
