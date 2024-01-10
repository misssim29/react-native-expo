import { View, Text, Pressable, TextInput } from "react-native";
import { Link } from "expo-router";
import styled from "styled-components";
import { useState, useRef, useCallback } from "react";

const login = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [emailStyle, setEmailStyle] = useState("#ddd");
  const [passwordStyle, setPasswordStyle] = useState("#ddd");

  const onChangeId = useCallback(
    (e: string) => {
      setUserId(e);
    },
    [userId]
  );
  const onChangePwd = useCallback(
    (e: string) => {
      setUserPassword(e);
    },
    [userPassword]
  );

  const onLogin = useCallback(() => {
    console.log("로그인");
  }, []);
  return (
    <>
      <Flex>
        <View>
          <Title>로그인</Title>
        </View>
        <View>
          <InputBox
            placeholder="이메일을 입력하세요"
            value={userId}
            style={{ borderColor: emailStyle }}
            onChangeText={onChangeId}
            placeholderTextColor={"#ddd"}
            importantForAccessibility="yes"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            keyboardType="email-address"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            blurOnSubmit={false}
            ref={emailRef}
            clearButtonMode="while-editing"
            onFocus={() => {
              setEmailStyle("#fd3995");
            }}
            onBlur={() => {
              setEmailStyle("#ddd");
            }}
          />
        </View>
        <View>
          <InputBox
            ref={passwordRef}
            value={userPassword}
            style={{ borderColor: passwordStyle }}
            secureTextEntry
            onChangeText={onChangePwd}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor={"#ddd"}
            importantForAccessibility="yes"
            autoComplete="password"
            textContentType="newPassword"
            clearButtonMode="while-editing"
            onSubmitEditing={onLogin}
            onFocus={() => {
              setPasswordStyle("#fd3995");
            }}
            onBlur={() => {
              setPasswordStyle("#ddd");
            }}
          />
        </View>
      </Flex>
      <View>
        <BtnLogin onPress={onLogin}>
          <BtnLoginText>로그인</BtnLoginText>
        </BtnLogin>
        <BtnSignUp href="/SignUp" asChild>
          <Pressable>
            <BtnSignText>회원가입</BtnSignText>
          </Pressable>
        </BtnSignUp>
      </View>
    </>
  );
};

const Title = styled(Text)`
  font-weight: bold;
  font-size: 32px;
  padding: 20px 0;
`;

const Flex = styled(View)`
  flex: 1;
  padding: 0 5%;
`;
const BtnLogin = styled(Pressable)`
  background-color: ${(props: any) => props.theme.color.main};
  border-radius: 6px;
  margin: 10px 5%;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
const BtnSignUp = styled(Link)`
  border-width: 1px;
  border-color: ${(props: any) => props.theme.color.main};
  border-radius: 6px;
  margin: 10px 5%;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
const BtnLoginText = styled(Text)`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;
const BtnSignText = styled(Text)`
  color: ${(props: any) => props.theme.color.main};
  font-size: 30px;
  font-weight: bold;
`;
const InputBox = styled(TextInput)`
  border-width: 1px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;
`;

export default login;
