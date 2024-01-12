import { View, Text, Pressable, TextInput } from "react-native";
import { Link, router } from "expo-router";
import styled from "styled-components";
import { useState, useRef, useCallback } from "react";
import { BtnDefaultStyle, BtnDefaultTextStyle } from "@/styles/globalStyls";
import axios from "axios";
import { useDispatch } from "react-redux";
import userSlice from "@/slices/user";
import * as SecureStore from "expo-secure-store";

const login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [emailStyle, setEmailStyle] = useState("#ddd");
  const [passwordStyle, setPasswordStyle] = useState("#ddd");
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const dispatch = useDispatch();
  const onChangeEmail = useCallback(
    (e: string) => {
      setUserEmail(e);
    },
    [userEmail]
  );
  const onChangePwd = useCallback(
    (e: string) => {
      setUserPassword(e);
    },
    [userPassword]
  );

  const onLogin = useCallback(() => {
    console.log("계정정보", userEmail, userPassword);
    dispatch(userSlice.actions.setLoading(true));
    axios
      .post(
        `${APIURL}/auth/login`,
        {
          email: userEmail,
          password: userPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status.code == "200") {
          //로그인성공
          const resUser = res.data.data.user;
          dispatch(
            userSlice.actions.setUser({
              id: resUser.id,
              nickname: resUser["nick_name"],
              token: resUser.token,
            })
          );
          SecureStore.setItemAsync("id", resUser.id);
          SecureStore.setItemAsync("nickname", resUser["nick_name"]);
          SecureStore.setItemAsync("token", resUser.token);
          dispatch(userSlice.actions.setLoading(false));
          router.push("/");
        } else {
          alert(res.data.status.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail, userPassword]);
  return (
    <>
      <Flex>
        <View>
          <Title>로그인</Title>
        </View>
        <View>
          <InputBox
            placeholder="이메일을 입력하세요"
            value={userEmail}
            style={{ borderColor: emailStyle }}
            onChangeText={onChangeEmail}
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
        <Pressable onPress={onLogin} style={BtnDefaultStyle}>
          <Text style={BtnDefaultTextStyle}>로그인</Text>
        </Pressable>
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
const BtnSignUp = styled(Link)`
  border-width: 1px;
  border-color: ${(props: any) => props.theme.color.main};
  border-radius: 6px;
  margin: 10px 5%;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
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
