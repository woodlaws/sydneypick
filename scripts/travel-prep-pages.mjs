const official = {
  entry: "https://immi.homeaffairs.gov.au/entering-and-leaving-australia/entering-australia",
  biosecurity: "https://www.abf.gov.au/entering-and-leaving-australia/can-you-bring-it-in/categories",
  airport: "https://www.sydneyairport.com.au/info-sheet/transport-options",
  airportPublic: "https://transportnsw.info/tickets-fares/getting-to-from-sydney-airport",
  opal: "https://transportnsw.info/tickets-fares/opal",
  tap: "https://transportnsw.info/tickets-fares/opal/tapping-on-tapping-off",
  roaming: "https://www.acma.gov.au/using-your-mobile-or-smart-device-overseas",
  exchange: "https://www.accc.gov.au/consumers/specific-products-and-activities/foreign-currency-and-money-exchange",
};

export const travelPrepPages = [
  {
    slug: "airport-to-city",
    title: "시드니 공항에서 시내 가는 방법 | 교통수단 비교 | 시드니픽",
    description: "시드니 공항철도, 대중교통, 택시, 차량 호출, 공항 픽업과 렌터카를 여행 조건에 맞춰 비교하는 가이드입니다.",
    h1: "시드니 공항에서 시내 가는 방법",
    eyebrow: "AIRPORT TO CITY",
    lead: "짐의 양, 동행 구성, 도착 시간과 숙소 위치를 기준으로 이동수단을 고르세요. 요금과 운행 정보는 출발 전에 공식 채널에서 다시 확인합니다.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=82&w=2000",
    alt: "공항 활주로 위 여객기",
    summaryTitle: "한눈에 비교하는 여섯 가지 선택지",
    summary: "가장 빠르거나 저렴한 한 가지 정답은 없습니다. 인원수와 수하물, 숙소의 역·정차 지점 접근성을 함께 봐야 실제 이동이 편해집니다.",
    table: {
      headers: ["이동수단", "추천 대상", "짐이 많을 때", "가족여행", "심야·이른 아침", "편의성", "비용 확인", "예약"],
      rows: [
        ["공항철도", "도심 역 인근 숙소·소수 인원", "환승·도보 구간 확인", "유모차와 짐 이동 확인", "당일 첫·막차 확인", "정체 영향을 덜 받음", "공식 여정 검색", "보통 현장 이용"],
        ["일반 대중교통 조합", "노선 비교에 익숙한 여행자", "환승이 많으면 불편", "동선이 단순할 때", "운행 여부 확인 필수", "숙소별 편차 큼", "공식 경로·요금 조회", "불필요"],
        ["택시", "문 앞 이동·짐 많은 여행자", "상대적으로 편리", "가족 단위에 편리", "승차장 운영 확인", "환승 없이 이동", "공항 공식 안내와 현장 표시", "보통 불필요"],
        ["차량 호출 서비스", "앱 사용이 익숙한 여행자", "차량 크기 확인", "카시트 등 조건 확인", "앱 내 이용 가능 여부", "지정 픽업 구역 확인", "호출 시 앱에서 확인", "호출 시점에 배정"],
        ["공항 픽업", "인원·짐이 많고 사전 확정 선호", "차종을 사전 확인", "조건이 맞으면 편리", "업체 운영조건 확인", "도착 안내 방식 확인", "확정 제휴 전 개별 비교", "필요"],
        ["렌터카", "도착 직후 근교 이동", "차종별 적재량 확인", "좌석·카시트 확인", "영업·반납 조건 확인", "도심만 볼 때는 주차 고려", "공식 예약 화면", "권장"],
      ],
    },
    sections: [
      ["선택 순서", "숙소 주소 확인 → 인원과 짐 계산 → 도착 시간대의 운행 여부 확인 → 총 이동 동선 비교 → 당일 지연 시 대안 저장", "flow"],
      ["예약 전 확인사항", ["터미널과 지정 승차장", "수하물·유모차·카시트 조건", "항공편 지연 시 대기 정책", "취소와 변경 조건", "숙소 앞 정차 가능 여부"], "list"],
      ["제휴·예약 확장 영역", "현재 연결된 공항 픽업 제휴처는 없습니다. 업체명이나 가격을 임의로 노출하지 않으며, 제휴가 생기면 광고·제휴임을 명확히 표시합니다.", "affiliate"],
    ],
    sources: [["Sydney Airport 교통 안내", official.airport], ["Transport for NSW 공항 이동", official.airportPublic]],
    faqs: [
      ["공항철도 요금을 미리 확정해도 되나요?", "요금과 적용 조건은 바뀔 수 있으므로 여행 날짜를 기준으로 공식 여정 검색에서 확인하세요."],
      ["늦은 시간 도착하면 무엇을 먼저 봐야 하나요?", "공식 운행 상태와 승차장 운영, 숙소 체크인 가능 시각을 함께 확인하고 두 번째 이동수단을 준비하세요."],
      ["공항 픽업을 지금 예약할 수 있나요?", "시드니픽에는 현재 확정된 제휴처가 없어 예약 기능을 제공하지 않습니다."],
    ],
  },
  {
    slug: "opal-card",
    title: "시드니 오팔카드 사용법 | 대중교통 이용 가이드 | 시드니픽",
    description: "오팔카드와 비접촉 결제, 탭 온·탭 오, 기차·메트로·버스·페리 이용 흐름을 처음부터 정리합니다.",
    h1: "시드니 오팔카드와 대중교통 이용 가이드",
    eyebrow: "MOVE LIKE A LOCAL",
    lead: "시드니 대중교통은 기차·메트로·버스·페리로 이어집니다. 어떤 결제수단을 쓰든 같은 카드나 기기로 탭 온과 탭 오를 일관되게 하세요.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=82&w=2000",
    alt: "도심 철도 승강장에 정차한 열차",
    summaryTitle: "오팔카드와 비접촉 결제의 차이",
    summary: "오팔카드는 충전식 교통카드이고, 지원되는 비접촉 신용·체크카드나 기기는 별도 오팔카드 없이 이용하는 방식입니다. 여행 조건과 카드 수수료를 확인해 하나의 결제수단을 정하세요.",
    table: {
      headers: ["구분", "오팔카드", "비접촉 카드·기기"],
      rows: [
        ["시작 전", "카드 구입·충전 방법 확인", "해외결제·비접촉 기능과 카드사 수수료 확인"],
        ["이용할 때", "같은 오팔카드로 탭 온·탭 오", "같은 실물카드 또는 같은 기기로 탭 온·탭 오"],
        ["내역 확인", "공식 오팔 관리 채널 확인", "교통 내역과 카드사 승인 내역 확인"],
        ["가족여행", "여행자별 결제수단 준비", "한 장을 여러 명이 동시에 공유하지 않도록 준비"],
      ],
    },
    sections: [
      ["버스·기차·메트로·페리 이용 흐름", "노선 검색 → 승강장·정류장 확인 → 같은 수단으로 탭 온 → 이동 → 같은 수단으로 탭 오 → 이용내역 확인", "flow"],
      ["카드나 기기를 섞어 쓰면 안 되는 이유", "실물카드로 들어가고 휴대폰 지갑으로 나오는 식으로 수단을 바꾸면 서로 다른 결제로 인식될 수 있습니다. 입장과 퇴장에 정확히 같은 카드 또는 기기를 사용하세요.", "note"],
      ["여행자가 자주 하는 실수", ["탭 오 누락", "실물카드와 모바일 지갑 혼용", "페리 선착장·승강장 변경 미확인", "어린이·가족 조건을 일반 성인과 같다고 가정", "현재 요금·상한 제도를 오래된 글로 확인"], "list"],
      ["잔액과 이용내역·가족여행", "오팔카드 잔액과 이용내역은 공식 관리 채널에서 확인하세요. 어린이용 조건과 증빙, 가족 구성원의 결제수단은 출발 전에 최신 공식 안내를 확인해야 합니다.", "note"],
    ],
    sources: [["Transport for NSW 오팔 안내", official.opal], ["탭 온·탭 오 공식 안내", official.tap]],
    faqs: [
      ["오팔카드가 꼭 필요한가요?", "지원되는 비접촉 결제수단을 이용할 수도 있습니다. 카드 기능과 해외결제 수수료, 여행자별 사용 조건을 먼저 확인하세요."],
      ["휴대폰과 실물카드를 번갈아 써도 되나요?", "같은 계정의 카드라도 기기와 실물카드는 다르게 인식될 수 있으므로 한 번의 이동에서는 같은 수단을 유지하세요."],
      ["최신 요금과 할인은 어디서 보나요?", "Transport for NSW 공식 오팔·요금 페이지에서 여행 날짜 기준으로 확인하세요."],
    ],
  },
  {
    slug: "esim",
    title: "호주 유심·eSIM 비교 | 시드니 여행 통신 준비 | 시드니픽",
    description: "국내 로밍, 호주 현지 유심, 여행용 eSIM, 포켓 와이파이를 설치·통화·데이터·지원기기 기준으로 비교합니다.",
    h1: "호주 유심과 eSIM, 어떤 것을 선택할까?",
    eyebrow: "STAY CONNECTED",
    lead: "가격표보다 내 휴대폰의 지원 여부, 기존 번호 유지 필요성, 통화 사용과 문제 대응 방식을 먼저 비교하세요.",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=82&w=2000",
    alt: "여행 중 통신 설정을 확인하는 스마트폰",
    summaryTitle: "여행 방식에 맞는 통신 선택",
    summary: "간단함은 로밍, 현지 번호와 통화는 현지 유심, 출국 전 준비와 회선 병행은 eSIM, 여러 기기 공유는 포켓 와이파이가 비교 출발점입니다.",
    table: {
      headers: ["방식", "설치 편의", "기존 번호", "통화", "데이터", "지원기기", "여러 명", "개통·문제 대응"],
      rows: [
        ["국내 통신사 로밍", "기존 회선에서 신청", "유지하기 쉬움", "상품 조건 확인", "사용량별 상품 비교", "통신사 지원 확인", "각 회선별 준비", "국내 통신사 채널"],
        ["호주 현지 유심", "유심 교체 필요", "기존 회선 분리", "현지 번호 조건 확인", "현지 상품 비교", "유심 규격·잠금 확인", "각자 유심 필요", "판매처·통신사 지원"],
        ["여행용 eSIM", "QR·설정으로 설치", "듀얼 회선이면 병행 가능", "데이터 전용 여부 확인", "예상 사용량 비교", "eSIM 지원 필수", "각 기기별 설치", "판매처 원격 지원"],
        ["포켓 와이파이", "기기 수령·충전", "휴대폰 회선 유지", "앱 통화 중심", "공유 사용량 확인", "Wi-Fi 기기", "동행 공유 가능", "대여처·기기 교환 정책"],
      ],
    },
    sections: [
      ["eSIM 설치 전 필수 점검", ["기기 모델과 eSIM 지원 여부", "통신사 잠금 여부", "출국 전 설치 가능 시점", "QR·설치정보의 안전한 별도 보관", "기존 회선과 여행 회선 이름 구분", "데이터 로밍을 켤 회선 확인"], "list"],
      ["데이터 기반 제휴 비교 카드", "비교 데이터 구조는 설치 방식·통화·데이터·지원기기·개통 시점·고객지원 항목을 기준으로 준비했습니다. 제휴처와 쿠폰이 확정되기 전에는 업체명·가격·할인율을 노출하지 않습니다.", "affiliate"],
      ["현지에서 연결되지 않을 때", "Wi-Fi가 되는 곳에서 활성 회선, 기본 데이터 회선, 데이터 로밍, APN 또는 판매처 설치 안내를 순서대로 확인하세요. QR과 주문정보는 재접속 가능한 위치에 보관합니다.", "note"],
    ],
    sources: [["ACMA 해외 모바일 이용 안내", official.roaming]],
    faqs: [
      ["eSIM은 호주에 도착한 뒤 설치해야 하나요?", "상품마다 설치와 개통 시점이 다릅니다. 구매 전 안내를 확인하고, 출국 전 설치가 허용되면 안정적인 Wi-Fi 환경에서 준비하세요."],
      ["기존 전화번호를 계속 받을 수 있나요?", "듀얼 회선 지원과 통신사 설정에 따라 다릅니다. 기존 회선의 로밍 비용과 음성·문자 수신 조건도 확인하세요."],
      ["시드니픽 추천 상품이 있나요?", "현재 확정된 통신 제휴처나 쿠폰은 없습니다. 상품명 대신 선택 기준만 제공합니다."],
    ],
  },
  {
    slug: "money-payment",
    title: "호주 환전과 카드 결제 가이드 | 시드니픽",
    description: "시드니 여행의 현금과 카드 역할, 현지 통화 결제, 해외결제 수수료, 비상 결제수단을 준비하는 기준입니다.",
    h1: "시드니 여행 환전과 카드 결제 가이드",
    eyebrow: "MONEY & PAYMENT",
    lead: "한 가지 결제수단에 의존하지 말고 주 결제카드, 예비카드와 비상용 현금을 분산해 준비하세요. 수수료와 환율은 각 제공자의 최신 조건을 확인합니다.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=82&w=2000",
    alt: "여행 중 카드 결제를 준비하는 손",
    summaryTitle: "현금과 카드는 역할이 다릅니다",
    summary: "카드는 일상 결제와 교통에 편리하고, 현금은 카드 장애나 현금만 받는 상황에 대비하는 보조 수단입니다. 사용 가능성·수수료·분실 대응을 함께 비교하세요.",
    table: {
      headers: ["준비수단", "주요 역할", "출국 전 확인", "현지에서 주의"],
      rows: [
        ["주 결제카드", "숙소·식사·쇼핑 등", "해외·비접촉 결제 가능 여부와 수수료", "가능하면 현지 통화 결제 선택 기준 확인"],
        ["교통 결제수단", "대중교통 탭 온·탭 오", "지원 카드와 카드사 조건", "같은 카드·기기를 일관되게 사용"],
        ["예비카드", "분실·승인 실패 대비", "다른 결제망과 비상 연락처", "주 카드와 분리 보관"],
        ["비상용 현금", "소액·카드 장애 대비", "환전 수수료와 총 수령액", "과도한 현금 휴대 피하기"],
      ],
    },
    sections: [
      ["출국 전 카드사에 확인할 항목", ["해외결제 가능 상태", "해외결제·환전 수수료", "결제 알림 설정", "분실 신고와 재발급 연락 방법", "교통 비접촉 결제 지원 여부", "현금 인출 조건과 수수료"], "list"],
      ["현지 통화 결제 선택", "결제 단말에서 원화 등 다른 통화 선택을 제안받을 수 있습니다. 적용 환율과 수수료를 비교할 수 없다면 카드사와 결제 제공자의 안내를 확인하고 현지 통화 결제 원칙을 미리 정해두세요.", "note"],
      ["분산 보관 원칙", "주 카드와 예비카드를 같은 지갑에 넣지 말고, 분실 신고 연락처와 카드 식별 정보는 안전하게 별도 보관하세요. 결제 알림을 켜고 승인 내역을 정기적으로 확인합니다.", "note"],
    ],
    sources: [["ACCC 외화·환전 소비자 안내", official.exchange], ["Transport for NSW 오팔 안내", official.opal]],
    faqs: [
      ["현금 없이 카드만 가져가도 되나요?", "대부분의 상황에서 카드가 편리하지만 장애·분실·현금 결제 상황에 대비한 예비수단을 준비하는 편이 안전합니다."],
      ["어떤 카드를 가장 추천하나요?", "특정 카드를 최고라고 단정하지 않습니다. 해외결제 가능 여부, 수수료, 비접촉 결제, 분실 대응과 본인의 카드사 조건을 비교하세요."],
      ["환전 금액은 얼마가 적당한가요?", "여행 기간과 카드 사용 계획에 따라 달라집니다. 임의의 금액보다 비상 상황에 필요한 범위를 정하고 환전 비용을 비교하세요."],
    ],
  },
  {
    slug: "checklist",
    title: "시드니 여행 준비물 체크리스트 | 시드니픽",
    description: "여권, 결제, 통신, 의류, 상비약, 해변과 근교 준비물을 기기에서 직접 체크하고 인쇄할 수 있는 목록입니다.",
    h1: "시드니 여행 준비물 체크리스트",
    eyebrow: "PACK WITH CONFIDENCE",
    lead: "내 여행에 필요한 항목만 체크하세요. 체크 상태와 직접 추가한 항목은 이 브라우저에만 저장되며 서버로 전송하지 않습니다.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=82&w=2000",
    alt: "여행 준비 목록을 작성하는 노트와 펜",
    checklist: {
      "여권·예약서류": ["여권 유효기간과 훼손 상태 확인", "항공·숙소 예약정보 오프라인 저장", "입국 조건 공식 확인", "보험·긴급 연락처 저장"],
      "결제수단": ["해외결제 가능 카드", "예비카드 분리 보관", "비상용 현금", "결제 알림과 분실 신고 방법"],
      "스마트폰·통신": ["충전기와 케이블", "보조배터리 항공 규정 확인", "로밍·유심·eSIM 준비", "오프라인 지도와 예약 QR"],
      "의류": ["여행 직전 예보에 맞는 겉옷", "걷기 편한 신발", "숙소·공연 일정에 맞는 옷", "접이식 우산 또는 방수 겉옷"],
      "세면·생활용품": ["개인 세면용품", "자외선 차단용품", "안경·렌즈 용품", "재사용 물병"],
      "상비약": ["평소 복용약과 처방 정보", "개인 상비약", "알레르기·응급 정보", "반입 규정 공식 확인"],
      "비행기 탑승 준비물": ["기내용 귀중품", "장거리 비행용 목베개·안대", "액체·배터리 수하물 규정 확인", "도착 직후 필요한 물품 분리"],
      "해변 준비물": ["수영복과 가벼운 타월", "모자·선글라스", "자외선 차단제", "수영 가능 구역과 날씨 확인"],
      "걷기·근교여행 준비물": ["접지력 있는 신발", "날씨 변화용 레이어", "물과 간단한 간식", "귀환 교통·오프라인 정보"],
      "귀국 전 확인사항": ["항공편과 터미널", "공항 이동 계획", "숙소 체크아웃·수하물", "면세·세관·검역 공식 안내"],
    },
    sources: [["호주 입국 공식 안내", official.entry], ["ABF 반입 품목 안내", official.biosecurity]],
    faqs: [
      ["체크한 정보가 서버에 저장되나요?", "아니요. 체크 상태와 직접 추가한 항목은 현재 브라우저의 로컬 저장소에만 보관됩니다."],
      ["PDF를 바로 받을 수 있나요?", "현재 PDF 파일은 준비 중입니다. 작동하지 않는 다운로드 버튼 대신 무료 가이드 신청 영역으로 안내합니다."],
      ["체크리스트를 종이로 쓸 수 있나요?", "페이지의 인쇄 버튼을 사용하면 체크리스트 중심의 인쇄 화면을 열 수 있습니다."],
    ],
  },
];

