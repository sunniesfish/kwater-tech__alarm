import { useState } from "react";
import { useAlarmStore } from "./store/alarm-store";
import "./App.css";

function App() {
  const { alarms, addAlarm, removeAlarm, toggleAlarm } = useAlarmStore();
  const [newAlarmTime, setNewAlarmTime] = useState("08:00");
  const [newAlarmTitle, setNewAlarmTitle] = useState("알람");

  const handleAddAlarm = () => {
    addAlarm({
      time: newAlarmTime,
      title: newAlarmTitle,
      isActive: true,
      days: [1, 2, 3, 4, 5], // 기본적으로 평일에 알람 설정
    });
    setNewAlarmTitle("알람");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">KWater 알람</h1>
          <p>수질 관리 알람 시스템</p>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="time"
              value={newAlarmTime}
              onChange={(e) => setNewAlarmTime(e.target.value)}
              className="border rounded p-2 flex-1"
            />
            <input
              type="text"
              value={newAlarmTitle}
              onChange={(e) => setNewAlarmTitle(e.target.value)}
              placeholder="알람 제목"
              className="border rounded p-2 flex-1"
            />
            <button
              onClick={handleAddAlarm}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              추가
            </button>
          </div>

          <div className="space-y-2">
            {alarms.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                등록된 알람이 없습니다
              </p>
            ) : (
              alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className="flex items-center justify-between border rounded p-3"
                >
                  <div>
                    <div className="font-semibold">{alarm.time}</div>
                    <div className="text-sm text-gray-600">{alarm.title}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleAlarm(alarm.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        alarm.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {alarm.isActive ? "켜짐" : "꺼짐"}
                    </button>
                    <button
                      onClick={() => removeAlarm(alarm.id)}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
