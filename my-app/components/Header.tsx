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
      <LinkBox href="/kakao" asChild>
        <Pressable>
          <Text>Kakao</Text>
        </Pressable>
      </LinkBox>
      <LinkBox href="/list" asChild>
        <Pressable>
          <Text>List</Text>
        </Pressable>
      </LinkBox>
      {loggedIn ? (
        <LinkBox href="/MyPage" asChild>
          <Pressable>
            <Text>Mypage</Text>
          </Pressable>
        </LinkBox>
      ) : (
        <LinkBox href="/login" asChild>
          <Pressable>
            <Text>Login</Text>
          </Pressable>
        </LinkBox>
      )}
      <LinkBox href="/Webview" asChild>
        <Pressable>
          <Text>Webview</Text>
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
  border-bottom: "#000";
  border-bottom-width: 0.2px;
`;

export default Header;
