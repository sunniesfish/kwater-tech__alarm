import { useNavStore, View } from "../../store/nav-store";

export default function NavBar() {
  const { current, setView } = useNavStore();
  return (
    <nav className="w-full flex  justify-center items-center">
      <ul className="w-full flex justify-evenly items-center">
        <li
          onClick={() => setView(View.Music)}
          className={`${current === View.Music ? "active" : ""}`}
        >
          알람음
        </li>
        <li
          onClick={() => setView(View.Alarm)}
          className={`${current === View.Alarm ? "active" : ""}`}
        >
          알람
        </li>
      </ul>
    </nav>
  );
}
