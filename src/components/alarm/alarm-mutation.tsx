import { Label } from "@radix-ui/react-label";
import { CardContent } from "../ui/card";
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
  const musicList = useMusicStore((state) => state.musicList);
  const { createAlarm } = useAlarm();
  const setIsAddMode = useAlarmDockStore((state) => state.setIsAddMode);

  const { control, handleSubmit, reset } = useForm<AlarmFormValues>({
    defaultValues: {
      title: "",
      day: currentTime.day,
      hour: currentTime.hour,
      minute: currentTime.minute,
      musicId: "default",
    },
  });

  const onSubmit = (data: AlarmFormValues) => {
    const now = new Date();
    const alarm = {
      id: `${data.day.join("")}${data.hour}${data.minute}` + now.toISOString(),
      title: data.title.length > 0 ? data.title : "알림",
      day: data.day?.length > 0 ? data.day : currentTime.day,
      hour: parseInt(data.hour, 10),
      minute: parseInt(data.minute, 10),
      musicId: data.musicId,
      lastTriggered: undefined,
      isActive: true,
    };
    createAlarm(alarm);
    setIsAddMode(false);
    reset();
  };

  return (
    <>
      <CardContent className="h-full overflow-x-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full w-full space-y-4 flex flex-col justify-evenly"
        >
          <div className="space-y-2 w-full">
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
                  className="bg-input text-foreground w-full min-w-0"
                  {...field}
                />
              )}
            />
          </div>
          <div className="space-y-3 w-full">
            <Label htmlFor="day" className="text-card-foreground font-medium">
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
                  className="flex w-full justify-between overflow-x-auto"
                >
                  {Object.values(Day).map((day) => (
                    <ToggleGroupItem
                      key={day}
                      value={day}
                      variant="outline"
                      className="min-w-[40px] h-10 rounded-md data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm data-[state=on]:border-primary border border-input hover:bg-accent hover:text-accent-foreground text-card-foreground transition-colors m-0.5"
                    >
                      {day}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />
          </div>
          {/* <div className="flex items-center gap-2 space-y-0 w-full">
            <Label htmlFor="repeat" className="text-card-foreground">
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
          </div> */}
          <div className="space-y-2 w-full">
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
                    className="bg-input text-foreground w-full"
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
          <div className="space-y-2 w-full">
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
                    className="bg-input text-foreground w-full"
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
          <div className="space-y-2 w-full">
            <Label htmlFor="music-select" className="text-card-foreground">
              음악
            </Label>
            <Controller
              name="musicId"
              control={control}
              render={({ field }) => (
                <div className="space-y-3 max-h-40 overflow-y-auto p-2 border rounded-md bg-input no-scrollbar w-full">
                  <div className="flex items-center space-x-2 border-b border-input-info">
                    <Checkbox
                      id="music-default"
                      aria-label="alarm-checkbox"
                      className="border-input-primary data-[state=unchecked]:border-1 data-[state=unchecked]:border-input-border-primary"
                      checked={field.value === "default"}
                      onCheckedChange={() => field.onChange("default")}
                    />
                    <Label
                      htmlFor="music-default"
                      className="cursor-pointer flex-1 py-1 font-medium"
                    >
                      기본 알람음
                    </Label>
                  </div>
                  {musicList.length > 0 ? (
                    musicList.map((music) => (
                      <div
                        key={`music-${music.id}`}
                        className="flex items-center space-x-2 border-b border-input-info"
                      >
                        <Checkbox
                          id={`music-checkbox-${music.id}`}
                          className="border-input-primary data-[state=unchecked]:border-1 data-[state=unchecked]:border-input-border-primary"
                          aria-label="alarm-checkbox"
                          checked={field.value === music.id}
                          onCheckedChange={() => field.onChange(music.id)}
                        />
                        <Label
                          htmlFor={`music-checkbox-${music.id}`}
                          className="cursor-pointer flex-1 py-1 truncate"
                        >
                          {music.name}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground py-2 text-center">
                      음악 없음
                    </div>
                  )}
                </div>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            추가
          </Button>
        </form>
      </CardContent>
    </>
  );
}
