import { Button } from "../ui/button";
import { useAlarmDockStore } from "@/store/dock-store";
import { useShallow } from "zustand/react/shallow";

export default function AlarmMutationRow() {
  const { setIsDeleteMode, isDeleteMode } = useAlarmDockStore(
    useShallow((state) => ({
      setIsDeleteMode: state.setIsDeleteMode,
      isDeleteMode: state.isDeleteMode,
    }))
  );
  return (
    <div className="flex justify-end items-center  border border-red-500">
      <Button variant="outline" onClick={() => setIsDeleteMode(!isDeleteMode)}>
        {isDeleteMode ? "완료" : "삭제"}
      </Button>
    </div>
  );
}
