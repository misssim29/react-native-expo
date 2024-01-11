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
  Image,
} from "react-native";
import SubHeader from "@/components/SubHeader";
import { useRef, useState } from "react";
import styled from "styled-components";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const richText = useRef(null);
  const richScroll = useRef(null);
  const [pickedImages, setPickedImages] =
    useState<ImagePicker.ImagePickerAsset[]>();
  const APIURL = process.env.EXPO_PUBLIC_API_URL;
  const submitWrite = () => {
    console.log(title);
  };

  const onChangeTitle = (e) => {
    setTitle(e);
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // 권한이 여전히 없으면 사용자에게 모달 창을 통해 안내
      alert("권한을 수락해주세요.");
    }
  };
  const pickImageAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // 권한띄우기
    // if (status !== "granted") {
    //   requestPermission();
    // return false;
    // }

    let Imgresult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      // allowsMultipleSelection: true,
    });
    console.log(Imgresult.assets);

    if (!Imgresult.canceled) {
      // console.log(result.assets[0].uri);
      //이미지 선택
      await axios
        .post(
          APIURL + "/categories/articles/sign-s3",
          {
            file_name: ["sample.jpg"],
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
          const {
            url: imageUrl,
            data: { url: uploadUrl, fields },
          } = res.data.data.signed_urls[0];
          const formData = new FormData();
          console.log(imageUrl, uploadUrl, fields);

          const name = Imgresult.assets[0].uri.substring(
            Imgresult.assets[0].uri.lastIndexOf("/") + 1
          );
          const [, type] = name.split(".");
          const fileData: any = {
            name,
            type: "image/" + type,
            uri: Imgresult.assets[0].uri,
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
              console.log(res);
              setPickedImages(imageUrl);
              richText?.current.insertImage(
                imageUrl,
                "width:100%; height:auto; min-height:300px;"
              );
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("사진을 선택해주세요.");
    }
  };

  return (
    <>
      <SubHeader submit={submitWrite} title="글쓰기" />
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
              <BtnGallary onPress={pickImageAsync}>
                <BtnGallaryText>갤러리</BtnGallaryText>
              </BtnGallary>
            </View>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </>
  );
};

const TextTitle = styled(TextInput)`
  height: 50px;
  font-size: 16px;
  margin: 0 5%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${(props: any) => props.theme.color.text};
`;
const BtnGallary = styled(Pressable)`
  background-color: ${(props: any) => props.theme.color.main};
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
