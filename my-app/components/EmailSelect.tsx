import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import styled from "styled-components";

const EmailSelect = () => {
  const emailtype = useState([
    "naver.com",
    "hanmail.net",
    "nate.com",
    "gmail.com",
    "hotmail.com",
    "lycos.com",
    "empal.com",
  ]);
  return (
    <EmailWrap>
      <Text>Email</Text>
    </EmailWrap>
  );
};

const EmailWrap = styled(View)`
  z-index: 1;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default EmailSelect;
