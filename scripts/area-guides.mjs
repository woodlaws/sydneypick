const unsplash = (id, width = 1800) => `https://unsplash.com/photos/${id}/download?force=true&w=${width}`;

export const areaGuides = [
  {
    slug: "the-rocks",
    title: "시드니 더 록스 여행 가이드 | 추천 동선과 볼거리 | 시드니픽",
    description: "시드니 더 록스의 역사적인 골목, 하버브리지 주변 산책, 서큘러키와 함께 보는 반나절 추천 동선을 안내합니다.",
    h1: "시드니 더 록스 여행 가이드",
    eyebrow: "THE ROCKS GUIDE",
    summary: "시드니 초기 역사의 흔적과 오래된 건축, 하버브리지 아래 골목을 서큘러키에서 걸어서 이어보세요.",
    category: "하버·도심", stay: "2시간~반나절", audience: "역사·건축·골목 산책 여행자", pair: "서큘러키·오페라하우스",
    hero: unsplash("JgSJDAJaKPo"), heroAlt: "시드니 더 록스의 역사적 건물과 도심 풍경", heroCredit: "Photo: Phillip Flores / Unsplash", heroPosition: "focus-center",
    body: unsplash("3lVlrG-E0zY", 1400), bodyAlt: "더 록스의 오래된 건축과 하버브리지", bodyCredit: "Photo: Jamie Davies / Unsplash",
    why: ["서큘러키에서 하버 수변을 따라 자연스럽게 연결됩니다.", "오래된 사암 건물과 좁은 골목에서 시드니의 초기 도시 풍경을 읽을 수 있습니다.", "오페라하우스와 하버브리지 전망을 같은 반나절에 묶기 좋습니다."],
    highlights: [
      ["역사적인 골목", "오래된 건축과 사암 벽, 계단이 이어지는 골목을 천천히 걸어보세요."],
      ["하버브리지 주변", "다리 아래에서 구조물과 하버를 함께 보고 수변 방향으로 이동합니다."],
      ["서큘러키 연결", "서큘러키 서쪽에서 시작하면 길을 되돌아가는 구간을 줄일 수 있습니다."],
      ["더 록스 마켓", "마켓 운영 일정은 바뀔 수 있으므로 방문 전 공식 웹사이트에서 개최 여부를 확인하세요."]
    ],
    routes: [
      ["2시간 · 골목 핵심", ["서큘러키 서쪽 출발", "역사 골목과 사암 건물", "하버브리지 아래 전망"]],
      ["반나절 · 하버 역사", ["오페라하우스 외부", "서큘러키 수변", "더 록스 골목", "하버브리지 주변"]],
      ["하루 · 도심 확장", ["서큘러키와 오페라하우스", "더 록스", "바랑가루 방향 산책", "저녁 하버 풍경"]]
    ],
    routeLine: ["오페라하우스", "서큘러키", "더 록스 골목", "하버브리지 주변"],
    transport: "서큘러키에서 서쪽 수변과 조지 스트리트 방향으로 연결됩니다. 행사·공사에 따라 보행 경로가 바뀔 수 있으므로 현장 표지와 공식 안내를 따르세요.",
    photo: "사암 건물의 질감, 계단과 좁은 골목의 원근감, 하버브리지 구조물이 함께 들어오는 수변 시점을 나눠 촬영해 보세요.",
    food: "특정 상호보다 산책 시작 전인지, 마켓 방문 중인지, 하버 야경까지 머무를지에 따라 위치와 예약 필요 여부를 고르세요.",
    rain: "골목 산책을 짧게 줄이고 인근 박물관·갤러리 등 실내 문화 공간과 식사를 중심으로 조정하세요. 개관 여부는 공식 채널에서 확인합니다.",
    checks: ["마켓 개최 일정과 행사 통제", "보행로·계단의 공사 또는 폐쇄", "비·강풍 예보와 미끄러운 노면", "예약 시설의 입장 조건"],
    day: "DAY 1 · 서큘러키·오페라하우스와 같은 하버 권역", dayAnchor: "day1",
    nearby: [["서큘러키", "/areas/circular-quay", "하버 교통과 랜드마크의 기준점"], ["시드니 오페라하우스", "/areas/sydney-opera-house", "외부·투어·공연 방문 방식 비교"]],
    faqs: [["더 록스는 서큘러키와 함께 볼 수 있나요?", "두 지역은 수변 보행 동선으로 이어집니다. 오페라하우스까지 묶으면 하버의 양쪽을 보는 반나절 코스로 구성하기 좋습니다."], ["마켓은 언제 열리나요?", "마켓 일정은 행사와 시즌에 따라 달라질 수 있습니다. 방문 날짜를 기준으로 더 록스 공식 웹사이트에서 확인하세요."], ["비가 오면 골목 산책이 가능한가요?", "노면과 계단이 미끄러울 수 있어 야외 동선을 줄이고 실내 문화 공간과 식사 중심으로 바꾸는 편이 안전합니다."]],
    official: [["더 록스 공식 방문 정보", "https://www.therocks.com/"], ["Sydney.com 더 록스", "https://www.sydney.com/destinations/sydney/sydney-city/the-rocks"]]
  },
  {
    slug: "bondi-beach",
    title: "시드니 본다이비치 여행 가이드 | 해변과 산책 코스 | 시드니픽",
    description: "본다이비치 해변 관람과 수영 안전, 본다이 코스털 워크, 브론테 방향 산책과 반나절·하루 코스를 안내합니다.",
    h1: "시드니 본다이비치 여행 가이드",
    eyebrow: "BONDI BEACH GUIDE",
    summary: "푸른 해변을 바라보는 시간부터 안전한 수영과 브론테 방향 해안 산책까지, 날씨에 맞춰 선택하세요.",
    category: "해변", stay: "반나절~하루", audience: "해변·산책·브런치 여행자", pair: "타마라마·브론테",
    hero: "https://images.unsplash.com/photo-1577843010069-b5961d396cff?auto=format&fit=crop&q=82&w=2000", heroAlt: "공중에서 바라본 본다이비치의 모래사장과 푸른 바다", heroCredit: "Photo: Charlie Mitchell / Unsplash", heroPosition: "focus-coast",
    body: "https://images.unsplash.com/photo-1662109652622-f3e1737f468d?auto=format&fit=crop&q=82&w=1500", bodyAlt: "본다이비치의 넓은 모래사장과 해변 풍경", bodyCredit: "Photo: Joshi Milestoner / Unsplash",
    why: ["도시와 해변이 맞닿은 시드니 특유의 분위기를 경험할 수 있습니다.", "해변 관람, 수영, 해안 산책 중 컨디션에 맞는 활동을 고를 수 있습니다.", "브론테 방향으로 걷는 선택지를 더하면 반나절을 하루 일정으로 확장하기 쉽습니다."],
    highlights: [["본다이비치", "모래사장과 파도, 해변 산책을 즐기되 수영은 현장 안전 표지와 구조요원의 안내를 따르세요."], ["본다이 코스털 워크", "해안 절벽과 작은 해변을 잇는 산책 방향입니다. 날씨와 구간 상태를 먼저 확인하세요."], ["브론테 방향", "컨디션과 복귀 교통을 고려해 타마라마·브론테 방향으로 산책 범위를 정합니다."], ["해변 관람과 수영", "수영 가능 구역과 파도 상태가 다를 수 있으므로 깃발 사이와 현장 안내를 우선합니다."]],
    routes: [["2시간 · 해변 핵심", ["해변 전망", "모래사장 산책", "수영 여부 현장 판단"]], ["반나절 · 해안 산책", ["본다이비치", "코스털 워크 일부", "타마라마 방향", "브런치 또는 카페"]], ["하루 · 브론테 확장", ["아침 해변", "코스털 워크", "브론테 방향", "귀환 교통 확인 후 복귀"]]],
    routeLine: ["본다이비치", "코스털 워크", "타마라마", "브론테 방향"],
    transport: "시내 출발 지점에 따라 기차와 버스를 조합하거나 버스를 이용할 수 있습니다. 탑승 정류장, 환승, 막차와 실시간 운행 상태는 출발 당일 Transport for NSW에서 확인하세요.",
    photo: "북쪽과 남쪽 끝에서 해변 곡선을 넓게 담고, 코스털 워크에서는 난간 안쪽 안전한 위치에서 절벽과 바다의 층을 구성하세요.",
    food: "브런치·카페는 상호나 평점보다 해변 전후 동선, 대기 가능 시간, 실내 좌석과 예약 필요 여부를 기준으로 선택하세요.",
    rain: "강한 비·바람이나 거친 파도에는 수영과 절벽 산책을 피하고, 실내 식사와 동부 지역의 문화 공간으로 일정을 바꾸세요.",
    checks: ["해변 안전 깃발과 구조요원 안내", "파도·강풍·강수 예보", "자외선 차단·모자·물", "코스털 워크 구간 폐쇄", "복귀 버스와 환승 정보"],
    day: "DAY 3 · 본다이비치와 동부 해안", dayAnchor: "day3",
    nearby: [["서큘러키", "/areas/circular-quay", "하버 일정과 해변 일정을 분리해 비교"], ["지역별 픽", "/areas", "다른 해변과 하버 권역 살펴보기"]],
    faqs: [["본다이비치에서 수영해도 되나요?", "수영 여부는 당일 파도와 안전 통제에 따라 판단해야 합니다. 지정된 깃발 사이에서 수영하고 구조요원과 현장 표지를 따르세요."], ["브론테까지 꼭 걸어야 하나요?", "필수 코스는 아닙니다. 날씨와 체력, 복귀 동선을 고려해 코스털 워크 일부만 걷거나 타마라마 방향에서 돌아올 수 있습니다."], ["자외선 대비는 어떻게 하나요?", "계절과 관계없이 출발 직전 UV·날씨 정보를 확인하고 모자, 물, 자외선 차단과 휴식 계획을 준비하세요."]],
    official: [["Beachsafe 본다이 안전 정보", "https://beachsafe.org.au/beach/nsw/waverley/bondi/bondi"], ["Transport for NSW", "https://transportnsw.info/"], ["Sydney.com 본다이", "https://www.sydney.com/destinations/sydney/sydney-east/bondi"]]
  },
  {
    slug: "manly",
    title: "시드니 맨리 여행 가이드 | 페리와 해변 하루 코스 | 시드니픽",
    description: "서큘러키에서 페리로 떠나는 맨리 여행, 중심가와 해변·해안 산책, 반나절과 하루 동선 및 운항 확인 방법을 안내합니다.",
    h1: "시드니 맨리 여행 가이드",
    eyebrow: "MANLY GUIDE",
    summary: "서큘러키에서 출발하는 페리 경험과 맨리 중심가, 해변 산책을 한 흐름으로 이어보세요.",
    category: "해변", stay: "반나절~하루", audience: "페리·해변·산책 여행자", pair: "서큘러키",
    hero: unsplash("Y-EltmuTWeM"), heroAlt: "맨리 해변의 모래사장과 야자수 산책로", heroCredit: "Photo: Unsplash", heroPosition: "focus-coast",
    body: "https://images.unsplash.com/photo-1729023410572-ae94d0019ec9?auto=format&fit=crop&q=82&w=1500", bodyAlt: "햇빛 아래 맨리 해변을 즐기는 여행자들", bodyCredit: "Photo: Unsplash",
    why: ["이동 자체가 시드니 하버를 보는 여행 경험이 됩니다.", "선착장에서 중심가를 지나 해변까지 방향이 단순해 첫 방문에도 동선을 잡기 쉽습니다.", "짧은 해변 산책부터 하루짜리 해안 일정까지 유연하게 구성할 수 있습니다."],
    highlights: [["맨리 페리 경험", "서큘러키 출발 전 승강장과 운항 상태를 확인하고 하버 풍경을 즐기세요."], ["맨리 중심가", "선착장과 해변 사이의 보행 구간으로 식사와 휴식 시점을 정하기 좋습니다."], ["맨리 해변", "해변 관람과 산책을 중심으로 하고 수영은 현장 안전 안내를 따릅니다."], ["해안 산책", "바람과 체력, 귀환 페리 시간을 고려해 왕복 가능한 범위만 선택합니다."]],
    routes: [["2시간 · 맨리 핵심", ["맨리 선착장", "중심가", "맨리 해변", "귀환편 확인"]], ["반나절 · 페리와 해변", ["서큘러키 출발", "중심가 산책", "해변", "카페 또는 식사"]], ["하루 · 해안 확장", ["아침 페리", "맨리 해변", "해안 산책", "저녁 전후 귀환편 확인"]]],
    routeLine: ["서큘러키", "맨리 선착장", "맨리 중심가", "맨리 해변"],
    transport: "출발과 복귀 모두 Transport for NSW의 실시간 페리 운항정보, 선착장 안내와 대체 교통을 확인하세요. 바람과 행사로 운항이 바뀔 가능성을 고려해 마지막 귀환편에 의존하지 않는 계획이 좋습니다.",
    photo: "페리에서는 안전한 좌석과 갑판 규정을 지키며 하버 방향을 담고, 맨리에서는 중심가의 소실점과 해변의 수평선을 나눠 촬영하세요.",
    food: "선착장 근처에서 빠르게 먹을지, 해변 주변에서 오래 머물지 먼저 정하고 귀환 시간에 여유가 있는 위치를 선택하세요.",
    rain: "바람이 강하거나 비가 오면 긴 해안 산책을 줄이고 중심가의 실내 식사·문화 공간으로 조정합니다. 페리 운항 변경 시 대체 교통을 확인하세요.",
    checks: ["출발·복귀 페리의 실시간 운항", "강풍·비·파도 상태", "수영 안전 안내", "해안 산책로 통제", "대체 교통과 귀환 여유"],
    day: "DAY 4 · 페리로 떠나는 맨리", dayAnchor: "day4",
    nearby: [["서큘러키", "/areas/circular-quay", "페리 출발 전 하버 동선 확인"], ["지역별 픽", "/areas", "본다이와 다른 해변 일정 비교"]],
    faqs: [["맨리는 페리로만 갈 수 있나요?", "페리가 대표적인 여행 동선이지만 운항 변경 시 다른 대중교통 선택지가 필요할 수 있습니다. 당일 Transport for NSW에서 가능한 경로를 확인하세요."], ["반나절로도 충분한가요?", "페리와 중심가, 해변을 중심으로 보면 반나절 구성이 가능합니다. 긴 해안 산책과 여유로운 식사를 원하면 하루로 잡으세요."], ["비가 오면 페리는 운항하나요?", "운항 여부는 날씨와 운영 상황에 따라 달라집니다. 출발 직전 공식 실시간 안내를 확인하고 대체 귀환 경로도 함께 살펴보세요."]],
    official: [["Transport for NSW 페리 지도", "https://transportnsw.info/sydney-ferries-network-map"], ["Sydney.com 맨리", "https://www.sydney.com/destinations/sydney/sydney-north/manly"], ["Beachsafe 맨리", "https://beachsafe.org.au/beach/nsw/manly/manly/manly"]]
  },
  {
    slug: "blue-mountains",
    title: "시드니 블루마운틴 당일치기 | 교통·코스·준비물 | 시드니픽",
    description: "시드니에서 블루마운틴 당일치기를 준비하는 방법, 자유여행과 투어 비교, 카툼바 전망 지역과 날씨·걷기 준비물을 안내합니다.",
    h1: "시드니 블루마운틴 당일치기 여행 가이드",
    eyebrow: "BLUE MOUNTAINS DAY TRIP",
    summary: "카툼바와 대표 전망 지역을 중심으로, 날씨와 시야·걷기 난이도를 먼저 확인하는 근교 하루 여행.",
    category: "근교 여행", stay: "하루", audience: "자연·전망·걷기 여행자", pair: "카툼바·루라 권역",
    hero: unsplash("nYa8COA2gFc"), heroAlt: "안개 낀 블루마운틴 계곡과 쓰리 시스터스", heroCredit: "Photo: Tarryn Grignet / Unsplash", heroPosition: "focus-center",
    body: unsplash("XdKg2oJJDvc", 1400), bodyAlt: "블루마운틴의 숲과 절벽, 쓰리 시스터스 전망", bodyCredit: "Photo: Calvin Kurlekar / Unsplash",
    why: ["도시와 다른 사암 절벽, 깊은 계곡과 숲의 스케일을 하루에 경험할 수 있습니다.", "카툼바를 중심으로 전망 위주 또는 산책 위주로 강도를 조정할 수 있습니다.", "자유여행과 투어 중 교통·해설·유연성에 맞는 방식을 선택할 수 있습니다."],
    highlights: [["카툼바", "대중교통과 주요 전망 지역을 연결할 때 기준으로 삼기 좋은 중심지입니다."], ["쓰리 시스터스와 전망 지역", "대표 암석과 계곡 풍경을 보되 절벽 가장자리 안전선과 현장 통제를 지키세요."], ["자연경관", "사암 절벽, 유칼립투스 숲, 계곡과 폭포 등은 시야와 계절에 따라 인상이 달라집니다."], ["자유여행과 투어", "자유여행은 동선 선택이 유연하고, 투어는 이동과 해설을 묶기 쉽습니다. 포함사항과 취소 조건을 비교하세요."]],
    routes: [["현지 2시간 · 전망 압축", ["카툼바 도착", "대표 전망 지역", "짧은 보행 구간", "복귀 교통 연결"]], ["현지 반나절 · 카툼바", ["주요 전망대", "난이도 낮은 산책 선택", "카툼바 휴식", "역 또는 집결지 복귀"]], ["하루 · 시드니 왕복", ["아침 출발", "카툼바와 전망 지역", "날씨에 맞는 걷기", "저녁 복귀"]]],
    routeLine: ["시드니 출발", "카툼바", "대표 전망 지역", "시드니 복귀"],
    transport: "기차 자유여행은 당일 운행과 현지 연결 교통을 직접 확인해야 합니다. 투어는 집결지, 포함 코스, 걷기 강도, 취소 조건과 복귀 방식을 비교하세요. 정확한 시간과 요금은 공식 채널에서 확인합니다.",
    photo: "전망대 안전선 안에서 절벽과 계곡의 깊이를 담고, 안개가 있으면 가까운 숲과 암석의 층을 활용하세요. 절벽 가장자리나 폐쇄 구간에 접근하지 마세요.",
    food: "전망 동선 사이에 식사 시간을 확보하고, 긴 걷기를 선택한다면 물과 간단한 간식을 준비하세요. 특정 매장의 운영 여부는 방문 전 확인합니다.",
    rain: "시야가 나쁘거나 산책로가 폐쇄되면 무리하게 전망을 쫓지 말고 카툼바·루라의 실내 일정이나 시드니 도심의 대체 일정으로 전환하세요. 투어 취소 규정도 확인합니다.",
    checks: ["NSW National Parks 경보와 폐쇄", "강수·안개·산불 위험과 시야", "선택 산책로의 난이도와 상태", "겹쳐 입을 옷·걷기 신발·물", "기차 운행 또는 투어 집결·취소 조건"],
    day: "DAY 5 · 블루마운틴 근교 하루", dayAnchor: "day5",
    nearby: [["지역별 픽", "/areas", "시드니 하버·해변 일정과 비교"], ["서큘러키", "/areas/circular-quay", "근교 다음 날 가볍게 묶는 하버 지역"]],
    faqs: [["자유여행과 투어 중 무엇이 좋나요?", "동선을 직접 조정하고 싶다면 자유여행, 이동과 안내를 한 번에 준비하고 싶다면 투어가 편할 수 있습니다. 운행·포함사항·취소 조건을 방문 날짜 기준으로 비교하세요."], ["날씨가 나쁘면 가도 되나요?", "안개와 강수, 강풍, 화재 위험은 시야와 산책로 개방에 영향을 줍니다. 공식 경보와 폐쇄 정보를 확인하고 대체 일정을 준비하세요."], ["어떤 준비물이 필요한가요?", "걷기 편한 신발, 겹쳐 입을 옷, 물과 자외선·우천 대비물을 기본으로 준비하고 선택한 산책 난이도에 맞춰 조정하세요."]],
    official: [["NSW National Parks 카툼바", "https://www.nationalparks.nsw.gov.au/visit-a-park/parks/katoomba-area/visitor-info"], ["NSW National Parks 경보", "https://www.nationalparks.nsw.gov.au/alerts/alerts-list"], ["Transport for NSW", "https://transportnsw.info/"]]
  }
];

