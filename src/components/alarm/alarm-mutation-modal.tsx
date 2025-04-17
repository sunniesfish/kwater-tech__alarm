import { useAlarmDockStore } from "@/store/dock-store";
import ModalWrapper from "../common/modal-wrapper";
import AlarmMutation from "./alarm-mutation";
import { useShallow } from "zustand/react/shallow";

export default function AlarmMutationModal() {
  const { isAddMode, setIsAddMode } = useAlarmDockStore(
    useShallow((state) => ({
      isAddMode: state.isAddMode,
      setIsAddMode: state.setIsAddMode,
    }))
  );
  return (
    <ModalWrapper isOpen={isAddMode} setIsOpen={setIsAddMode}>
      <AlarmMutation />
    </ModalWrapper>
  );
}
