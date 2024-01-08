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

const Write = () => {
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const richText = useRef(null);
  const richScroll = useRef(null);
  const [pickedImages, setPickedImages] = useState<
    ImagePicker.ImagePickerAsset[]
  >([]);

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
    // if (status !== "granted") {
    //   requestPermission();
    // return false;
    // }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      // allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setPickedImages(result.assets);
      richText?.current.insertImage(
        { url: result.assets[0].uri },
        "width:200px; height:200px"
      );
    } else {
      alert("사진을 선택해주세요.");
    }
  };

  return (
    <>
      <SubHeader submit={submitWrite} />
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
