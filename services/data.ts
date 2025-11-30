import { Subject, Chapter, Question } from '../types';

// Data derived from the provided OCR content - Full Chapter List
export const CHAPTERS: Chapter[] = [
  // --- 1과목: 컴퓨터 일반 ---
  {
    id: "c1",
    title: "1장 컴퓨터 시스템 관리",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "core001", title: "컴퓨터의 개념", content: ["GIGO: 정확성, 수동성", "특징: 정확성, 신속성, 대용량성, 범용성, 호환성"] },
      { id: "core002", title: "발전과정", content: ["에니악(최초 전자), 에드삭(내장방식 최초도입), 에드박(2진수)", "1세대(진공관) -> 2세대(TR) -> 3세대(IC) -> 4세대(LSI)"] },
      { id: "core005", title: "CPU(중앙처리장치)", content: ["레지스터(가장빠름), 제어장치(해독,지시), 연산장치(계산)"] },
      { id: "core006", title: "주기억장치", content: ["ROM(비휘발성), RAM(휘발성)", "SRAM(캐시), DRAM(주기억, 재충전필요)"] }
    ]
  },
  {
    id: "c2",
    title: "2장 인터넷 활용",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "core015", title: "IP주소", content: ["IPv4(32비트), IPv6(128비트)", "DNS: 문자동메인을 숫자IP로 변환"] },
      { id: "core016", title: "프로토콜", content: ["HTTP(웹), FTP(파일), SMTP(메일송신), POP3(메일수신)"] }
    ]
  },
  {
    id: "c3",
    title: "3장 멀티미디어 활용",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "core017", title: "멀티미디어 특징", content: ["통합성, 디지털화, 쌍방향성, 비선형성"] },
      { id: "graph01", title: "그래픽 파일", content: ["비트맵(래스터): 확대시 계단현상(BMP, JPG, GIF)", "벡터: 매끄러움(WMF, AI)"] }
    ]
  },
  {
    id: "c4",
    title: "4장 정보통신 일반",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "net01", title: "네트워크 장비", content: ["라우터: 최적경로 설정", "허브: 다중 연결", "게이트웨이: 서로 다른 네트워크 연결"] },
      { id: "net02", title: "망 구성", content: ["LAN(근거리), WAN(광역), VAN(부가가치)"] }
    ]
  },
  {
    id: "c5",
    title: "5장 컴퓨터 시스템 보호",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "sec01", title: "보안 위협", content: ["웜(복제/부하), 트로이목마(위장), 피싱(가짜사이트), 스니핑(엿보기), 스푸핑(속임수)"] },
      { id: "sec02", title: "방화벽", content: ["외부 침입 차단, 내부 해킹은 못 막음, 역추적 가능"] }
    ]
  },
  {
    id: "c6",
    title: "6장 운영체제(Windows)",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "win01", title: "단축키", content: ["Ctrl+Esc: 시작메뉴", "Alt+Tab: 창전환", "Shift+Del: 영구삭제", "PrintScreen: 전체화면 캡처"] },
      { id: "win02", title: "휴지통", content: ["복원 가능, 용량 조절 가능, USB/네트워크 삭제는 복구 불가"] }
    ]
  },
  {
    id: "c7",
    title: "7장 시스템 설정",
    subject: Subject.COMPUTER_GENERAL,
    concepts: [
      { id: "sys01", title: "제어판/설정", content: ["프로그램 제거/변경, 장치 관리자(드라이버), 업데이트"] }
    ]
  },

  // --- 2과목: 스프레드시트 일반 ---
  {
    id: "s1",
    title: "1장 스프레드시트 개요",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "spr01", title: "화면 구성", content: ["리본메뉴, 이름상자(주소표시), 수식입력줄"] },
      { id: "spr02", title: "파일 관리", content: ["xlsx(기본), xlsm(매크로), xltx(서식)"] }
    ]
  },
  {
    id: "s2",
    title: "2장 데이터 입력 및 편집",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "data01", title: "입력 데이터", content: ["문자(왼쪽), 숫자(오른쪽), 날짜/시간(오른쪽)", "한 셀 줄바꿈: Alt+Enter"] },
      { id: "data02", title: "채우기 핸들", content: ["숫자+Ctrl: 1씩 증가, 문자+숫자: 숫자가 1씩 증가"] }
    ]
  },
  {
    id: "s3",
    title: "3장 수식 활용",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "func01", title: "참조", content: ["상대($A1), 절대($A$1), 혼합($A1)", "F4키로 전환"] },
      { id: "func02", title: "논리/찾기 함수", content: ["IF, AND, OR", "VLOOKUP(열참조), HLOOKUP(행참조)"] }
    ]
  },
  {
    id: "s4",
    title: "4장 데이터 관리 및 분석",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "anal01", title: "정렬/필터", content: ["정렬: 오름차순/내림차순 (최대 64개 기준)", "고급필터: 조건 범위 필요"] },
      { id: "anal02", title: "분석 도구", content: ["피벗테이블(요약분석), 부분합(정렬필수), 목표값찾기, 시나리오"] }
    ]
  },
  {
    id: "s5",
    title: "5장 출력",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "prt01", title: "페이지 설정", content: ["머리글/바닥글, 인쇄영역 설정, 눈금선 인쇄 여부"] }
    ]
  },
  {
    id: "s6",
    title: "6장 차트 생성",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "cht01", title: "차트 종류", content: ["꺾은선(추세), 원형(비율, 계열1개), 분산형(과학데이터), 콤보(혼합)"] }
    ]
  },
  {
    id: "s7",
    title: "7장 매크로 생성",
    subject: Subject.SPREADSHEET_GENERAL,
    concepts: [
      { id: "mac01", title: "매크로 특징", content: ["반복 작업 자동화, VBA 언어, 매크로 기록기 사용", "보안 설정 필요"] }
    ]
  }
];

