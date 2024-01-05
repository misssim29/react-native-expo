import {
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  LayoutChangeEvent,
} from "react-native";
import SubHeader from "@/components/SubHeader";
import { useRef, useState } from "react";
import styled from "styled-components";
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
  const [editorHeight, setEditorHeight] = useState(100);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const submitWrite = () => {
    console.log(title);
  };

  const onChangeTitle = (e) => {
    setTitle(e);
  };

  return (
    <>
      <SubHeader submit={submitWrite} />
      <TextTitle
        placeholder="제목을 입력하시오"
        value={title}
        onChangeText={onChangeTitle}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          ref={richScroll}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              flex: 1,
            }}
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
              onHeightChange={() => {
                richScroll && richScroll?.current?.scrollToEnd();
              }}
            />
          </KeyboardAvoidingView>
        </ScrollView>
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

export default Write;
