import { useEffect, useState } from "react";

export enum DeviceType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

type DeviceTypeOption =
  | DeviceType.Desktop
  //   | DeviceType.Tablet
  | DeviceType.Mobile;

export const useDeviceType = (deviceTypeOption: DeviceTypeOption) => {
  const query = (() => {
    switch (deviceTypeOption) {
      case DeviceType.Desktop:
        return "(min-width: 768px)";
      //   case DeviceType.Tablet:
      //     return "(min-width: 640px) and (max-width: 1023px)";
      case DeviceType.Mobile:
        return "(max-width: 767px)";
      default:
        return "(max-width: 767px)";
    }
  })();
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    mediaQueryList.addEventListener("change", handleChange);

    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches);
    }
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [query, matches]);
  return matches;
};
