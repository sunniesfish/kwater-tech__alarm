import { Menu, LogIn } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDivisionStore } from "@/store/division-store";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export function HeaderMenu2() {
  const { currentDivision, setCurrentDivision, divisions, initialize } =
    useDivisionStore(
      useShallow((state) => ({
        currentDivision: state.currentDivision,
        setCurrentDivision: state.setCurrentDivision,
        divisions: state.divisions,
        initialize: state.initialize,
      }))
    );
  useEffect(() => {
    initialize();
    if (!currentDivision) {
      setCurrentDivision(divisions[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mr-4">
      <Select
        value={currentDivision?.divisionId}
        onValueChange={(value) =>
          setCurrentDivision(divisions.find((d) => d.divisionId === value)!)
        }
      >
        <SelectTrigger className="w-[30vw] max-w-60 overflow-hidden text-ellipsis whitespace-nowrap">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {divisions.map((division) => (
            <SelectItem
              key={division.divisionId}
              value={division.divisionId}
              className="w-[30vw] max-w-60 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {division.divisionName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface HeaderMenu3Props {
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onMenuClick?: () => void;
}

export function HeaderMenu3({
  isLoggedIn = false,
  onLoginClick,
  onMenuClick,
}: HeaderMenu3Props) {
  return (
    <div className="flex justify-end">
      {isLoggedIn ? (
        <button
          className="header-menu-button flex justify-center items-center h-4/5 w-4/5 rounded-sm"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      ) : (
        <button
          className="header-menu-button flex justify-center items-center gap-2 h-4/5 rounded-sm"
          onClick={onLoginClick}
        >
          <LogIn className="w-4 h-4" />
          <span className="text-xs">매니저</span>
        </button>
      )}
    </div>
  );
}
