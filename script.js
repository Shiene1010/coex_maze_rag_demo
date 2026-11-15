const SCENARIOS = {
  concierge: {
    arrival: "08:53",
    statusText: "7분 전 여유",
    isSuccess: true,
    score: "+1,050점",
    fillWidth: "100%",
    summary: "📏 총 16그리드 (80m) · 실내 연속성 100%",
    turns: [
      {
        nodeId: "N_B1_14_12 (시선각 210° ➔ 30°)",
        alias: '별칭: "높은 책장 끝나는 스벅 모서리"',
        stepIndex: 1,
        userMsg: "어, 걷다 보니 별마당 도서관이네. 9시까지 웨스틴 가야 하는데 스벅 앞 6번 사인이야.",
        aiMsg: `<strong>해일님, 안심하세요! 8시 48분이라 여유 있습니다.</strong><br>
                1. <strong>방향 교정 & 트리 우회:</strong> 눈앞의 스타벅스를 등지고 180도 뒤로 도세요. 중앙 대형 트리 인파를 피해 <strong>왼쪽 벽면 상가 라인</strong>으로 돌아나가면 천장 낮은 파르나스몰 복도가 나옵니다.`,
        tip: "먼저 나오는 '그랜드 인터컨티넨탈 파르나스'는 다른 호텔입니다! 멈추지 말고 몰 막다른 끝까지 직진하셔야 '웨스틴 파르나스'가 나옵니다.",
        logs: `[08:48:01] MATCH N_B1_14_12 (conf: 0.98)
[08:48:02] BLOCK EDGE_VERTICAL (-300)
[08:48:02] BLOCK EDGE_OUTDOOR (-500)
[08:48:03] PATCH 트리 우회 경로 (+50)`
      },
      {
        nodeId: "N_B1_22_12 (파르나스몰 서측 진입부)",
        alias: '별칭: "천장 낮은 파르나스몰 직진 복도"',
        stepIndex: 2,
        userMsg: "왼쪽 벽면으로 돌아서 천장 낮은 몰 진입했어! 오른쪽에 그랜드 인터컨티넨탈 표지판 보이는데 그냥 지나쳐?",
        aiMsg: `<strong>네, 절대 멈추지 말고 그대로 직진하세요!</strong><br>
                그랜드 인터컨티넨탈 연결통로를 지나 40m만 더 걸어가시면 막다른 끝에 <strong>웨스틴 서울 파르나스 전용 에스컬레이터</strong>가 나타납니다.`,
        tip: "중간 에스컬레이터로 1층에 올라가면 야외로 나가야 하므로 반드시 지하 1층 끝단까지 직진하세요.",
        logs: `[08:50:12] VERIFY N_B1_22_12 (B1 Flat)
[08:50:13] WARN_TRAP 그랜드 파르나스 회피 (+200)
[08:50:14] KEEP_FLOOR B1 유지 중 (연속성 100%)`
      },
      {
        nodeId: "N_1F_30_12 (웨스틴 파르나스 1F 로비)",
        alias: '별칭: "웨스틴 수속 데스크 앞"',
        stepIndex: 3,
        userMsg: "와, 딱 말한 대로 전용 에스컬레이터 타고 올라오니 바로 웨스틴 로비네! 8시 53분 도착 완료!",
        aiMsg: `<strong>도착을 축하합니다, 해일님! (08:53 도착 · 마감 7분 전)</strong><br>
                무수직·무실외 B1 골든 패스 완주에 성공하셨습니다. 오늘 검증된 <strong>트리 좌측 벽면 우회 경로</strong>는 실시간 지식 DB에 즉시 반영되었습니다.`,
        tip: "시연 완료! 좌측 하단의 다른 조언자(청소부, 현관 수위, 급한 행인)를 클릭하면 실패 멀티버스와 비교할 수 있습니다.",
        logs: `[08:53:00] CHOSEN B1_FLAT_PATH (+1,050)
[08:53:00] GOAL N_1F_30_12 ARRIVED ✓
[08:53:01] DB_SYNC 트리 우회 후기 반영 완료`
      }
    ]
  },
  cleaner: {
    arrival: "09:03",
    statusText: "3분 지각 (실패)",
    isSuccess: false,
    score: "-300점",
    fillWidth: "35%",
    summary: "⚠️ 중간 1F 상승으로 단절 벽면 조우 (재하강 발생)",
    turns: [
      {
        nodeId: "N_1F_18_10 (코엑스 1층 단절 홀)",
        alias: '별칭: "1층 유리벽 앞 막다른 로비"',
        stepIndex: 1,
        userMsg: "청소부 말 듣고 중간 에스컬레이터로 1층 올라왔는데, 웨스틴으로 가는 길이 벽으로 막혀 있잖아!",
        aiMsg: `<strong>[수직 편향 오류 발생]</strong><br>
                코엑스와 파르나스 타워는 1층에서 실내로 연결되지 않습니다. 다시 B1으로 내려가야 해서 <strong>8분이 지연</strong>되었습니다.`,
        tip: "이 실패 로그(Universe 01)는 DPO Negative Sample로 학습되어 이후 경로에서 중간 상승이 영구 차단되었습니다.",
        logs: `[08:51:10] ERR_EDGE_VERTICAL (-300)
[08:54:00] DEAD_END 1F 단절 벽면 감지
[09:03:00] GOAL ARRIVED (LATE +3m)`
      }
    ]
  },
  guard: {
    arrival: "09:06",
    statusText: "6분 지각 (실패)",
    isSuccess: false,
    score: "-500점",
    fillWidth: "20%",
    summary: "⚠️ 삼성역 6번 출구 야외 이탈 + 그랜드 파르나스 오인",
    turns: [
      {
        nodeId: "N_OUT_24_05 (영동대로 야외 보도)",
        alias: '별칭: "그랜드 인터컨티넨탈 정문 앞"',
        stepIndex: 1,
        userMsg: "6번 출구로 나와서 뛰었는데 여기 로비 직원이 여긴 그랜드 인터컨티넨탈이고 웨스틴은 더 가야 한대!",
        aiMsg: `<strong>[실외 이탈 및 건물 오인 오류]</strong><br>
                삼성역 6번 출구는 그랜드 인터컨티넨탈과 가깝고 웨스틴 파르나스와는 거리가 멉니다. 신호 대기 및 야외 우회로 <strong>6분 지각</strong>했습니다.`,
        tip: "이 실패 로그(Universe 02)가 전이 학습되어 '파르나스 2개 건물군 족집게 경고'가 탄생했습니다.",
        logs: `[08:50:00] ERR_EDGE_OUTDOOR (-500)
[08:58:20] TRAP_HIT 그랜드 파르나스 오인
[09:06:00] GOAL ARRIVED (LATE +6m)`
      }
    ]
  },
  runner: {
    arrival: "09:12",
    statusText: "12분 지각 (실패)",
    isSuccess: false,
    score: "-750점",
    fillWidth: "10%",
    summary: "⚠️ 일반 LLM 환각 안내로 중앙 트리 인파 고립",
    turns: [
      {
        nodeId: "N_B1_15_14 (별마당 중앙 트리 인파)",
        alias: '별칭: "사진 촬영 병목 구역"',
        stepIndex: 1,
        userMsg: "일단 앞으로 직진하래서 갔더니 초대형 트리 앞에서 사람들에게 갇혀서 오도 가도 못 하고 있어!",
        aiMsg: `<strong>[실시간 이벤트 미반영 오류]</strong><br>
                정적 지도 데이터만 학습한 일반 LLM은 오늘 설치된 초대형 트리와 인파 병목을 인지하지 못합니다.`,
        tip: "실시간 제보 패치(LIVE PATCH)를 통해 중앙 정면 돌파 대신 좌측 벽면 상가 라인 우회로 해결했습니다.",
        logs: `[08:49:30] BOTTLENECK_HIT 중앙 트리
[08:57:00] REROUTE_FAIL 정적 데이터 한계
[09:12:00] GOAL ARRIVED (LATE +12m)`
      }
    ]
  }
};

