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
import { useEffect } from "react";
import { Day } from "@/type/alarm-type";
import { Checkbox } from "../ui/checkbox";
import { useMusicStore } from "@/store/music-store";
import { useAlarm } from "@/lib/use-alarm";
import { useForm, Controller } from "react-hook-form";
import { useAlarmDockStore } from "@/store/dock-store";
interface AlarmFormValues {
  title: string;
  day: Day[];
  hour: string;
  minute: string;
  repeat: boolean;
  musicId: string;
}

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
      hour: currentHour.toString(),
      minute: currentMinute.toString(),
      day: [currentDay],
    };
  };

  const currentTime = getCurrentTimeAndDay();
  const { musicList } = useMusicStore();
  const { createAlarm } = useAlarm();
  const { setIsAddMode } = useAlarmDockStore();

  const { control, handleSubmit, setValue, watch } = useForm<AlarmFormValues>({
    defaultValues: {
      title: "",
      day: currentTime.day,
      hour: currentTime.hour,
      minute: currentTime.minute,
      repeat: false,
      musicId: "no-music",
    },
  });

  const watchMusicId = watch("musicId");

  useEffect(() => {
    if (musicList.length > 0 && watchMusicId === "no-music") {
      setValue("musicId", musicList[0].id);
    }
  }, [musicList, watchMusicId, setValue]);

  const onSubmit = (data: AlarmFormValues) => {
    const now = new Date();
    const alarm = {
      id: `${data.day.join("")}${data.hour}${data.minute}` + now.toISOString(),
      title: data.title.length > 0 ? data.title : "알림",
      day: data.day,
      hour: parseInt(data.hour, 10),
      minute: parseInt(data.minute, 10),
      musicId: data.musicId,
      repeat: data.repeat,
    };
    console.log("alarm", alarm);
    createAlarm(alarm);
    setIsAddMode(false);
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">알림 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-card-foreground">
              제목
            </Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="title"
                  className="bg-input text-foreground"
                  {...field}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="day" className="text-card-foreground">
              요일
            </Label>
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                <ToggleGroup
                  type="multiple"
                  id="day"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value as Day[])}
                  className="flex flex-wrap gap-2"
                >
                  {Object.values(Day).map((day) => (
                    <ToggleGroupItem
                      key={day}
                      value={day}
                      variant="outline"
                      className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:font-bold border-2 text-card-foreground"
                    >
                      {day}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
          </div>
          <div className="flex items-center gap-2 space-y-0">
            <Label htmlFor="repeat" className="flex-grow text-card-foreground">
              반복
            </Label>
            <Controller
              name="repeat"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="repeat"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hour-select" className="text-card-foreground">
              시간
            </Label>
            <Controller
              name="hour"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="hour-select"
                    className="bg-input text-foreground"
                  >
                    <SelectValue placeholder="시간" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minute-select" className="text-card-foreground">
              분
            </Label>
            <Controller
              name="minute"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="minute-select"
                    className="bg-input text-foreground"
                  >
                    <SelectValue placeholder="분" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 60 }, (_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="music-select" className="text-card-foreground">
              음악
            </Label>
            <Controller
              name="musicId"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="music-select"
                    className="bg-input text-foreground"
                  >
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
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            추가
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
