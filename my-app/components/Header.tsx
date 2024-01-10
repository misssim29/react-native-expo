import { View, StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import styled from "styled-components";

function Header() {
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
      <LinkBox href="/login" asChild>
        <Pressable>
          <Text>Login</Text>
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
