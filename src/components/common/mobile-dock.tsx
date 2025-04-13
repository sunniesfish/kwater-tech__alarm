import { useDockStore } from "@/store/dock-store";
import { useNavStore, View } from "@/store/nav-store";

export default function MobileDock() {
  const { current } = useNavStore();
  const { isDeleteMode, setIsDeleteMode, isEditMode, setIsEditMode } =
    useDockStore();

  return (
    <ul>
      <li className={isDeleteMode ? "active" : ""}>
        <span onClick={() => setIsDeleteMode(true)}>삭제</span>
      </li>
      {current === View.Alarm && (
        <>
          <li className={isEditMode ? "active" : ""}>
            <span onClick={() => setIsEditMode(true)}>수정</span>
          </li>
        </>
      )}
      <li>
        <span>추가</span>
      </li>
    </ul>
  );
}