let currentNpc = "concierge";
let currentTurn = 0;

const elChat = document.getElementById("chat-timeline");
const elLogs = document.getElementById("xray-logs");
const elTurnCount = document.getElementById("turn-count");
const elNodeId = document.getElementById("current-node-id");
const elNodeAlias = document.getElementById("current-node-alias");
const elArrival = document.getElementById("arrival-time");
const elBadge = document.getElementById("status-badge");
const elScore = document.getElementById("reward-score");
const elFill = document.getElementById("reward-fill");
const elSummary = document.getElementById("route-summary");

function renderState() {
  const data = SCENARIOS[currentNpc];
  const turnData = data.turns[currentTurn];

  // 상단 헤더 갱신
  elArrival.textContent = data.arrival;
  elArrival.className = `time-val ${data.isSuccess ? "success" : "fail"}`;
  elBadge.textContent = data.statusText;
  elBadge.className = `badge ${data.isSuccess ? "success" : "fail"}`;
  elScore.textContent = data.score;
  elFill.style.width = data.fillWidth;
  elFill.style.backgroundColor = data.isSuccess ? "#10b981" : "#ef4444";
  elSummary.textContent = data.summary;

  // 채팅 내역 렌더링 (0 ~ currentTurn까지 누적 표시)
  elChat.innerHTML = "";
  for (let i = 0; i <= currentTurn; i++) {
    const t = data.turns[i];
    const userDiv = document.createElement("div");
    userDiv.className = "msg user";
    userDiv.textContent = t.userMsg;
    elChat.appendChild(userDiv);

    const aiDiv = document.createElement("div");
    aiDiv.className = `msg ai ${data.isSuccess ? "" : "fail-mode"}`;
    aiDiv.innerHTML = `
      <div>${t.aiMsg}</div>
      <div class="tip-box">
        <strong>💡 [관제 피드백]</strong>
        ${t.tip}
      </div>
    `;
    elChat.appendChild(aiDiv);
  }
  elChat.scrollTop = elChat.scrollHeight;

  // 맵 단계 하이라이트
  const steps = document.querySelectorAll(".track-step");
  steps.forEach((step, idx) => {
    if (data.isSuccess && idx <= turnData.stepIndex) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  // 우측 X-Ray 패널 갱신
  elNodeId.textContent = turnData.nodeId;
  elNodeAlias.textContent = turnData.alias;
  elLogs.textContent = turnData.logs;
  elTurnCount.textContent = `${currentTurn + 1} / ${data.turns.length}`;
}

// 다음 턴 진행
function nextTurn() {
  const maxTurns = SCENARIOS[currentNpc].turns.length;
  if (currentTurn < maxTurns - 1) {
    currentTurn++;
    renderState();
  } else {
    currentTurn = 0;
    renderState();
  }
}

// 이벤트 바인딩
document.getElementById("btn-next").addEventListener("click", nextTurn);
document.getElementById("btn-reset").addEventListener("click", () => {
  currentTurn = 0;
  renderState();
});

document.querySelectorAll(".npc-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".npc-card").forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    currentNpc = card.dataset.npc;
    currentTurn = 0;
    renderState();
  });
});

document.getElementById("tab-mak").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.getElementById("tab-park").classList.remove("active");
  document.querySelector('[data-npc="cleaner"]').click();
});

document.getElementById("tab-park").addEventListener("click", (e) => {
  e.target.classList.add("active");
  document.getElementById("tab-mak").classList.remove("active");
  document.querySelector('[data-npc="concierge"]').click();
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && document.activeElement.tagName !== "BUTTON") {
    e.preventDefault();
    nextTurn();
  }
});

// 초기 렌더링
renderState();