const header = `<header class="site-header"><a class="brand" href="/" aria-label="시드니픽 홈"><strong>SYDNEY PICK</strong><span>시드니픽</span></a><button class="menu-toggle" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span></button><nav class="desktop-nav" aria-label="주요 메뉴"><a href="/itineraries">여행 일정</a><a href="/areas" aria-current="page">지역별 픽</a><a href="/#food">맛집·카페</a><a href="/#prepare">여행 준비</a><a href="/#shopping">쇼핑픽</a><a href="/#magazine">픽 매거진</a></nav><a class="guide-button" href="/#guide">무료 여행 가이드 <span>→</span></a><nav class="mobile-menu" aria-label="모바일 메뉴"><a href="/itineraries">여행 일정</a><a href="/areas">지역별 픽</a><a href="/#food">맛집·카페</a><a href="/#prepare">여행 준비</a><a href="/#shopping">쇼핑픽</a><a href="/#magazine">픽 매거진</a><a href="/#guide">무료 여행 가이드</a></nav></header>`;
const footer = `<footer><div class="wrap footer-grid"><div class="footer-brand"><a class="brand" href="/"><strong>SYDNEY PICK</strong><span>시드니픽</span></a><p>한국인을 위한 시드니 자유여행 가이드.<br>더 적게 헤매고, 더 오래 기억하세요.</p></div><nav><strong>여행 일정</strong><a href="/itineraries">전체 일정</a><a href="/itineraries/sydney-5n6d">5박 6일</a></nav><nav><strong>지역별 픽</strong><a href="/areas">지역 보기</a><a href="/areas/circular-quay">서큘러키</a><a href="/areas/the-rocks">더 록스</a></nav><nav><strong>여행 준비</strong><a href="/#prepare">체크리스트</a><a href="/#shopping">쇼핑픽</a></nav><nav><strong>콘텐츠</strong><a href="/#magazine">픽 매거진</a><a href="/#guide">무료 가이드</a></nav></div><div class="wrap footer-bottom"><p>© 2026 SYDNEY PICK. 정보는 변경될 수 있으므로 공식 채널을 확인하세요.</p></div></footer>`;
const list = (items) => items.map((item) => `<li>${item}</li>`).join("");

