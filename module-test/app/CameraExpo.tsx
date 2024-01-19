import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useState } from "react";
import { Image } from "expo-image";
import { Camera, CameraType } from "expo-camera";

const CameraApp = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    requestPermission();
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{}} onPress={toggleCameraType}>
            <Text style={{}}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const CameraComponent = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [showCamara, setShowCamera] = useState(false);
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
    if (status !== "granted") {
      requestPermission();
      return false;
    }

    let Imgresult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: false,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    });

    if (!Imgresult.canceled) {
      setSelectedImage(Imgresult.assets);
    } else {
      alert("이미지를 선택해주세요.");
    }
  };

  const toggleCameraType = () => {
    setShowCamera(true);
  };

  return (
    <Flex>
      <Flex>
        {selectedImage.map((item, index) => (
          <Image
            key={index}
            source={{
              uri: item.uri,
            }}
            contentFit="contain"
            style={{ flex: 1 }}
          />
        ))}
        {showCamara ? <CameraApp /> : ""}
      </Flex>
      <Btns>
        <Pressable onPress={pickImageAsync}>
          <AntDesign name="picture" size={50} color="black" />
        </Pressable>
        <Pressable onPress={toggleCameraType}>
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

export default CameraComponent;