const header = `<header class="site-header"><a class="brand" href="/" aria-label="시드니픽 홈"><strong>SYDNEY PICK</strong><span>시드니픽</span></a><button class="menu-toggle" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span></button><nav class="desktop-nav" aria-label="주요 메뉴"><a href="/itineraries">여행 일정</a><a href="/areas">지역별 픽</a><a href="/#food">맛집·카페</a><a href="/travel-prep" aria-current="page">여행 준비</a><a href="/#shopping">쇼핑픽</a><a href="/#magazine">픽 매거진</a></nav><a class="guide-button" href="/#guide">무료 여행 가이드 <span>→</span></a><nav class="mobile-menu" aria-label="모바일 메뉴"><a href="/itineraries">여행 일정</a><a href="/areas">지역별 픽</a><a href="/#food">맛집·카페</a><a href="/travel-prep">여행 준비</a><a href="/#shopping">쇼핑픽</a><a href="/#magazine">픽 매거진</a><a href="/#guide">무료 여행 가이드</a></nav></header>`;
const footer = `<footer><div class="wrap footer-grid"><div class="footer-brand"><a class="brand" href="/"><strong>SYDNEY PICK</strong><span>시드니픽</span></a><p>한국인을 위한 시드니 자유여행 가이드.<br>더 적게 헤매고, 더 오래 기억하세요.</p></div><nav><strong>여행 일정</strong><a href="/itineraries">전체 일정</a><a href="/itineraries/sydney-5n6d">5박 6일</a></nav><nav><strong>지역별 픽</strong><a href="/areas">지역 보기</a><a href="/areas/circular-quay">서큘러키</a></nav><nav><strong>여행 준비</strong><a href="/travel-prep">준비 가이드</a><a href="/travel-prep/checklist">준비물 체크</a><a href="/travel-prep/opal-card">교통 준비</a></nav><nav><strong>콘텐츠</strong><a href="/#magazine">픽 매거진</a><a href="/#guide">무료 가이드</a></nav></div><div class="wrap footer-bottom"><p>© 2026 SYDNEY PICK. 정보는 변경될 수 있으므로 공식 채널을 확인하세요.</p></div></footer>`;

