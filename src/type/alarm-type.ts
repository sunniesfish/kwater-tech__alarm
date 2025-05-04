export type AlarmMetadata = {
  id: string;
  day: Day[];
  hour: number;
  minute: number;
  lastTriggered: number | undefined;
  isActive: boolean;
  repeat: number;
};

export type Alarm = AlarmMetadata & {
  title: string;
  musicId: string;
};

export enum Day {
  SUNDAY = "일",
  MONDAY = "월",
  TUESDAY = "화",
  WEDNESDAY = "수",
  THURSDAY = "목",
  FRIDAY = "금",
  SATURDAY = "토",
}

// Worker 관련 타입 정의
export interface AlarmMessage {
  type: AlarmMessageType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

export enum AlarmMessageType {
  SET_ALARM = "setAlarm",
  TRIGGER_ALARM = "triggerAlarm",
}

export type SetAlarm = {
  type: AlarmMessageType.SET_ALARM;
  payload: {
    alarmRecord: Record<string, Alarm>;
  };
};

export type TriggerAlarm = {
  type: AlarmMessageType.TRIGGER_ALARM;
  payload: {
    alarmId: string;
  };
};
