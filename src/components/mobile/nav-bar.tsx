import { useNavStore, View } from "../../store/nav-store";

export default function NavBar() {
  console.log("NavBar");
  const { current, setView } = useNavStore();
  return (
    <nav className="w-full max-h-[60px] h-10 flex justify-center items-center bg-card">
      <ul className="w-full flex justify-evenly items-center">
        <li
          onClick={() => setView(View.Music)}
          className={`text-card-foreground hover:text-primary ${
            current === View.Music ? "text-primary" : ""
          } cursor-pointer`}
        >
          알람음
        </li>
        <li
          onClick={() => setView(View.Alarm)}
          className={`text-card-foreground hover:text-primary ${
            current === View.Alarm ? "text-primary" : ""
          } cursor-pointer`}
        >
          알람
        </li>
      </ul>
    </nav>
  );
}