const json = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const faqHtml = (faqs) => `<section class="prep-section tint"><div class="wrap"><div class="prep-intro"><h2>자주 묻는 질문</h2><p>실제 화면에 표시된 질문과 답변만 구조화 데이터에 반영합니다.</p></div><div class="faq-list">${faqs.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>`;
const faqSchema = (faqs) => ({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))});
const sourcesHtml = (sources) => `<section class="prep-section"><div class="wrap"><div class="prep-sources"><div><h2>공식 정보 확인</h2><p>비자·입국·세관·교통·요금·상품 조건은 바뀔 수 있습니다. 여행 날짜를 기준으로 공식 안내를 다시 확인하세요.</p><div class="prep-updated">최종 업데이트: __LAST_UPDATED__</div></div><div class="prep-source-links">${sources.map(([label,url])=>`<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join("")}</div></div></div></section>`;
const head = ({slug,title,description,h1,faqs,type="Article"}) => {
  const path = slug ? `/travel-prep/${slug}` : "/travel-prep";
  const canonical = `__SITE_URL__${path}`;
  const schema = [{"@context":"https://schema.org","@type":type,headline:h1,name:h1,description,url:canonical,inLanguage:"ko-KR",dateModified:"__LAST_UPDATED__",publisher:{"@type":"Organization",name:"시드니픽",url:"__SITE_URL__"}},{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"홈",item:"__SITE_URL__/"},{"@type":"ListItem",position:2,name:"여행 준비",item:"__SITE_URL__/travel-prep"},...(slug?[{"@type":"ListItem",position:3,name:h1,item:canonical}]:[])]},faqSchema(faqs)];
  return `<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="시드니픽"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="__SITE_URL__/public/og.png"><link rel="icon" href="/public/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700;800&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/styles-pages.css"><link rel="stylesheet" href="/styles-prep.css">${schema.map(item=>`<script type="application/ld+json">${json(item)}</script>`).join("")}</head>`;
};
const hero = (page, parent=false) => parent
  ? `<main id="content"><section class="prep-hero detail-hero"><img class="detail-hero-image" src="${page.image}" alt="${page.alt}"><div class="wrap prep-hero-content detail-hero-content"><nav class="breadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><a href="/travel-prep">여행 준비</a><span>›</span><span>${page.h1}</span></nav><p class="eyebrow">${page.eyebrow}</p><h1 class="detail-hero-title">${page.h1}</h1><p class="lead detail-hero-lead">${page.lead}</p></div><p class="credit detail-hero-credit">Photo: Unsplash</p></section>`
  : `<main id="content"><div class="wrap prep-hub-breadcrumb"><a href="/">홈</a><span>›</span><span>여행 준비</span></div><section class="prep-hero prep-hub-hero"><img src="${page.image}" alt="${page.alt}"><div class="wrap prep-hero-content"><div class="prep-hub-copy"><p class="eyebrow">${page.eyebrow}</p><h1 class="preparation-hero-title"><span>처음 가는 시드니</span><span>여행 준비 가이드</span></h1><p class="lead preparation-hero-lead"><span>항공권부터 입국 준비, 공항 이동, 교통, 통신, 결제, 준비물까지</span><span>출발 전에 확인해야 할 내용을 순서대로 정리합니다.</span></p></div></div><p class="credit">Photo: Unsplash</p></section>`;
