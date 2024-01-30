import { View, Text, Dimensions } from "react-native";
import { Buffer } from "@craftzdog/react-native-buffer";
import { btoa } from "react-native-quick-base64";
import { Link } from "expo-router";
import styled from "styled-components/native";
import { WebView } from "react-native-webview";
import { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";

function ListItem({ item, idx }: any) {
  const btoaText = btoa(item.id);
  const bufferTitle = item.title;
  const title = Buffer.from(bufferTitle, "base64").toString("utf8");
  //웹뷰로 네이버 AD호출
  const html = `
    <script
      src="https://ssl.pstatic.net/adimg3.search/adpost/js/adpost_show_ads_v2.min.js"
    ></script>
    <script>
      function handle_naver_ads_response(response) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify([
            {
              clickUrl:response.ads[0].clickUrl,
              displayUrl:response.ads[0].displayUrl,
              headline:response.ads[0].headline,
              description:response.ads[0].description,
              naverPayIconType:response.ads[0].naverPayIconType
            },{
              clickUrl:response.ads[1].clickUrl,
              displayUrl:response.ads[1].displayUrl,
              headline:response.ads[1].headline,
              description:response.ads[1].description,
              naverPayIconType:response.ads[1].naverPayIconType
            }
          ])
        )
      }
      NAVER_ADPOST_V2({
        channel: "m_socdoc.ch4", // 채널명
        pageSize: 2 , // 광고 요청 개수
        keywordGroup: "모바일속닥_공통", // 키워드그룹명
        url: "https://misssim29.github.io/webview-test/", // 광고가 노출된 페이지의 URL
        test: true, // 샌드박스(QA) 환경 연동
      });
    </script>
  `;
  interface NaverAdType {
    clickUrl: string;
    displayUrl: string;
    headline: string;
    description: string;
    naverPayIconType: number;
  }
  const [NaverAd, setNaverAD] = useState<NaverAdType[]>([]);
  const onMessage = useCallback(
    (event) => {
      const data = event.nativeEvent.data;
      setNaverAD(JSON.parse(data));
    },
    [NaverAd]
  );
  return (
    <>
      <ListBox>
        <Link href={`/cate/${btoaText}`}>
          <View>
            <TitleBox>
              <Title numberOfLines={1} ellipsizeMode="tail">
                {title}
              </Title>
            </TitleBox>
            <InfoBox>
              <Text>조회수 : {item.view_count}</Text>
              <Text> | 좋아요 : {item.like_count}</Text>
              <Text> | 댓글 : {item.reply_count}</Text>
              <Text> | 스크랩 : {item.scrap_count}</Text>
            </InfoBox>
          </View>
        </Link>
      </ListBox>
      {idx % 6 === 0 && idx > 0 ? (
        <NaverAdWrap>
          <WebView source={{ html }} onMessage={onMessage} />
          {NaverAd.map((item, index) => (
            <AdLink href={item.clickUrl} key={index}>
              <View>
                <AdTitleWrap>
                  <AdTitle>{item.headline}</AdTitle>
                  {item.naverPayIconType === 1 ? (
                    <Image
                      source={require("@/assets/naverIcon/npay.png")}
                      contentFit="contain"
                      style={{
                        width: 50,
                        marginLeft: 5,
                      }}
                    />
                  ) : item.naverPayIconType === 2 ? (
                    <Image
                      source={require("@/assets/naverIcon/npay_plus.png")}
                      contentFit="contain"
                      style={{
                        width: 50,
                        marginLeft: 5,
                      }}
                    />
                  ) : (
                    ""
                  )}
                </AdTitleWrap>
                <View>
                  <View>
                    <AdDisplayLink>{item.displayUrl}</AdDisplayLink>
                  </View>
                  <View>
                    <AdDescription>{item.description}</AdDescription>
                  </View>
                </View>
              </View>
            </AdLink>
          ))}
        </NaverAdWrap>
      ) : (
        ""
      )}
    </>
  );
}

const NaverAdWrap = styled(View)`
  margin: 10px 0;
`;

const AdTitleWrap = styled(View)`
  flex-direction: row;
`;

const AdLink = styled(Link)`
  text-decoration: none;
  margin: 10px 5%;
  color: #505050;
`;
const AdTitle = styled(Text)`
  font-size: 16px;
  font-weight: normal;
  text-decoration: underline;
  margin: 0;
`;

const AdDisplayLink = styled(Text)`
  font-size: 12px;
  margin: 6px 0;
  color: rgb(227, 123, 172);
  font-weight: normal;
`;
const AdDescription = styled(Text)`
  margin: 0;
  color: rgb(144, 144, 144);
  font-size: 12px;
`;

const ListBox = styled(View)`
  padding: 20px 20px 0px 20px;
`;
const TitleBox = styled(View)`
  width: 100%;
`;
const Title = styled(Text)`
  font-weight: bold;
  font-size: 16px;
`;
const InfoBox = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export default ListItem;
