import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

// iOS Safari를 위한 Navigator 인터페이스 확장
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export function PwaInstallPrompt() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // 이미 설치되어 있는지 확인
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // 설치 프롬프트 표시
    await installPrompt.prompt();

    // 사용자의 선택 결과 처리
    const choiceResult = await installPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("사용자가 앱 설치를 수락했습니다.");
      setIsInstalled(true);
    } else {
      console.log("사용자가 앱 설치를 거부했습니다.");
    }

    // 프롬프트 참조 제거
    setInstallPrompt(null);
  };

  // 이미 설치되어 있거나 설치 가능한 상태가 아니면 렌더링하지 않음
  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-11/12 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center">
      <p className="text-center mb-3 font-medium">
        앱을 홈 화면에 설치하여 더 빠르게 이용해보세요!
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => setInstallPrompt(null)}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          나중에
        </button>
        <button
          onClick={handleInstallClick}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          설치하기
        </button>
      </div>
    </div>
  );
}
