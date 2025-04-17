import {
  AlarmMessage,
  SetAlarm,
  AlarmMessageType,
  TriggerAlarm,
  Day,
  Alarm,
} from "../type/alarm-type";

class AlarmWorker {
  private alarmList: Alarm[] = [];
  private readonly TICK_INTERVAL = 1000;
  private tickInterval: number | undefined;
  private lastCheckTime: number = Date.now();
  private DAY = [
    Day.SUNDAY,
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
    Day.SATURDAY,
  ];
  constructor() {
    self.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(event: MessageEvent<AlarmMessage>) {
    console.log("handleMessage", event);
    const { type, payload } = event.data;
    switch (type) {
      case AlarmMessageType.SET_ALARM:
        console.log("SET_ALARM", payload);
        this.setAlarmList({ alarmList: payload });
        break;
    }
  }

  private setAlarmList({ alarmList }: SetAlarm["payload"]) {
    console.log("setAlarmList", alarmList);
    if (alarmList?.length > 0) {
      this.alarmList = [...alarmList];
      this.startTick();
    } else {
      this.alarmList = [];
      this.stopTick();
    }
  }

  private startTick(): void {
    if (this.tickInterval === undefined) {
      this.lastCheckTime = Date.now();
      this.tickInterval = setInterval(
        this.checkAlarms.bind(this),
        this.TICK_INTERVAL
      );
    }
  }

  private stopTick(): void {
    if (this.tickInterval !== undefined) {
      clearInterval(this.tickInterval);
      this.tickInterval = undefined;
    }
  }

  private checkTimeElapsed(): void {
    const now = Date.now();
    const expectedNextCheck = this.lastCheckTime + this.TICK_INTERVAL;
    const delay = now - expectedNextCheck;

    if (delay > 100) {
      console.warn(`[AlarmWorker] Alarm check delayed by ${delay}ms`);
    }

    if (delay > 1000) {
      this.stopTick();
      this.startTick();
    }

    this.lastCheckTime = now;
  }

  private shouldTriggerAlarm(alarm: Alarm): boolean {
    const now = new Date();
    if (!alarm.day.includes(this.DAY[now.getDay()])) {
      return false;
    }

    const [alarmHour, alarmMinute] = [alarm.hour, alarm.minute];
    const [nowHour, nowMinute] = [now.getHours(), now.getMinutes()];

    if (alarmHour !== nowHour) {
      return false;
    }

    if (alarmMinute !== nowMinute) {
      return false;
    }

    if (alarm.repeat) {
      if (
        alarm.lastTriggered &&
        alarm.lastTriggered + this.TICK_INTERVAL * 60 > Date.now()
      ) {
        return false;
      }
    }

    return true;
  }

  private checkAlarms(): void {
    // console.log("checkAlarms");
    // this.checkTimeElapsed();
    // this.alarmList.forEach((alarm) => {
    //   if (this.shouldTriggerAlarm(alarm)) {
    //     this.triggerAlarm(alarm);
    //   }
    // });
  }

  private triggerAlarm(alarm: Alarm): void {
    console.log(`[AlarmWorker] Triggering alarm: ${alarm.id}`);

    self.postMessage({
      type: AlarmMessageType.TRIGGER_ALARM,
      payload: {
        alarmId: alarm.id,
      },
    } as TriggerAlarm);
  }
}

new AlarmWorker();
