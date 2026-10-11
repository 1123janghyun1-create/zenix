# zemit — Meet users. Build together.

zemit은 열정적인 인디 메이커들이 자신만의 프로젝트를 세상에 선보이고, 첫 번째 사용자를 만나 진솔한 피드백을 받으며 함께 성장해 나가는 오픈 플랫폼입니다.

---

## 🚀 주요 기능 및 페이지 안내

### 1. 홈 페이지 (`/`)
- **트렌딩 탭 & 필터**: 인기순(시간 감쇠 랭킹 알고리즘 적용), 최신순, 좋아요순, 최근 업데이트순, 테스터 모집, 팀원 모집
- **프로젝트 실시간 검색**: 프로젝트 이름, 태그, 빌더 이름 실시간 검색 필터링
- **새 프로젝트 등록 CTA**: 등록된 프로젝트가 없을 때 첫 번째 주인공이 될 수 있는 유도 화면 제공

### 2. 프로젝트 상세 페이지 (`/projects/:id`)
- **6가지 탭 구성**:
  1. **개요 (Overview)**: 프로젝트 상세 설명, 스크린샷 갤러리, 태그, 단계(Public/Beta/Building), 구하고 있는 것(Looking for), 메이커 프로필 카드
  2. **피드백 (Feedback)**: 버그 리포트, 기능 제안, UX 개선, 찬사 리뷰 등록 및 1~5점 별점, 유저 공감 투표
  3. **업데이트 기록 (Timeline)**: 버전별 릴리즈 노트 타임라인 및 메이커 업데이트 추가 모달
  4. **팀원 & 모집 (Collaborators)**: 현재 팀원 목록 및 테스터/개발자 포지션 모집 공고, 1-클릭 지원 모달
  5. **인사이트 (Insights)**: 일별 조회수/좋아요 인터랙티브 차트, 트렌딩 순위 추이, 방문자 유입 경로(Referrer) 분석, 외부 홍보용 트래킹 링크(`https://zemit.app/go/:id`) 복사 기능
  6. **댓글 (Comments)**: 실시간 댓글 및 메이커 소통 스레드

### 3. 탐색 페이지 (`/explore`)
- 카테고리 필터 (SaaS, AI, Game, Developer Tools, Lifestyle, Community, Design, Productivity 등)
- 개발 단계 필터 (All, Public, Beta, Building)
- 정렬 옵션 (인기순, 최신 등록순, 좋아요순)

### 4. 빌더 페이지 (`/builders`)
- 메이커 디렉토리 및 프로필 카드
- Starting Member 및 역할 배지
- 기술 스택 태그 필터 (React, Next.js, TypeScript, AI, Game 등)
- 빌더 팔로우/언팔로우 연동

### 5. 커뮤니티 페이지 (`/community`)
- 카테고리별 포럼 (자유, 토론, 기능 제안, 새 런칭)
- 인기순(Trending) / 최신순(Recent) 정렬
- "새 글 작성 (New Thread)" 모달 및 답글(Reply) 토론 시스템

### 6. 내 활동 페이지 (`/activity`)
- Google 로그인 연동 상태 확인 및 프로필 정보
- 좋아요한 프로젝트 모아보기
- 팔로우한 프로젝트 및 빌더 모아보기

### 7. 새 프로젝트 등록 (`/projects/new`)
- 프로젝트 등록 폼 (제목, 한 줄 소개, 카테고리, 단계, Looking for 태그, 이미지, 상세 설명, URL)
- Cloudinary 연동 브라우저 직접 이미지 업로드 (로고 및 커버)
- **실시간 카드 미리보기 (Live Preview)**: 작성하면서 카드 UI가 어떻게 보일지 즉시 확인
- Google 로그인 시 자동으로 메이커 프로필 연계

### 8. 소개 페이지 (`/about`)
- zemit의 철학: "완성되지 않아도 괜찮습니다", "프로젝트가 계속 자라납니다", "축적되는 피드백"
- zemit만의 시간 감쇠 트렌딩 랭킹 알고리즘 설명
- 인터랙티브 FAQ 아코디언 (7개 핵심 질문 수록)

### 9. 전역 기능
- 🔐 **Google 간편 로그인 (Supabase OAuth)**: 원클릭 구글 계정 로그인 및 세션 동기화
- 🌓 **다크 모드 / 라이트 모드**: 완벽한 다크/라이트 테마 색상 지원
- 🌐 **한국어 / 영어 바이링구얼 전환**: 원클릭 언어 스위칭
- 🔍 **글로벌 검색 모달 (Ctrl+K / 돋보기 아이콘)**: 프로젝트, 빌더, 커뮤니티 통합 검색

---

## 🛠 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 로컬 미리보기
npm run preview
```

---

## 🗄️ Supabase 연동 설정

본 프로젝트는 Supabase 연동에 대응되도록 설계되어 있습니다.

### 환경 변수 등록 (`.env`)
```env
VITE_SUPABASE_URL=https://cjabctmwbvyystvbnpfg.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_96Pq2FDfLqs9C7LyWhy4_w_xprAIfuM
```

### Google OAuth 설정 (Supabase Dashboard)
1. [Supabase 대시보드](https://supabase.com/dashboard) -> Authentication -> Providers -> Google 활성화
2. Google Cloud Console Client ID / Secret 입력
3. URL Configuration에 `http://localhost:5173` 및 Vercel 도메인 등록

---

## ☁️ Cloudinary 이미지 업로드 (Unsigned 모드)

브라우저 프론트엔드에서 서버 없이 Cloudinary로 직접 이미지를 업로드할 수 있도록 세팅되어 있습니다.

- **Cloud Name**: `hesqv76c`
- **Upload Preset**: `zenit-hyun` (Unsigned 모드)
- **엔드포인트**: `https://api.cloudinary.com/v1_1/hesqv76c/image/upload`
- **유틸리티**: [`src/lib/cloudinary.ts`](./src/lib/cloudinary.ts) (`uploadImageToCloudinary(file)`)
- **컴포넌트**: [`src/components/ImageUploader.tsx`](./src/components/ImageUploader.tsx)
