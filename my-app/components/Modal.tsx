import { Pressable, View } from "react-native";
import { useDispatch } from "react-redux";
import EmailSelect from "@/components/EmailSelect";
import modalSlice from "@/slices/modal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";

const Modal = () => {
  const dispatch = useDispatch();
  const Type = useSelector((state: RootState) => state.modal.ModalType);
  return (
    <>
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
          dispatch(modalSlice.actions.setModal(false));
        }}
      ></Pressable>
      {Type === "EmailList" ? <EmailSelect /> : ""}
    </>
  );
};

export default Modal;
