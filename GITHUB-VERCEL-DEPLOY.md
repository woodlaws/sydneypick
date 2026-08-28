# GitHub + Vercel 배포 안내

## 1. GitHub 저장소 만들기

1. GitHub에서 새 저장소를 만듭니다.
2. 저장소 이름은 `sydney-pick`을 권장합니다.
3. 이 폴더 안의 파일을 저장소 최상위에 모두 업로드합니다.
4. 기본 브랜치는 `main`으로 설정합니다.

터미널을 사용하는 경우:

```bash
git init
git add .
git commit -m "Initial Sydney Pick website"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/sydney-pick.git
git push -u origin main
```

## 2. Vercel에 연결하기

1. Vercel 대시보드에서 **Add New → Project**를 선택합니다.
2. 방금 만든 GitHub 저장소를 Import합니다.
3. 프로젝트 설정은 다음과 같이 확인합니다.

   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: 비워두거나 기본값 사용

4. **Deploy**를 누릅니다.

`vercel.json`이 포함되어 있으므로 빌드 명령과 출력 폴더는 자동 인식됩니다.

## 3. 자동 배포

- `main` 브랜치에 push하면 프로덕션 배포가 자동 실행됩니다.
- 다른 브랜치나 Pull Request는 미리보기 배포가 생성됩니다.
- API 키나 환경변수는 필요하지 않습니다.

## 4. 도메인 연결

Vercel 프로젝트의 **Settings → Domains**에서 `sydneypick.com`을 추가한 뒤, Vercel이 안내하는 DNS 레코드를 도메인 관리 서비스에 등록합니다.

도메인 연결 후 다음 주소를 확인합니다.

- `https://sydneypick.com/`
- `https://sydneypick.com/robots.txt`
- `https://sydneypick.com/sitemap.xml`
- `https://sydneypick.com/public/og.png`

## 5. 공개 접근 점검

- 로그아웃 상태 또는 시크릿 창에서 메인페이지가 열리는지 확인합니다.
- `robots.txt`와 `sitemap.xml`이 로그인 없이 열리는지 확인합니다.
- 검색엔진 크롤러가 로그인 페이지로 리디렉션되지 않는지 확인합니다.
- 일정, 지역별 픽, 여행 준비, 쇼핑픽, 픽 매거진 섹션 링크가 정상 이동하는지 확인합니다.

## 현재 확인된 공개 주소

https://sydney-pick-travel.vercel.app/
