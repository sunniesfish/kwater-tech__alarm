import { useAlarmDockStore, useMusicDockStore } from "@/store/dock-store";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useNavStore, View } from "@/store/nav-store";
export default function MobileDock() {
  const {
    isDeleteMode: isAlarmDeleteMode,
    setIsDeleteMode: setIsAlarmDeleteMode,
    isAddMode: isAlarmAddMode,
    setIsAddMode: setIsAlarmAddMode,
  } = useAlarmDockStore();
  const {
    isDeleteMode: isMusicDeleteMode,
    setIsDeleteMode: setIsMusicDeleteMode,
  } = useMusicDockStore();
  const { current } = useNavStore();
  const [isDelBtnActive, setIsDelBtnActive] = useState(false);
  const [isAddBtnActive, setIsAddBtnActive] = useState(false);

  const handleDelBtnClick = () => {
    if (current === View.Alarm) {
      setIsAlarmDeleteMode(!isAlarmDeleteMode);
    } else if (current === View.Music) {
      setIsMusicDeleteMode(!isMusicDeleteMode);
    }
    setIsDelBtnActive(!isDelBtnActive);
  };

  const handleAddBtnClick = () => {
    if (current === View.Alarm) {
      setIsAlarmAddMode(!isAlarmAddMode);
      setIsAddBtnActive(!isAddBtnActive);
    }
  };

  useEffect(() => {
    if (current === View.Alarm) {
      setIsAlarmDeleteMode(false);
      setIsAlarmAddMode(false);
    } else if (current === View.Music) {
      setIsMusicDeleteMode(false);
    }
    setIsDelBtnActive(false);
    setIsAddBtnActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <ul className="w-full flex justify-evenly items-center max-h-[80px] h-12 bg-card">
      <li>
        <Button
          variant={isDelBtnActive ? "destructive" : "outline"}
          onClick={handleDelBtnClick}
        >
          삭제
        </Button>
      </li>
      <li>
        <Button
          variant={isAddBtnActive ? "default" : "outline"}
          onClick={handleAddBtnClick}
        >
          추가
        </Button>
      </li>
    </ul>
  );
}
