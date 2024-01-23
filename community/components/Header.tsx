import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";

function Header() {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  return (
    <Container>
      <LinkBox href="/" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </LinkBox>
      <LinkBox href="/list" asChild>
        <Pressable>
          <Text>list</Text>
        </Pressable>
      </LinkBox>
    </Container>
  );
}
const LinkBox = styled(Link)`
  padding: 20px 5%;
`;
const Container = styled(View)`
  flex-direction: row;
  background-color: ${(props: any) => props.theme.color.main};
  border-bottom-width: 0.2px;
`;

export default Header;
