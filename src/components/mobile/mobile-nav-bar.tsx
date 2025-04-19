import { useNavStore, View } from "../../store/nav-store";

export default function NavBar() {
  const { current, setView } = useNavStore();
  return (
    <nav className="w-full max-h-[60px] mt-2 h-10 flex justify-center items-center bg-card">
      <ul className="w-full h-full min-h-0 grid grid-cols-[1fr_1fr] justify-items-center">
        <li
          onClick={() => setView(View.Music)}
          className={`text-card-foreground ${
            current === View.Music ? " bg-muted" : ""
          } cursor-pointer w-11/12 h-full rounded-xl ml-1 flex  justify-center items-center `}
        >
          알람음
        </li>
        <li
          onClick={() => setView(View.Alarm)}
          className={`text-card-foreground ${
            current === View.Alarm ? " bg-muted" : ""
          } cursor-pointer w-11/12 h-full rounded-xl mr-1 flex justify-center items-center`}
        >
          알람
        </li>
      </ul>
    </nav>
  );
}
