import { View, Text } from "react-native";
import styled from "styled-components";

const Home = () => {
  return (
    <Flex>
      <Text>Home</Text>
    </Flex>
  );
};
const Flex = styled(View)`
  flex: 1;
`;

export default Home;
