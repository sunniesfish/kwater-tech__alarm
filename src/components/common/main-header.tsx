import { HeaderMenu2, HeaderMenu3 } from "./main-header-menu";
import { useState } from "react";

export default function MainHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // TODO: 실제 로그인 로직 구현
    setIsLoggedIn(true);
  };

  const handleMenu = () => {
    // TODO: 메뉴 열기 로직 구현
    console.log("메뉴 열기");
  };

  return (
    <header className="bg-card text-card-foreground flex justify-between items-center">
      <img src="/logo.png" alt="logo" className="w-24 m-1 ml-3" />
      <HeaderMenu2 />
      <HeaderMenu3
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLogin}
        onMenuClick={handleMenu}
      />
    </header>
  );
}
