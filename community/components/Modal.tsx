import { Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import statusSlice from "@/slices/status";
import Menu from "./Menu";
import { RootState } from "@/store/reducer";

const Modal = () => {
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.status.modalType);
  return (
    <>
      <Pressable
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 100,
          backgroundColor: "#000",
          opacity: 0.5,
        }}
        onPress={() => {
          dispatch(statusSlice.actions.setModal(false));
        }}
      ></Pressable>
    </>
  );
};

export default Modal;