// Initial static questions (Representative sample, expanded)
export const QUESTIONS: Question[] = [
  // C1
  {
    id: "q_c1_1",
    chapterId: "c1",
    question: "다음 중 컴퓨터의 특징으로 볼 수 없는 것은?",
    options: ["정확성", "신속성", "창의성", "범용성"],
    correctAnswer: 2,
    explanation: "컴퓨터는 수동적인 기계(GIGO)로 창의성은 없습니다."
  },
  {
    id: "q_c1_2",
    chapterId: "c1",
    question: "다음 중 프로그램 내장 방식을 최초로 도입한 컴퓨터는?",
    options: ["에니악", "에드삭", "유니박", "마크-1"],
    correctAnswer: 1,
    explanation: "최초 도입은 에드삭(EDSAC), 폰노이만이 제안했습니다."
  },
  // C2
  {
    id: "q_c2_1",
    chapterId: "c2",
    question: "IPv6 주소 체계에 대한 설명으로 틀린 것은?",
    options: ["128비트 주소이다.", "16비트씩 8부분이다.", "마침표(.)로 구분한다.", "주소 부족 해결을 위해 개발됨."],
    correctAnswer: 2,
    explanation: "IPv6는 콜론(:)으로 구분합니다. 마침표는 IPv4입니다."
  },
  // C3
  {
    id: "q_c3_1",
    chapterId: "c3",
    question: "이미지를 확대했을 때 계단 현상이 발생하는 그래픽 표현 방식은?",
    options: ["벡터", "비트맵", "포스트스크립트", "DXF"],
    correctAnswer: 1,
    explanation: "비트맵(래스터) 방식은 픽셀(점)로 이미지를 표현하여 확대 시 계단 현상이 발생합니다."
  },
  // C4
  {
    id: "q_c4_1",
    chapterId: "c4",
    question: "네트워크에서 최적의 경로를 설정하여 데이터를 전송하는 장비는?",
    options: ["허브", "리피터", "라우터", "브리지"],
    correctAnswer: 2,
    explanation: "라우터(Router)는 네트워크 간을 연결하며 최적의 경로(IP 경로)를 설정합니다."
  },
  // C5
  {
    id: "q_c5_1",
    chapterId: "c5",
    question: "자신을 복제하여 시스템의 부하를 높이는 바이러스 형태는?",
    options: ["트로이목마", "웜(Worm)", "백도어", "스푸핑"],
    correctAnswer: 1,
    explanation: "웜(Worm)은 자기 복제 능력이 있어 시스템 속도를 저하시키고 다운시킵니다."
  },
  // C6
  {
    id: "q_c6_1",
    chapterId: "c6",
    question: "Windows에서 파일이나 폴더를 휴지통을 거치지 않고 영구 삭제하는 단축키는?",
    options: ["Delete", "Ctrl + Delete", "Shift + Delete", "Alt + Delete"],
    correctAnswer: 2,
    explanation: "Shift + Delete를 누르면 휴지통에 보관되지 않고 즉시 삭제됩니다."
  },
  // S1
  {
    id: "q_s1_1",
    chapterId: "s1",
    question: "엑셀 매크로가 포함된 통합 문서의 확장자는?",
    options: [".xlsx", ".xltx", ".xlsm", ".xlsb"],
    correctAnswer: 2,
    explanation: ".xlsm은 매크로 사용 통합 문서의 확장자입니다."
  },
  // S2
  {
    id: "q_s2_1",
    chapterId: "s2",
    question: "엑셀 셀 안에서 줄을 바꾸어 입력할 때 사용하는 키는?",
    options: ["Ctrl + Enter", "Alt + Enter", "Shift + Enter", "Tab"],
    correctAnswer: 1,
    explanation: "한 셀 내 줄바꿈은 Alt + Enter 입니다."
  },
  // S3
  {
    id: "q_s3_1",
    chapterId: "s3",
    question: "수식 '$A$1'에 대한 설명으로 옳은 것은?",
    options: ["상대 참조이다.", "혼합 참조이다.", "절대 참조이다.", "3차원 참조이다."],
    correctAnswer: 2,
    explanation: "행과 열 앞에 모두 $가 붙어 위치가 고정되는 것은 절대 참조입니다."
  },
  {
    id: "q_s3_2",
    chapterId: "s3",
    question: "다음 중 조건에 맞는 셀의 개수를 세는 함수는?",
    options: ["COUNT", "COUNTA", "COUNTIF", "SUMIF"],
    correctAnswer: 2,
    explanation: "COUNTIF는 지정된 범위 내에서 조건에 맞는 셀의 개수를 반환합니다."
  },
  // S4
  {
    id: "q_s4_1",
    chapterId: "s4",
    question: "부분합을 실행하기 전에 반드시 선행되어야 하는 작업은?",
    options: ["셀 병합", "정렬", "조건부 서식", "필터"],
    correctAnswer: 1,
    explanation: "부분합은 그룹별로 데이터를 계산하므로, 기준이 되는 필드로 반드시 '정렬'이 되어 있어야 합니다."
  },
  // S6
  {
    id: "q_s6_1",
    chapterId: "s6",
    question: "전체 항목의 합에 대한 각 항목의 비율을 표시하기에 가장 적합한 차트는?",
    options: ["막대형", "꺾은선형", "원형", "분산형"],
    correctAnswer: 2,
    explanation: "원형 차트는 전체에 대한 각 부분의 비율(점유율)을 보여주는 데 적합합니다."
  }
];