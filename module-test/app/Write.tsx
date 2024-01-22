import {
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  LayoutChangeEvent,
  Pressable,
  Dimensions,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef } from "react";
import styled from "styled-components";
import { Image } from "expo-image";
import axios from "axios";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

const Write = () => {
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const richText = useRef(null);
  const richScroll = useRef(null);
  const [ImageSelect, setImageSelect] = useState([]);
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const { width: DeviceWidth, height: DeviceHeight } = Dimensions.get("window");
  const pickImageAsync = async () => {
    await ImagePicker.openPicker({
      multiple: true,
      loadingLabelText: "사진 선택중...",
      compressImageQuality: 1,
    })
      .then(async (images) => {
        const Imgresult = [];
        const ImgName = [];
        for await (const image of images) {
          const img = await ImagePicker.openCropper({
            mediaType: "photo",
            path: image.path,
            freeStyleCropEnabled: true,
            includeBase64: true,
          });
          Imgresult.push(img);
          ImgName.push(img.path.substring(img.path.lastIndexOf("/") + 1));
        }
        // 이미지전송
        await axios
          .post(
            APIURL + "/categories/articles/sign-s3",
            {
              file_name: ImgName,
              user_id: 603200,
            },
            {
              headers: {
                Authorization:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWVkIjoiMjAyNC0wMS0wOVQwNzoyNDowNi4xNzg5MzAiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJ0ZWRkeSIsImltYWdlIjp7InVybCI6Imh0dHBzOi8vaW1hZ2VzLnNvY2RvYy5pby91c2VyL21lbWJlcl9wcm9maWxlXzIwLnBuZyIsInR5cGUiOiJ0aHVtYm5haWwifSwicHJvdmlkZXIiOjAsIm5pY2tfbmFtZSI6Ilx1YzU0NFx1YjI5NFx1YzViOFx1YjJjOCIsImFnZSI6MjAwMCwiaWQiOjYwMzIwMCwiZW1haWwiOiJ0ZWRkeUBjcmVlZS5jbyJ9.wk9H7bTuvVeiC8lSCWbfsm_PjYZwKg0Q6FVvKWDvLGU",
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (res) => {
            if (res.status !== 200) {
              alert("이미지 전송에 실패하였습니다.");
              return false;
            }
            let Cnt = 0;
            let UrlArr = [];
            for await (const Result of Imgresult) {
              const {
                url: imageUrl,
                data: { url: uploadUrl, fields },
              } = res.data.data.signed_urls[Cnt];
              const formData = new FormData();
              const name = Result.path.substring(
                Result.path.lastIndexOf("/") + 1
              );
              const fileData: any = {
                name,
                type: Result.mime,
                uri: `data:${Result.mime};base64,${Result.data}`,
              };
              formData.append("policy", fields.policy);
              formData.append("key", fields.key);
              formData.append("acl", fields["acl"]);
              formData.append("x-amz-algorithm", fields["x-amz-algorithm"]);
              formData.append("x-amz-credential", fields["x-amz-credential"]);
              formData.append("x-amz-date", fields["x-amz-date"]);
              formData.append(
                "x-amz-security-token",
                fields["x-amz-security-token"]
              );
              formData.append("x-amz-signature", fields["x-amz-signature"]);
              formData.append("Content-Type", fields["Content-Type"]);
              formData.append("file", fileData);
              await axios
                .post(uploadUrl, formData, {
                  headers: {
                    "Content-Type": fields["Content-Type"],
                    "Content-Encoding": "base64",
                  },
                })
                .then((res) => {
                  UrlArr.push(imageUrl);
                  console.log(Result.height / Result.width);
                  richText?.current.insertImage(
                    imageUrl,
                    `width:100%; height:${
                      (Result.height / Result.width) * (DeviceWidth * 0.9)
                    }px`
                  );
                })
                .catch((error) => {
                  console.log(error);
                });
              Cnt++;
            }
            await setImageSelect(UrlArr);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        alert("이미지를 선택해주세요.");
      });
  };
  const pickCameraAsync = async () => {
    ImagePicker.openCamera({
      cropping: true,
      useFrontCamera: false,
      showCropFrame: true,
      compressImageQuality: 1,
      freeStyleCropEnabled: true,
      includeBase64: true,
    })
      .then((image) => {
        setImageSelect([image]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTitle = (e) => {
    setTitle(e);
  };
  return (
    <>
      <TextTitle
        placeholder="제목을 입력하시오"
        value={title}
        onChangeText={onChangeTitle}
      />
      <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
        {Platform.OS === "android" ? (
          <ScrollView
            ref={richScroll}
            style={{ flex: 1, backgroundColor: "red" }}
          >
            <KeyboardAvoidingView
              behavior={"height"}
              style={{
                flex: 1,
              }}
              enabled
            >
              <RichEditor
                style={{
                  paddingLeft: "3%",
                  paddingRight: "3%",
                  flex: 1,
                  backgroundColor: "gray",
                }}
                ref={richText}
                placeholder="내용을 입력하시오"
                initialFocus={true}
                useContainer={true}
                pasteAsPlainText={true}
                onChange={(text: string) => {
                  setContentText(text);
                }}
                onHeightChange={(scrollY) => {
                  setTimeout(() => {
                    richScroll &&
                      richScroll?.current?.scrollTo({
                        y: scrollY + 20,
                      });
                  }, 50);
                }}
              />
              <View>
                <BtnGallary onPress={pickImageAsync}>
                  <BtnGallaryText>갤러리</BtnGallaryText>
                </BtnGallary>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        ) : (
          <KeyboardAvoidingView
            behavior={"padding"}
            style={{
              flex: 1,
            }}
            enabled
            keyboardVerticalOffset={160}
          >
            <ScrollView
              ref={richScroll}
              style={{ flex: 1, backgroundColor: "red" }}
            >
              <RichEditor
                style={{
                  paddingLeft: "3%",
                  paddingRight: "3%",
                  flex: 1,
                  backgroundColor: "gray",
                }}
                ref={richText}
                placeholder="내용을 입력하시오"
                initialFocus={true}
                useContainer={true}
                pasteAsPlainText={true}
                onChange={(text: string) => {
                  setContentText(text);
                }}
                onHeightChange={(scrollY) => {
                  setTimeout(() => {
                    richScroll &&
                      richScroll?.current?.scrollTo({
                        y: scrollY + 20,
                      });
                  }, 50);
                }}
              />
            </ScrollView>
            <View>
              <Btns>
                <Pressable onPress={pickImageAsync}>
                  <AntDesign name="picture" size={50} color="black" />
                </Pressable>
                <Pressable onPress={pickCameraAsync}>
                  <AntDesign name="camerao" size={50} color="black" />
                </Pressable>
              </Btns>
            </View>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </>
  );
};

const Btns = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  border-top-width: 0.5px;
  border-top-color: #000;
  padding: 30px 5%;
`;

const TextTitle = styled(TextInput)`
  height: 50px;
  font-size: 16px;
  margin: 0 5%;
  border-bottom-width: 0.5px;
  border-bottom-color: #505050;
`;
const BtnGallary = styled(Pressable)`
  background-color: #fd3995;
  height: 50px;
  width: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0px auto 0px 5%;
`;
const BtnGallaryText = styled(Text)`
  color: #fff;
  font-size: 20px;
`;

export default Write;
