import { ReactourStep } from "reactour";

export const PROPOSE_TUTORIAL_STEPS_SELECTORS = [
  "first-tutorial-step",
  "second-tutorial-step",
  "third-tutorial-step",
  "fourth-tutorial-step",
];

export const PROPOSE_TUTORIAL_STEPS: ReactourStep[] = [
  {
    content:
      "리빙랩 스튜디오에 오신 것을 환영합니다! 지금부터 프로젝트 생성 방법을 차근차근 알려드릴게요.",
  },
  {
    selector: `.${PROPOSE_TUTORIAL_STEPS_SELECTORS[0]}`,
    content: "프로젝트에 들어갈 필수 정보를 입력할 수 있습니다.",
  },
  {
    selector: `.${PROPOSE_TUTORIAL_STEPS_SELECTORS[1]}`,
    content:
      "공개/비공개 토글을 통해 유저에게 프로젝트 공개 여부를 설정할 수 있습니다.",
  },

  {
    selector: `.${PROPOSE_TUTORIAL_STEPS_SELECTORS[2]}`,
    content: "저장 버튼을 누르면 프로젝트의 수정 내용이 저장됩니다.",
  },

  {
    selector: `.${PROPOSE_TUTORIAL_STEPS_SELECTORS[3]}`,
    content:
      "저장 후, 미리보기를 통해 생성할 프로젝트의 페이지를 확인할 수 있습니다.",
  },
  {
    content: "이제 나만의 리빙랩 프로젝트를 만들어볼까요?",
  },
];
