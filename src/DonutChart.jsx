function DonutChart({ percent, color = "text-blue-400" }) {
  // [수학 공식 파트]
  const radius = 40; // 1. 반지름 설정 (크기 결정)
  const circumference = 2 * Math.PI * radius; // 2. 원의 둘레 공식 (2πr)

  // 3. 보여줄 길이 계산
  // 전체 둘레에서 (퍼센트만큼의 길이)를 뺀 나머지 공간을 계산합니다.
  // 이 '남은 공간'만큼 그래프를 뒤로 밀어버리는 원리입니다.
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-[75px] h-[75px] flex items-center justify-center">
      {/* viewBox="0 0 100 100": 
         가로 100, 세로 100이라는 가상의 모눈종이를 만듭니다.
         transform -rotate-90:
         SVG 원은 원래 3시 방향(오른쪽)부터 그려집니다. 
         이걸 12시 방향(위쪽)부터 시작하게 하려고 90도 반시계로 돌립니다.
      */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* [배경 원]: 회색 트랙 (항상 100% 그려져 있음) */}
        <circle
          cx="50"
          cy="50" // 중심점 (50, 50)
          r={radius} // 반지름 (40)
          fill="transparent" // 안쪽 색 채우기 없음 (도넛 모양)
          stroke="#e5e7eb" // 테두리 색 (Tailwind gray-200)
          strokeWidth="10" // 테두리 두께
        />

        {/* [진행 원]: 파란색 그래프 (퍼센트만큼만 그려짐) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          className={color} // Tailwind 색상 적용 (예: text-blue-500)
          stroke="currentColor" // 현재 텍스트 색상(className)을 따라감
          strokeWidth="10"
          /* 여기가 핵심 마법! */
          strokeDasharray={circumference} // 점선 하나 길이를 원 전체 둘레로 잡음
          strokeDashoffset={offset} // 계산된 만큼 뒤로 당겨서 숨김
          strokeLinecap="round" // 선의 끝부분을 둥글게 처리
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }} // 애니메이션
        />
      </svg>

      {/* 중앙 텍스트 (absolute로 띄워서 가운데 배치) */}
      <span className="absolute translate-y-[1px] text-sm font-bold text-gray-700 ">
        {Math.round(percent) || 0}%
      </span>
    </div>
  );
}

export default DonutChart;
