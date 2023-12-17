# MOLAB
> MOLAB(모두의 리빙랩)은 국내 스마트시티 커뮤니티 플랫폼입니다.
> 한국의 스마트시티 프로젝트는 시민 참여가 부족하다는 문제점을 해결해보고자 시작한, 스마트시티 분야의 네트워킹을 지원하는 웹 플랫폼입니다.


## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Usage](#usage)
* [Room for Improvement](#room-for-improvement)


## Technologies Used
- next - v13.4.12
- wysiwyg - v1.15.0
- react - v18.2.0
- react-hook-form - v7.45.1
- tailwind - v3.3.2
- typescript - v5.1.3
- tanstack/react-query - v4.23.6
- supabase - latest


## Features
1) Living Lab Studio: 시민 대상 리빙랩 프로젝트를 쉽게 생성 할 수 있도록 개발한 React-Hook-Form과 wysiwyg 기반 에디터입니다.
2) 리빙랩 프로젝트 검색: 지자체와 시민이 올린 리빙랩 프로젝트를 키워드/카테고리 별로 검색하고 참여 후기를 작성할 수 있습니다.


## Usage
### Convension
- Commit Message: `<Category>(<Directory or FileName>)/<Description>`
- Branch Name: `<Category>/<Description>`
- Category:
  ```
  - feat: 기능 개발 (api 패치, 컴포넌트 개발 포함)
  - styles: 스타일에 관한 내용
  - chore: config, env, 패키지에 관한 내용
  - refactor: 리팩토링 관한 내용
  - migrate: 코드 마이그레이션에 관한 내용
  - fix: 버그 픽스에 관한 내용
  ```

### Directory
```
src
 ┣ app
 ┃ ┗ not-found: 404 페이지
 ┃ ┗ about-livinglab: 리빙랩 소개 페이지
 ┃ ┗ auth: supabase 기반 auth 설정 GET 요청 처리부
 ┃ ┗ api: 각종 api 스펙
 ┃ ┗ communication: 열린 참여 메인 / 디테일 페이지
 ┃ ┗ login: 로그인 / 회원가입 페이지
 ┃ ┗ mypage: 마이 페이지
 ┃ ┗ notice: 공고 메인 / 디테일 페이지
 ┃ ┗ project: 리빙랩 스튜디오 페이지
 ┣ components
 ┃ ┗ blocks: 전체 페이지에서 사용하게 될 공통 컴포넌트 parts
 ┃ ┗ icons: 아이콘
 ┃ ┗ pages: 개별 페이지에서 사용하게될 컴포넌트
 ┣ constants
 ┃ ┗ styles: tailwind 스타일 theme
 ┣ context: React.Context 관리
 ┣ hooks
 ┣ store: atom 관리
 ┣ types
 ┣ utils
 ┗ package.json
```

## Room for Improvement
To do
- Study Serverless functions and migrate with supabase
- Need to fix some private routers 
