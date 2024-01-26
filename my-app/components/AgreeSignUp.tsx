import { View, Text, Pressable } from "react-native";
import styled from "styled-components";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import Animated, {
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

const AgreeSignUp = ({ sendToAgree }) => {
  const [userAgree, setUserAgree] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });
  const [showAgree, setShowAgree] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });
  // 동의항목
  const Agree = useCallback(
    (type: string) => {
      if (type === "all") {
        if (userAgree.service && userAgree.privacy && userAgree.marketing) {
          setUserAgree({
            service: false,
            privacy: false,
            marketing: false,
          });
        } else {
          setUserAgree({
            service: true,
            privacy: true,
            marketing: true,
          });
        }
      } else {
        setUserAgree({
          ...userAgree,
          [type]: !userAgree?.[type],
        });
      }
    },
    [userAgree]
  );

  useEffect(() => {
    sendToAgree(userAgree);
  }, [userAgree, userAgree.service, userAgree.marketing, userAgree.privacy]);

  const showDetail = (type: string) => {
    setShowAgree({
      ...showAgree,
      [type]: !showAgree?.[type],
    });
  };

  const openServiceStyle = useAnimatedStyle(() => {
    let status: number;
    if (showAgree.service) {
      status = 200;
    } else {
      status = 0;
    }
    return {
      height: withTiming(status, {
        duration: 300,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });
  const openMarketingStyle = useAnimatedStyle(() => {
    let status: number;
    if (showAgree.marketing) {
      status = 200;
    } else {
      status = 0;
    }
    return {
      height: withTiming(status, {
        duration: 300,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });
  const openPrivacyStyle = useAnimatedStyle(() => {
    let status: number;
    if (showAgree.privacy) {
      status = 200;
    } else {
      status = 0;
    }
    return {
      height: withTiming(status, {
        duration: 300,
        easing: Easing.bezier(0.5, 0.01, 0, 1),
      }),
    };
  });

  return (
    <>
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
              color={
                userAgree.service && userAgree.privacy && userAgree.marketing
                  ? "#fd3995"
                  : "#ddd"
              }
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
            {userAgree.service ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                size={24}
                color="#fd3995"
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color="#ddd"
              />
            )}
            <AgreeText>서비스 이용약관 동의(필수)</AgreeText>
          </BtnAgree>
          <Pressable
            onPress={() => {
              showDetail("service");
            }}
          >
            <Feather
              name="chevron-down"
              size={24}
              color={showAgree.service ? "#222" : "#ddd"}
              style={[
                {
                  transform: [
                    { rotate: showAgree.service ? "180deg" : "0deg" },
                  ],
                },
              ]}
            />
          </Pressable>
        </AgreeBox>
        <Animated.ScrollView style={[{ height: 0 }, openServiceStyle]}>
          <DetailExplainText>
            개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침 동의
            개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의개인정보 취급방침 동의 개인정보 취급방침 동의 개인정보 취급방침
            동의
          </DetailExplainText>
        </Animated.ScrollView>
        <AgreeBox>
          <BtnAgree
            onPress={() => {
              Agree("privacy");
            }}
          >
            {userAgree.privacy ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                size={24}
                color="#fd3995"
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color="#ddd"
              />
            )}
            <AgreeText>개인정보 취급방침(필수)</AgreeText>
          </BtnAgree>
          <Pressable
            onPress={() => {
              showDetail("privacy");
            }}
          >
            <Feather
              name="chevron-down"
              size={24}
              color={showAgree.privacy ? "#222" : "#ddd"}
              style={[
                {
                  transform: [
                    { rotate: showAgree.privacy ? "180deg" : "0deg" },
                  ],
                },
              ]}
            />
          </Pressable>
        </AgreeBox>
        <Animated.ScrollView style={[{ height: 0 }, openPrivacyStyle]}>
          <DetailExplainText>
            속닥이 제공하는 서비스를 이용해주셔서 진심으로 감사합니다. 이 약관은
            속닥(이하 회사라 합니다)이 제공하는 속닥 서비스(이하 서비스라
            합니다)의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항,
            이용 조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.
            조금만 시간을 내서 주의 깊게 읽어주시면 감사하겠습니다!제 1 장 총칙
            제 1조 (목적) 본 약관은 서비스(이하 "회사"라 한다)는 홈페이지에서
            제공하는 서비스(이하 "서비스"라 한다)를 제공함에 있어 회사와
            이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. 제 2조
            (용어의 정의) 1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            '서비스'란 회사가 이용자에게 서비스를 제공하기 위하여 컴퓨터 등
            정보통신설비를 이용하여 구성한 가상의 공간을 의미하며, 서비스 자체를
            의미하기도 합니다. '회원(이하 "회원"이라 한다)'이란 개인정보를
            제공하여 회원등록을 한 자로서 홈페이지의 정보를 지속적으로
            제공받으며 홈페이지가 제공하는 서비스를 계속적으로 이용할 수 있는
            자를 말합니다. '아이디(이하 "ID"라 한다)'란 회원의 식별과 회원의
            서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 회원 고유의
            계정 정보를 의미합니다. '비밀번호'란 회원이 부여 받은 ID와 일치된
            회원임을 확인하고, 회원의 개인정보를 보호하기 위하여 회원이 정한
            문자와 숫자의 조합을 의미합니다. '회원탈퇴(이하 "탈퇴"라 한다)'란
            회원이 이용계약을 해지하는 것을 의미합니다. 2. 본 약관에서 사용하는
            용어의 정의는 제1항에서 정하는 것을 제외하고는 관계법령 및 서비스 별
            안내에서 정하는 바에 의합니다. 제 3조 (이용약관의 효력 및 변경) 1.
            회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 각 서비스 사이트의
            초기 서비스화면에 게시합니다. 2. 회사는 약관의 규제에 관한 법률,
            전자거래기본법, 전자 서명법, 정보통신망 이용촉진 및 정보보호 등에
            관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수
            있습니다. 3. 회사는 본 약관을 개정할 경우에는 적용일자 및 개정사유를
            명시하여 현행 약관과 함께 회사가 제공하는 서비스 사이트의 초기
            화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만,
            회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의
            사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정
            후 내용을 명확하게 비교하여 회원이 알기 쉽도록 표시합니다. 4. 회원은
            개정된 약관에 대해 거부할 권리가 있습니다. 회원은 개정된 약관에
            동의하지 않을 경우 서비스 이용을 중단하고 회원등록을 해지할 수
            있습니다. 단, 개정된 약관의 효력 발생일 이후에도 서비스를 계속
            이용할 경우에는 약관의 변경사항에 동의한 것으로 간주합니다. 5.
            변경된 약관에 대한 정보를 알지 못해 발생하는 회원 피해는 회사가
            책임지지 않습니다. 제 4조 (약관 외 준칙) 1. 본 약관은 회사가
            제공하는 서비스에 관해 별도의 정책 및 운영규칙과 함께 적용됩니다. 2.
            본 약관에 명시되지 아니한 사항과 본 약관의 해석에 관하여는
            관계법령에 따릅니다.
          </DetailExplainText>
        </Animated.ScrollView>
        <AgreeBox>
          <BtnAgree
            onPress={() => {
              Agree("marketing");
            }}
          >
            {userAgree.marketing ? (
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                size={24}
                color="#fd3995"
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color="#ddd"
              />
            )}
            <AgreeText>마케팅 정보 수신(선택)</AgreeText>
          </BtnAgree>
          <Pressable
            onPress={() => {
              showDetail("marketing");
            }}
          >
            <Feather
              name="chevron-down"
              size={24}
              color={showAgree.marketing ? "#222" : "#ddd"}
              style={[
                {
                  transform: [
                    { rotate: showAgree.marketing ? "180deg" : "0deg" },
                  ],
                },
              ]}
            />
          </Pressable>
        </AgreeBox>
        <Animated.ScrollView style={[{ height: 0 }, openMarketingStyle]}>
          <DetailExplainText>
            속닥이 제공하는 서비스를 이용해주셔서 진심으로 감사합니다. 이 약관은
            속닥(이하 회사라 합니다)이 제공하는 속닥 서비스(이하 서비스라
            합니다)의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항,
            이용 조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.
            조금만 시간을 내서 주의 깊게 읽어주시면 감사하겠습니다!제 1 장 총칙
            제 1조 (목적) 본 약관은 서비스(이하 "회사"라 한다)는 홈페이지에서
            제공하는 서비스(이하 "서비스"라 한다)를 제공함에 있어 회사와
            이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다. 제 2조
            (용어의 정의) 1. 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            '서비스'란 회사가 이용자에게 서비스를 제공하기 위하여 컴퓨터 등
            정보통신설비를 이용하여 구성한 가상의 공간을 의미하며, 서비스 자체를
            의미하기도 합니다. '회원(이하 "회원"이라 한다)'이란 개인정보를
            제공하여 회원등록을 한 자로서 홈페이지의 정보를 지속적으로
            제공받으며 홈페이지가 제공하는 서비스를 계속적으로 이용할 수 있는
            자를 말합니다. '아이디(이하 "ID"라 한다)'란 회원의 식별과 회원의
            서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 회원 고유의
            계정 정보를 의미합니다. '비밀번호'란 회원이 부여 받은 ID와 일치된
            회원임을 확인하고, 회원의 개인정보를 보호하기 위하여 회원이 정한
            문자와 숫자의 조합을 의미합니다. '회원탈퇴(이하 "탈퇴"라 한다)'란
            회원이 이용계약을 해지하는 것을 의미합니다. 2. 본 약관에서 사용하는
            용어의 정의는 제1항에서 정하는 것을 제외하고는 관계법령 및 서비스 별
            안내에서 정하는 바에 의합니다. 제 3조 (이용약관의 효력 및 변경) 1.
            회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 각 서비스 사이트의
            초기 서비스화면에 게시합니다. 2. 회사는 약관의 규제에 관한 법률,
            전자거래기본법, 전자 서명법, 정보통신망 이용촉진 및 정보보호 등에
            관한 법률 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수
            있습니다. 3. 회사는 본 약관을 개정할 경우에는 적용일자 및 개정사유를
            명시하여 현행 약관과 함께 회사가 제공하는 서비스 사이트의 초기
            화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만,
            회원에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의
            사전 유예기간을 두고 공지합니다. 이 경우 회사는 개정 전 내용과 개정
            후 내용을 명확하게 비교하여 회원이 알기 쉽도록 표시합니다. 4. 회원은
            개정된 약관에 대해 거부할 권리가 있습니다. 회원은 개정된 약관에
            동의하지 않을 경우 서비스 이용을 중단하고 회원등록을 해지할 수
            있습니다. 단, 개정된 약관의 효력 발생일 이후에도 서비스를 계속
            이용할 경우에는 약관의 변경사항에 동의한 것으로 간주합니다. 5.
            변경된 약관에 대한 정보를 알지 못해 발생하는 회원 피해는 회사가
            책임지지 않습니다. 제 4조 (약관 외 준칙) 1. 본 약관은 회사가
            제공하는 서비스에 관해 별도의 정책 및 운영규칙과 함께 적용됩니다. 2.
            본 약관에 명시되지 아니한 사항과 본 약관의 해석에 관하여는
            관계법령에 따릅니다.
          </DetailExplainText>
        </Animated.ScrollView>
      </Flex>
    </>
  );
};

const Flex = styled(View)`
  flex: 1;
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
const DetailExplainText = styled(Text)`
  font-size: 16px;
  margin: 10px 0;
`;

const SubTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 30px 0 10px 0;
`;

export default AgreeSignUp;
