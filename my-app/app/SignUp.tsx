import SubHeader from "@/components/SubHeader";
import { View, Text, Pressable } from "react-native";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import styled from "styled-components";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useState, useRef } from "react";
import EmailSelect from "@/components/EmailSelect";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "@/slices/user";
import { RootState } from "@/store/reducer";
// import Icon from "@/components/Icon";

const SignUp = () => {
  const emailRef = useRef(null);
  const emailTypeRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordcheckRef = useRef(null);
  const [showEmailList, setShowEmailList] = useState(false);

  const [focused, setFocused] = useState({
    email: false,
    emailtype: false,
    password: false,
    passwordcheck: false,
  });
  const [userData, setUserData] = useState({
    email: "",
    emailtype: "",
    password: "",
    passwordcheck: "",
  });

  const [userAgree, setUserAgree] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  // 동의항목
  const Agree = (type: String) => {
    console.log(type);
  };

  //inputbox 포커스
  const handleFocus = (name: string, type: boolean) => {
    setFocused({
      ...focused,
      [name]: type,
    });
  };

  //email 선택열기
  const dispatch = useDispatch();
  const onModal = useSelector((state: RootState) => state.user.onModal);
  const openEmailExList = () => {
    setShowEmailList(true);
    dispatch(userSlice.actions.setModal(true));
  };

  const onChangeInput = (e: string, type: string) => {
    setUserData({
      ...userData,
      [type]: e,
    });
  };

  const Submit = () => {
    console.log(userData);
  };

  return (
    <>
      <SubHeader title="회원가입" submit={false} />
      <Wrap>
        <Flex>
          <SubTitle>필수 입력 정보</SubTitle>
        </Flex>
        <Flex>
          <Label>이메일</Label>
          <TextBox
            style={{
              borderBottomColor:
                focused.email || focused.emailtype ? "#fd3995" : "#747474",
            }}
          >
            <EmailInputBox
              placeholder="이메일"
              importantForAccessibility="yes"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              keyboardType="email-address"
              clearButtonMode="while-editing"
              onSubmitEditing={() => {
                emailTypeRef.current?.focus();
              }}
              blurOnSubmit={false}
              value={userData.email}
              onChangeText={(e) => {
                onChangeInput(e, "email");
              }}
              onFocus={() => {
                handleFocus("email", true);
              }}
              onBlur={() => {
                handleFocus("email", false);
              }}
              ref={emailRef}
            />
            <EmailAt
              style={{
                color: userData.email !== "" ? "#000" : "#ddd",
              }}
            >
              @
            </EmailAt>
            <EmailInputBox
              placeholder="직접 입력"
              importantForAccessibility="yes"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              keyboardType="email-address"
              clearButtonMode="while-editing"
              onSubmitEditing={() => {
                passwordRef.current?.focus();
              }}
              value={userData.emailtype}
              onChangeText={(e) => {
                onChangeInput(e, "emailtype");
              }}
              blurOnSubmit={false}
              onFocus={() => {
                handleFocus("emailtype", true);
              }}
              onBlur={() => {
                handleFocus("emailtype", false);
              }}
              ref={emailTypeRef}
            />
            <Pressable onPress={openEmailExList}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#ddd"
              />
              {/* 위에는 기존 expo에서 지원해주는 아이콘쓰기 아래는 내가 커스텀한 아이콘쓰기 */}
              {/* <Icon name="cafe" size={50} color="#222" /> */}
            </Pressable>
          </TextBox>
        </Flex>
        <Flex>
          <Label>비밀번호</Label>
          <TextBox
            style={{
              borderBottomColor: focused.password ? "#fd3995" : "#747474",
            }}
          >
            <EmailInputBox
              placeholder="영문,숫자,특수 문자를 조합하여 6자 이상"
              secureTextEntry
              importantForAccessibility="yes"
              autoComplete="password"
              returnKeyType="next"
              textContentType="newPassword"
              clearButtonMode="while-editing"
              onSubmitEditing={() => {
                passwordcheckRef.current?.focus();
              }}
              value={userData.password}
              onChangeText={(e) => {
                onChangeInput(e, "password");
              }}
              blurOnSubmit={false}
              onFocus={() => {
                handleFocus("password", true);
              }}
              onBlur={() => {
                handleFocus("password", false);
              }}
              ref={passwordRef}
            />
          </TextBox>
        </Flex>
        <Flex>
          <Label>비밀번호 재확인</Label>
          <TextBox
            style={{
              borderBottomColor: focused.passwordcheck ? "#fd3995" : "#747474",
            }}
          >
            <EmailInputBox
              placeholder="비밀번호 재확인"
              secureTextEntry
              importantForAccessibility="yes"
              autoComplete="password"
              textContentType="newPassword"
              clearButtonMode="while-editing"
              onSubmitEditing={() => {
                passwordcheckRef.current?.focus();
              }}
              value={userData.passwordcheck}
              onChangeText={(e) => {
                onChangeInput(e, "passwordcheck");
              }}
              blurOnSubmit={false}
              onFocus={() => {
                handleFocus("passwordcheck", true);
              }}
              onBlur={() => {
                handleFocus("passwordcheck", false);
              }}
              ref={passwordcheckRef}
            />
          </TextBox>
        </Flex>
        <Flex>
          <Flex>
            <SubTitle>약관동의</SubTitle>
          </Flex>
          <AgreeBox>
            <BtnAgree
              onPress={() => {
                Agree("all");
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                size={24}
                color="#ddd"
              />
              <AgreeTextAll>아래의 내용에 모두 동의합니다</AgreeTextAll>
            </BtnAgree>
          </AgreeBox>
          <AgreeBox>
            <BtnAgree
              onPress={() => {
                Agree("service");
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color="#ddd"
              />
              <AgreeText>서비스 이용약관 동의(필수)</AgreeText>
            </BtnAgree>
            <Feather name="chevron-down" size={24} color="#ddd" />
          </AgreeBox>
          <AgreeBox>
            <BtnAgree
              onPress={() => {
                Agree("privacy");
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color="#ddd"
              />
              <AgreeText>개인정보 취급방침(필수)</AgreeText>
            </BtnAgree>
            <Feather name="chevron-down" size={24} color="#ddd" />
          </AgreeBox>
          <AgreeBox>
            <BtnAgree
              onPress={() => {
                Agree("marketing");
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color="#ddd"
              />
              <AgreeText>마케팅 정보 수신(선택)</AgreeText>
            </BtnAgree>
            <Feather name="chevron-down" size={24} color="#ddd" />
          </AgreeBox>
        </Flex>
        <SubmitBtn onPress={Submit}>
          <SubmitText>가입완료</SubmitText>
        </SubmitBtn>
      </Wrap>
      {showEmailList && onModal ? <EmailSelect /> : ""}
    </>
  );
};
const SubmitText = styled(Text)`
  color: #fff;
  font-size: 22px;
`;

const SubmitBtn = styled(Pressable)`
  background-color: ${(props: any) => props.theme.color.main};
  margin: 20px 0;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 15px 0;
`;

const AgreeTextAll = styled(Text)`
  font-size: 17px;
  color: #000;
  flex: 1;
  margin-left: 10px;
  font-weight: bold;
`;

const AgreeText = styled(Text)`
  font-size: 16px;
  color: #444;
  flex: 1;
  margin-left: 10px;
`;

const AgreeBox = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 0.5px;
  border-bottom-color: #ddd;
`;

const BtnAgree = styled(Pressable)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const EmailAt = styled(Text)`
  margin-right: 10%;
  font-size: 20px;
`;

const EmailInputBox = styled(TextInput)`
  flex: 1;
  font-size: 18px;
`;

const Wrap = styled(ScrollView)`
  flex: 1;
  padding: 0 5%;
`;

const TextBox = styled(View)`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 0.5px;
  padding-bottom: 10px;
  margin-bottom: 30px;
`;

const Label = styled(Text)`
  font-size: 14px;
  color: ${(props: any) => props.theme.color.text};
  margin: 10px 0;
`;

const Flex = styled(View)`
  flex: 1;
`;
const SubTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 30px 0 10px 0;
`;

export default SignUp;
