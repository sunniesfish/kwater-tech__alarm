import { HeaderMenu2, HeaderMenu3 } from "./main-header-menu";
import { useState } from "react";

export default function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <header className="mx-3 mt-2 bg-card text-card-foreground flex justify-between items-center">
      <img src="/logo.png" alt="logo" className="w-24 m-1" />
      <HeaderMenu2 />
      <HeaderMenu3
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}
