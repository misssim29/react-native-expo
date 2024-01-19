import { View, Text, Pressable, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import styled from "styled-components";
import { Image } from "expo-image";

const CameraPrebuild = () => {
  const [ImageSelect, setImageSelect] = useState([]);
  const pickImageAsync = async () => {
    await ImagePicker.openPicker({
      multiple: true,
      loadingLabelText: "사진 선택중...",
      compressImageQuality: 1,
    }).then(async (images) => {
      const result = [];
      for await (const image of images) {
        const img = await ImagePicker.openCropper({
          mediaType: "photo",
          path: image.path,
          freeStyleCropEnabled: true,
          includeBase64: true,
        });
        console.log(img);
        result.push(img);
      }
      setImageSelect(result);
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
    }).then((image) => {
      setImageSelect([image]);
    });
  };
  return (
    <Flex>
      <Flex>
        {ImageSelect.map((item, index) => (
          <Image
            key={index}
            source={{
              uri: `data:${item.mime};base64,${item.data}`,
            }}
            contentFit="contain"
            style={{ flex: 1 }}
          />
        ))}
      </Flex>
      <Btns>
        <Pressable onPress={pickImageAsync}>
          <AntDesign name="picture" size={50} color="black" />
        </Pressable>
        <Pressable onPress={pickCameraAsync}>
          <AntDesign name="camerao" size={50} color="black" />
        </Pressable>
      </Btns>
    </Flex>
  );
};

const Flex = styled(View)`
  flex: 1;
`;
const Btns = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  border-top-width: 0.5px;
  border-top-color: #000;
  padding: 30px 5%;
`;

export default CameraPrebuild;
