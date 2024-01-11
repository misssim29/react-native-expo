import { Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import userSlice from "@/slices/user";
const Modal = () => {
  const dispatch = useDispatch();

  return (
    <Pressable
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        backgroundColor: "#000",
        opacity: 0.5,
      }}
      onPress={() => {
        dispatch(userSlice.actions.setModal(false));
      }}
    ></Pressable>
  );
};

export default Modal;