export function renderAreaGuide(g) {
  const url = `__SITE_URL__/areas/${g.slug}`;
  const breadcrumb = {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"홈","item":"__SITE_URL__/"},{"@type":"ListItem","position":2,"name":"지역별 픽","item":"__SITE_URL__/areas"},{"@type":"ListItem","position":3,"name":g.h1,"item":url}]};
  const place = {"@context":"https://schema.org","@type":g.slug === "blue-mountains" ? "TouristAttraction" : "Place","name":g.h1.replace(/^시드니 | 여행 가이드$| 당일치기 여행 가이드$/g, ""),"description":g.summary,"url":url,"containedInPlace":{"@type":"AdministrativeArea","name":"New South Wales"}};
  const faq = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":g.faqs.map(([q,a])=>({"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}}))};
  return `<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#087da6"><title>${g.title}</title><meta name="description" content="${g.description}"><link rel="canonical" href="${url}"><link rel="icon" href="/public/favicon.svg" type="image/svg+xml"><meta property="og:type" content="article"><meta property="og:locale" content="ko_KR"><meta property="og:site_name" content="시드니픽"><meta property="og:title" content="${g.title}"><meta property="og:description" content="${g.description}"><meta property="og:url" content="${url}"><meta property="og:image" content="${g.hero}"><meta name="twitter:card" content="summary_large_image"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/styles-pages.css"><link rel="stylesheet" href="/styles-areas.css"><script type="application/ld+json">${JSON.stringify(breadcrumb)}</script><script type="application/ld+json">${JSON.stringify(place)}</script><script type="application/ld+json">${JSON.stringify(faq)}</script></head><body class="areas-page"><a class="skip-link" href="#content">본문으로 건너뛰기</a>${header}<main id="content"><div class="wrap breadcrumbs"><a href="/">홈</a> / <a href="/areas">지역별 픽</a> / ${g.h1}</div><section class="area-hero detail-area-hero"><img class="${g.heroPosition}" src="${g.hero}" alt="${g.heroAlt}"><div class="wrap area-hero-content"><p class="eyebrow">${g.eyebrow}</p><h1>${g.h1}</h1><p class="lead">${g.summary}</p></div><p class="hero-credit">${g.heroCredit}</p></section><div class="wrap overview-band"><div><small>권역</small><b>${g.category}</b></div><div><small>추천 체류시간</small><b>${g.stay}</b></div><div><small>추천 대상</small><b>${g.audience}</b></div><div><small>함께 묶기</small><b>${g.pair}</b></div></div>
  <section class="editorial-section"><div class="wrap"><header class="editorial-head"><div><p class="eyebrow">WHY THIS AREA</p><h2>처음 방문하는 여행자에게 추천하는 이유</h2></div><p>${g.summary}</p></header><div class="feature-split"><figure class="photo-block"><img class="guide-photo" src="${g.body}" alt="${g.bodyAlt}" loading="lazy"><figcaption class="photo-credit-line">${g.bodyCredit}</figcaption></figure><div class="prose"><ul>${list(g.why)}</ul></div></div></div></section>
  <section class="editorial-section tint"><div class="wrap"><header class="editorial-head"><div><p class="eyebrow">HIGHLIGHTS</p><h2>주요 볼거리</h2></div><p>운영 일정과 현장 통제는 바뀔 수 있으므로 방문 전 공식 정보를 다시 확인하세요.</p></header><div class="place-grid">${g.highlights.map(([h,p])=>`<article class="place-item"><h3>${h}</h3><p>${p}</p></article>`).join("")}</div></div></section>
  <section class="editorial-section"><div class="wrap"><header class="editorial-head"><div><p class="eyebrow">ROUTE IDEAS</p><h2>2시간·반나절·하루 추천 동선</h2></div><p>고정 시간표가 아니라 동선을 잡는 기준입니다. 날씨와 공식 운행정보에 맞춰 순서를 조정하세요.</p></header><div class="route-board">${g.routes.map(([h,steps])=>`<article class="route-option"><h3>${h}</h3><ol>${list(steps)}</ol></article>`).join("")}</div><div class="route-map" aria-label="추천 동선 지도형 표현"><div class="route-line">${g.routeLine.map((x,i)=>`${i?"<i>→</i>":""}<span>${x}</span>`).join("")}</div></div></div></section>
  <section class="editorial-section tint"><div class="wrap"><header class="editorial-head"><div><p class="eyebrow">PRACTICAL GUIDE</p><h2>현장에서 필요한 선택 기준</h2></div><p>가격·운영시간·교통시간은 확정값으로 싣지 않고 당일 공식 안내를 기준으로 합니다.</p></header><div class="info-columns"><article class="info-panel"><h3>교통과 이동 팁</h3><p>${g.transport}</p></article><article class="info-panel"><h3>사진 촬영 포인트</h3><p>${g.photo}</p></article><article class="info-panel"><h3>식사·카페 선택 기준</h3><p>${g.food}</p></article><article class="info-panel"><h3>우천 시 대안</h3><p>${g.rain}</p></article><article class="info-panel"><h3>방문 전 확인사항</h3><ul>${list(g.checks)}</ul></article><article class="info-panel"><h3>관련 5박 6일 일정</h3><p>${g.day}</p><a href="/itineraries/sydney-5n6d#${g.dayAnchor}">일정에서 보기 →</a></article></div></div></section>
  <section class="editorial-section"><div class="wrap"><header class="editorial-head"><div><p class="eyebrow">NEARBY</p><h2>함께 보면 좋은 지역</h2></div><p>실제로 공개된 페이지와 허브 주소만 연결했습니다.</p></header><div class="place-grid">${g.nearby.map(([n,href,p])=>`<article class="place-item"><h3>${n}</h3><p>${p}</p><a href="${href}">가이드 보기 →</a></article>`).join("")}</div></div></section>
  <section class="editorial-section tint"><div class="wrap"><header class="editorial-head"><div><p class="eyebrow">FAQ</p><h2>자주 묻는 질문</h2></div><p>화면에 표시된 문답만 FAQ 구조화 데이터에 포함했습니다.</p></header><div class="faq-list">${g.faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>
  <section class="editorial-section"><div class="wrap"><div class="source-box"><div><h2>공식 정보 확인</h2><p>운영시간·요금·교통·안전 정보는 방문 날짜에 맞춰 아래 공식 채널을 우선 확인하세요.</p></div><div class="source-actions">${g.official.map(([n,href])=>`<a href="${href}" target="_blank" rel="noreferrer">${n} ↗</a>`).join("")}</div></div><p class="updated">최종 업데이트: __LAST_UPDATED__</p></div></section></main>${footer}<script src="/assets/itineraries.js" defer></script></body></html>`;
}