const renderSection = ([title,content,kind]) => {
  if (kind === "flow") return `<section class="prep-section tint"><div class="wrap"><h2>${title}</h2><div class="prep-flow">${content.split(" → ").map((x,i)=>`${i?'<i>→</i>':''}<span>${x}</span>`).join("")}</div></div></section>`;
  if (kind === "affiliate") return `<section class="prep-section"><div class="wrap"><div class="affiliate-zone"><div><p class="eyebrow">AD · AFFILIATE READY</p><h2>${title}</h2><p>${content}</p><small>광고·제휴가 생기면 해당 사실을 명확히 표시합니다.</small></div><span class="status">제휴 준비 중</span></div></div></section>`;
  return `<article class="decision-card"><h3>${title}</h3>${Array.isArray(content)?`<ul>${content.map(x=>`<li>${x}</li>`).join("")}</ul>`:`<p>${content}</p>`}</article>`;
};

export function renderTravelPrepPage(page) {
  if (page.checklist) return renderChecklist(page);
  const table = `<div class="compare-scroll" tabindex="0" aria-label="${page.h1} 비교표"><table class="prep-compare"><thead><tr>${page.table.headers.map(x=>`<th>${x}</th>`).join("")}</tr></thead><tbody>${page.table.rows.map(row=>`<tr>${row.map((x,i)=>i===0?`<th>${x}</th>`:`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const inlineSections = page.sections.filter(x=>!["flow","affiliate"].includes(x[2])).map(renderSection).join("");
  const fullSections = page.sections.filter(x=>["flow","affiliate"].includes(x[2])).map(renderSection).join("");
  return `${head(page)}<body class="prep-page" data-prep-page="${page.slug}"><a class="skip-link" href="#content">본문으로 건너뛰기</a>${header}${hero(page,true)}<section class="prep-section"><div class="wrap"><div class="prep-intro"><h2>${page.summaryTitle}</h2><p>${page.summary}</p></div>${table}</div></section>${fullSections}<section class="prep-section tint"><div class="wrap"><div class="decision-grid">${inlineSections}</div><div class="trust-note"><h2>변경 가능 정보 안내</h2><p>확인되지 않은 가격, 요금, 운행시간, 상품 조건은 확정적으로 쓰지 않았습니다. 최종 선택 전 공식 채널과 제공자의 최신 조건을 확인하세요.</p></div></div></section>${faqHtml(page.faqs)}${sourcesHtml(page.sources)}</main>${footer}<script src="/assets/travel-prep.js" defer></script></body></html>`;
}

function renderChecklist(page) {
  let index = 0;
  const groups = Object.entries(page.checklist).map(([name,items])=>`<section class="checklist-group"><h2>${name}</h2>${items.map(item=>{index+=1;return `<label><input type="checkbox" data-prep-check="item-${index}"><span>${item}</span></label>`;}).join("")}${name==="귀국 전 확인사항"?'<form class="custom-item-form" data-custom-item-form><input type="text" maxlength="80" aria-label="직접 추가할 준비물" placeholder="내 준비물 직접 추가"><button type="submit">추가</button></form><div class="custom-items" data-custom-items></div>':''}</section>`).join("");
  return `${head(page)}<body class="prep-page" data-prep-page="checklist"><a class="skip-link" href="#content">본문으로 건너뛰기</a>${header}${hero(page,true)}<section class="prep-section"><div class="wrap"><div class="checklist-tools"><button type="button" data-reset-prep>전체 초기화</button><button type="button" data-print-prep>인쇄</button><button type="button" data-share-prep>링크 공유</button><a href="/#guide">PDF 준비 중 · 무료 가이드 신청</a></div><div class="trust-note"><h2>내 기기에만 저장됩니다</h2><p>체크 상태와 직접 추가한 항목은 현재 브라우저의 로컬 저장소에만 보관하며 서버로 전송하지 않습니다. 브라우저 데이터를 지우면 함께 삭제될 수 있습니다.</p></div><div class="checklist-categories">${groups}</div></div></section>${faqHtml(page.faqs)}${sourcesHtml(page.sources)}</main>${footer}<script src="/assets/travel-prep.js" defer></script></body></html>`;
}

export function renderTravelPrepHub() {
  const page={title:"시드니 여행 준비 가이드 | 입국·교통·유심·환전 | 시드니픽",description:"항공권부터 입국 준비, 공항 이동, 교통, 통신, 결제와 준비물까지 순서대로 확인하는 시드니 여행 준비 가이드입니다.",h1:"처음 가는 시드니 여행 준비 가이드",eyebrow:"READY FOR SYDNEY",lead:"항공권부터 입국 준비, 공항 이동, 교통, 통신, 결제, 준비물까지 출발 전에 확인해야 할 내용을 순서대로 정리합니다.",image:"https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=82&w=2000",alt:"여행 출발 전 지도를 보며 준비하는 여행자",faqs:[["여행 준비는 언제 시작하면 좋나요?","여권·입국 조건처럼 변경과 발급 시간이 필요한 항목부터 확인하고, 통신·결제·짐은 출발일에 맞춰 점검하세요."],["체크 상태는 어디에 저장되나요?","이 브라우저에만 저장되며 시드니픽 서버로 전송하지 않습니다."],["입국 조건과 요금은 이 페이지 내용만 보면 되나요?","아니요. 변경 가능 정보는 여행 날짜 기준으로 공식 채널에서 최종 확인해야 합니다."]]};
  const steps=[
    ["항공권과 여권","예약 전·출발 전 재확인","여권 유효기간·영문명·항공 조건","항공사·여권 발급기관","/travel-prep/checklist"],
    ["입국 조건 확인","항공권 결제 전 우선 확인","여행자별 입국 자격·필요 절차","호주 내무부·ABF",official.entry],
    ["숙소 예약","항공 일정 확정 후","주소·체크인·취소조건·수하물","예약처·숙소 공식 안내","/travel-prep/checklist"],
    ["공항에서 시내 이동","숙소 확정 후","터미널·짐·도착시간·숙소 위치","Sydney Airport·Transport for NSW","/travel-prep/airport-to-city"],
    ["오팔카드와 대중교통","출발 전 기본 원칙 확인","결제수단·탭 온/오프·당일 운행","Transport for NSW","/travel-prep/opal-card"],
    ["유심·eSIM","기기 확인 후 출국 전","지원기기·개통시점·데이터·통화","통신사·판매처 공식 안내","/travel-prep/esim"],
    ["환전과 카드 결제","출발 전 카드사 확인","해외결제·수수료·예비수단","카드사·ACCC","/travel-prep/money-payment"],
    ["날씨와 옷차림","일주일 전부터 직전까지","공식 예보·활동별 레이어","Bureau of Meteorology","/travel-prep/checklist"],
    ["여행자보험","예약 직후 조건 비교","보장·제외·청구·긴급연락","보험사 공식 약관","/travel-prep/checklist"],
    ["준비물 점검","출발 일주일 전·전날","수하물 규정·상비약·해변·근교","항공사·ABF","/travel-prep/checklist"],
  ];
  const timeline=steps.map((s,i)=>`<article class="prep-step"><span class="prep-step-number">${String(i+1).padStart(2,"0")}</span><h3>${s[0]}</h3><p><b>반드시 확인</b><br>${s[2]}</p><div class="prep-step-meta"><small>${s[1]}</small><b>공식 확인 · ${s[3]}</b></div><div class="prep-step-action"><a href="${s[4]}"${s[4].startsWith("http")?' target="_blank" rel="noreferrer"':''}>${s[4].startsWith("http")?'공식 정보 확인 ↗':'상세 보기 →'}</a><label class="prep-check"><input type="checkbox" data-prep-check="step-${i+1}"> 준비 완료</label></div></article>`).join("");
  const cards=travelPrepPages.map(p=>`<article class="decision-card"><p class="eyebrow">TRAVEL PREP</p><h3>${p.h1}</h3><p>${p.description}</p><a class="page-button" href="/travel-prep/${p.slug}">상세 가이드 →</a></article>`).join("");
  return `${head(page)}<body class="prep-page" data-prep-page="hub"><a class="skip-link" href="#content">본문으로 건너뛰기</a>${header}${hero(page)}<section class="prep-section prep-steps-section"><div class="wrap"><div class="prep-intro"><h2 class="preparation-section-title">출발까지 10단계</h2><p>완료 체크는 이 브라우저에만 저장됩니다. 공식 확인이 필요한 항목은 출발 직전에 다시 열어보세요.</p></div><div class="prep-timeline">${timeline}</div></div></section><section class="prep-section tint"><div class="wrap"><div class="prep-intro"><h2>깊이 보는<br>준비 가이드</h2><p>실제 선택이 필요한 공항 이동, 교통, 통신, 결제와 준비물을 별도 페이지로 정리했습니다.</p></div><div class="decision-grid">${cards}</div></div></section><section class="prep-section"><div class="wrap"><div class="trust-note"><h2>정보의 기준</h2><p>확인되지 않은 비자·입국·세관·요금·상품 숫자를 임의로 만들지 않습니다. 제휴가 생기면 광고 여부를 명확히 표시하며, 공식 안내와 최종 업데이트 날짜를 함께 제공합니다.</p></div></div></section>${faqHtml(page.faqs)}${sourcesHtml([["호주 입국 공식 안내",official.entry],["ABF 반입 품목",official.biosecurity],["Transport for NSW",official.opal]])}</main>${footer}<script src="/assets/travel-prep.js" defer></script></body></html>`;
}
