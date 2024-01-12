import SubHeader from "@/components/SubHeader";
import { View, Text, Pressable } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import styled from "styled-components";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import modalSlice from "@/slices/modal";
import AgreeSignUp from "@/components/AgreeSignUp";
import axios from "axios";
import userSlice from "@/slices/user";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
// import Icon from "@/components/Icon";

const SignUp = () => {
  const emailRef = useRef(null);
  const emailTypeRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordcheckRef = useRef(null);
  const [showEmailList, setShowEmailList] = useState(false);
  const [userAgree, setUserAgree] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

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

  //inputbox 포커스
  const handleFocus = (name: string, type: boolean) => {
    setFocused({
      ...focused,
      [name]: type,
    });
  };

  //email 선택열기
  const dispatch = useDispatch();
  const openEmailExList = () => {
    setShowEmailList(true);
    dispatch(modalSlice.actions.setModal(true));
    dispatch(modalSlice.actions.setType("EmailList"));
  };
  const EmailType = useSelector((state: RootState) => state.modal.emailType);
  const onModal = useSelector((state: RootState) => state.modal.onModal);
  useEffect(() => {
    if (onModal === false) {
      setUserData({
        ...userData,
        emailtype: EmailType,
      });
    }
  }, [EmailType, onModal]);

  //동의항목
  const reciveToAgree = (data: any) => {
    setUserAgree({
      ...data,
    });
  };

  const onChangeInput = (e: string, type: string) => {
    setUserData({
      ...userData,
      [type]: e,
    });
  };
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const Submit = () => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,18}$/;
    if (!regex.test(userData.password)) {
      alert(
        "비밀번호는 영문, 숫자, 특수문자를 조합하여 6자 이상 18자 이하로 생성 가능합니다."
      );
      return false;
    }

    if (userData.password !== userData.passwordcheck) {
      alert("비밀번호를 체크해주세요.");
      return false;
    }

    dispatch(userSlice.actions.setLoading(true));
    const marketing = userAgree.marketing ? "true" : "false";
    axios
      .post(
        `${APIURL}/auth/signup`,
        {
          "user[email]": `${userData.email}@${userData.emailtype}`,
          "user[password]": userData.password,
          "user[marketing_agree]": marketing,
          "user[supply_third_party_agree]": "0",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status.code == "409") {
          alert("이미 등록된 Email입니다.");
          dispatch(userSlice.actions.setLoading(false));
        } else if (res.data.status.code == "200") {
          //로그인 작업
          const resUser = res.data.data.user;
          SecureStore.setItemAsync("id", resUser.id);
          SecureStore.setItemAsync("nickname", resUser["nick_name"]);
          SecureStore.setItemAsync("token", resUser.token);
          dispatch(
            userSlice.actions.setUser({
              id: resUser.id,
              nickname: resUser["nick_name"],
              token: resUser.token,
            })
          );
          dispatch(userSlice.actions.setLoading(false));
          router.replace("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        <AgreeSignUp sendToAgree={reciveToAgree} />
        <SubmitBtn
          onPress={Submit}
          disabled={
            userData.email !== "" &&
            userData.emailtype !== "" &&
            userData.password !== "" &&
            userData.passwordcheck !== "" &&
            userAgree.service &&
            userAgree.privacy
              ? false
              : true
          }
          style={{
            backgroundColor:
              userData.email !== "" &&
              userData.emailtype !== "" &&
              userData.password !== "" &&
              userData.passwordcheck !== "" &&
              userAgree.service &&
              userAgree.privacy
                ? "#fd3995"
                : "#ddd",
          }}
        >
          <SubmitText>가입완료</SubmitText>
        </SubmitBtn>
      </Wrap>
    </>
  );
};
const SubmitText = styled(Text)`
  color: #fff;
  font-size: 22px;
`;

const SubmitBtn = styled(Pressable)`
  margin: 20px 0;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 15px 0;
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
