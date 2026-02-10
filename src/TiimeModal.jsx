import { X, Clock, Check, Hourglass } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function TimeModal({ isOpen, onClose, onSave, initialTime, initialDuration }) {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedDuration, setSelectedDuration] = useState("30"); // 기본 30분

  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const durationRef = useRef(null);

  // 📐 [정밀 치수 설정]
  const CONTAINER_HEIGHT = 240;
  const BUTTON_HEIGHT = 50;
  const BUTTON_MARGIN = 0;

  // 모달 너비를 살짝 넓혀서 3단 컬럼을 수용 (340px -> 380px)
  const MODAL_WIDTH = "max-w-[380px]";

  const ITEM_SIZE = BUTTON_HEIGHT + BUTTON_MARGIN;

  // 🧮 [패딩 계산]
  const ORIGINAL_CENTER = (CONTAINER_HEIGHT - BUTTON_HEIGHT) / 2;
  const HALF_ITEM_OFFSET = ITEM_SIZE / 2;
  const PADDING_TOP = ORIGINAL_CENTER - HALF_ITEM_OFFSET;
  const PADDING_BOTTOM = ORIGINAL_CENTER;

  // 데이터 생성
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0"),
  );
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0"),
  );
  // 소요 시간: 5분 ~ 120분 (5분 단위)
  const durations = Array.from({ length: 24 }, (_, i) => String((i + 1) * 5));

  useEffect(() => {
    if (isOpen) {
      // 1. 시간 초기화
      let h = "12",
        m = "00";
      if (initialTime) {
        [h, m] = initialTime.split(":");
      } else {
        const now = new Date();
        h = String(now.getHours()).padStart(2, "0");
        const min = Math.round(now.getMinutes() / 5) * 5;
        m = String(min < 60 ? min : 55).padStart(2, "0");
      }
      setSelectedHour(h);
      setSelectedMinute(m);

      // 2. 소요 시간 초기화 (값이 없으면 기본 30분)
      const dur = initialDuration ? String(initialDuration) : "30";
      setSelectedDuration(dur);

      // 3. 자동 스크롤
      setTimeout(() => {
        scrollToCenter(hourRef, parseInt(h), "auto");
        scrollToCenter(minuteRef, parseInt(m) / 5, "auto");

        // Duration 인덱스 찾기 (5로 나누고 -1)
        const durIndex = parseInt(dur) / 5 - 1;
        scrollToCenter(durationRef, durIndex >= 0 ? durIndex : 5, "auto");
      }, 10);
    }
  }, [isOpen, initialTime, initialDuration]);

  const scrollToCenter = (ref, index, behavior = "smooth") => {
    if (ref.current) {
      ref.current.scrollTo({
        top: index * ITEM_SIZE,
        behavior: behavior,
      });
    }
  };

  const handleHourClick = (h) => {
    setSelectedHour(h);
    scrollToCenter(hourRef, parseInt(h));
  };

  const handleMinuteClick = (m, index) => {
    setSelectedMinute(m);
    scrollToCenter(minuteRef, index);
  };

  const handleDurationClick = (d, index) => {
    setSelectedDuration(d);
    scrollToCenter(durationRef, index);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300">
      <div
        className={`bg-white w-full ${MODAL_WIDTH} rounded-3xl p-6 shadow-2xl transform transition-all scale-100 ring-1 ring-gray-900/5`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-black text-white rounded-full">
              <Clock size={18} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              시간 및 기간 설정
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- [3단 선택기 컨테이너] --- */}
        <div className="flex gap-1 mb-8 h-[240px] relative">
          {/* ✨ 중앙 하이라이트 바 */}
          <div
            className="absolute left-0 right-0 bg-gray-100 rounded-xl pointer-events-none -z-10 top-1/2 -translate-y-1/2"
            style={{ height: `${BUTTON_HEIGHT}px` }}
          />

          {/* 1. [HOURS] */}
          <div className="flex-1 flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 text-center mb-2 tracking-tighter">
              HOURS
            </span>
            <div
              ref={hourRef}
              className="grow overflow-y-auto rounded-l-xl px-1 scrollbar-hide"
              style={{
                paddingTop: `${PADDING_TOP}px`,
                paddingBottom: `${PADDING_BOTTOM}px`,
              }}
            >
              {hours.map((h) => (
                <button
                  key={h}
                  onClick={() => handleHourClick(h)}
                  className={`w-full flex items-center justify-center rounded-xl text-lg font-bold transition-all leading-none
                    ${selectedHour === h ? "text-black scale-110" : "text-gray-300 hover:text-gray-500 scale-90"}`}
                  style={{ height: `${BUTTON_HEIGHT}px` }}
                >
                  <span className="pt-[2px]">{h}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 구분선 (:) */}
          <div className="flex flex-col justify-center w-4">
            <span className="text-xl font-black text-gray-300 text-center translate-y-[1px]">
              :
            </span>
          </div>

          {/* 2. [MINUTES] */}
          <div className="flex-1 flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 text-center mb-2 tracking-tighter">
              MINS
            </span>
            <div
              ref={minuteRef}
              className="grow overflow-y-auto px-1 scrollbar-hide"
              style={{
                paddingTop: `${PADDING_TOP}px`,
                paddingBottom: `${PADDING_BOTTOM}px`,
              }}
            >
              {minutes.map((m, index) => (
                <button
                  key={m}
                  onClick={() => handleMinuteClick(m, index)}
                  className={`w-full flex items-center justify-center rounded-xl text-lg font-bold transition-all leading-none
                    ${selectedMinute === m ? "text-black scale-110" : "text-gray-300 hover:text-gray-500 scale-90"}`}
                  style={{ height: `${BUTTON_HEIGHT}px` }}
                >
                  <span className="pt-[2px]">{m}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ✨ [구분선] 시각과 기간 사이의 세로선 */}
          <div className="flex flex-col justify-center items-center px-2">
            <div className="h-40 w-[1px] bg-gray-200"></div>
          </div>

          {/* 3. [DURATION] - 소요 시간 */}
          <div className="flex-1 flex flex-col">
            <span className="text-[10px] font-bold text-blue-400 text-center mb-2 tracking-tighter">
              DURATION
            </span>
            <div
              ref={durationRef}
              className="grow overflow-y-auto rounded-r-xl px-1 scrollbar-hide"
              style={{
                paddingTop: `${PADDING_TOP}px`,
                paddingBottom: `${PADDING_BOTTOM}px`,
              }}
            >
              {durations.map((d, index) => (
                <button
                  key={d}
                  onClick={() => handleDurationClick(d, index)}
                  className={`w-full flex items-center justify-center gap-1 rounded-xl text-lg font-bold transition-all leading-none
                    ${selectedDuration === d ? "text-blue-600 scale-110" : "text-gray-300 hover:text-gray-500 scale-90"}`}
                  style={{ height: `${BUTTON_HEIGHT}px` }}
                >
                  <span className="pt-[2px]">{d}</span>
                  <span className="text-xs font-medium pt-[4px]">min</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              onSave(`${selectedHour}:${selectedMinute}`, selectedDuration)
            }
            className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg flex justify-center items-center gap-2 hover:bg-gray-800 transition-transform active:scale-[0.98] shadow-lg shadow-gray-200"
          >
            <Check size={20} strokeWidth={3} />
            완료
          </button>

          {(initialTime || initialDuration) && (
            <button
              onClick={() => onSave("", "")}
              className="w-full py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-colors"
            >
              초기화
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeModal;
