import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import MainTabTable from "@/components/MainTabTable";

function Page() {
  return (
    <>
      <Container>
        <TextBox>Hello React Native Expo!</TextBox>
      </Container>
      <MainTabTable></MainTabTable>
      <View style={{ flex: 1 }}></View>
    </>
  );
}
const Container = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const TextBox = styled(Text)`
  text-align: center;
  color: ${(props: any) => props.theme.color.main};
`;

export default Page;
