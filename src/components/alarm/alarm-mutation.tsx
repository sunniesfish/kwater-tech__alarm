import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useEffect } from "react";
import { Day } from "@/type/alarm-type";
import { Checkbox } from "../ui/checkbox";
import { useMusicStore } from "@/store/music-store";
import { useAlarm } from "@/lib/use-alarm";

export default function AlarmMutation() {
  const getCurrentTimeAndDay = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const dayIndex = now.getDay();

    let currentDay: Day;
    switch (dayIndex) {
      case 0:
        currentDay = Day.SUNDAY;
        break;
      case 1:
        currentDay = Day.MONDAY;
        break;
      case 2:
        currentDay = Day.TUESDAY;
        break;
      case 3:
        currentDay = Day.WEDNESDAY;
        break;
      case 4:
        currentDay = Day.THURSDAY;
        break;
      case 5:
        currentDay = Day.FRIDAY;
        break;
      case 6:
        currentDay = Day.SATURDAY;
        break;
      default:
        currentDay = Day.MONDAY;
    }

    return {
      hour: currentHour,
      minute: currentMinute,
      day: [currentDay],
    };
  };

  const currentTime = getCurrentTimeAndDay();

  const [day, setDay] = useState<Day[]>(currentTime.day);
  const [hour, setHour] = useState<number>(currentTime.hour);
  const [minute, setMinute] = useState<number>(currentTime.minute);
  const [title, setTitle] = useState<string>("");
  const [repeat, setRepeat] = useState<boolean>(false);
  const [musicId, setMusicId] = useState<string>("1");
  const { musicList } = useMusicStore();
  const { createAlarm } = useAlarm();

  useEffect(() => {
    if (musicList.length > 0 && musicId === "1") {
      setMusicId(musicList[0].id);
    }
  }, [musicList, musicId]);

  const handleDayChange = (value: string[]) => {
    setDay(value as Day[]);
  };

  const handleHourChange = (value: string) => {
    setHour(parseInt(value, 10));
  };

  const handleMinuteChange = (value: string) => {
    setMinute(parseInt(value, 10));
  };

  const handleRepeatChange = () => {
    setRepeat((prev) => !prev);
  };

  const handleMusicChange = (value: string) => {
    if (value === "no-music") {
      // 기본 음악
    } else {
      setMusicId(value);
    }
  };

  const handleSubmit = () => {
    const now = new Date();
    const alarm = {
      id: `${day.join("")}${hour}${minute}` + now.toISOString(),
      title,
      day,
      hour,
      minute,
      musicId,
      repeat,
    };
    createAlarm(alarm);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>알림 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="day">요일</Label>
            <ToggleGroup
              type="multiple"
              id="day"
              onValueChange={(value) => handleDayChange(value)}
            >
              {Object.values(Day).map((day) => (
                <ToggleGroupItem key={day} value={day}>
                  {day}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div>
            <Label htmlFor="repeat">반복</Label>
            <Checkbox
              id="repeat"
              checked={repeat}
              onCheckedChange={handleRepeatChange}
            />
          </div>
          <div>
            <Label htmlFor="hour-select">시간</Label>
            <Select value={hour.toString()} onValueChange={handleHourChange}>
              <SelectTrigger id="hour-select">
                <SelectValue placeholder="시간" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="minute-select">분</Label>
            <Select
              value={minute.toString()}
              onValueChange={handleMinuteChange}
            >
              <SelectTrigger id="minute-select">
                <SelectValue placeholder="분" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="music-select">음악</Label>
            <Select
              value={musicList.length > 0 ? musicId : "no-music"}
              onValueChange={handleMusicChange}
            >
              <SelectTrigger id="music-select">
                <SelectValue placeholder="음악" />
              </SelectTrigger>
              <SelectContent>
                {musicList.length > 0 ? (
                  musicList.map((music) => (
                    <SelectItem key={music.id} value={music.id}>
                      {music.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-music">음악 없음</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </form>
        <Button onClick={handleSubmit}>추가</Button>
      </CardContent>
    </Card>
  );
}
