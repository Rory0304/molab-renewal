'use client';

import React from 'react';
import { useMedia } from 'react-use';

import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ProjectEidtorHeader,
  ProposeProjectDetailEditor,
  ProposeProjectInformationEditor,
  ProposeProjectParticipationEditor,
  ProposeProjectToc,
  ProposeUnsaveModal,
} from 'src/components/pages';
import ProjectTutorial from 'src/components/pages/Project/Tutorial/ProjectTutorial';
import { PROJETC_DETAIL_STEP } from 'src/constants/projectSteps';
import { ProduceStepType } from 'src/types/common';

const ProposeDetailPage = ({ params }: { params: { slug: string[] } }) => {
  const router = useRouter();
  const [projectId, currentStep, currentStepItem] = params.slug;

  const isTabletOrSmaller = useMedia('(max-width: 768px)');

  const renderProposeFormSection = React.useCallback(
    (type: ProduceStepType) => {
      switch (type) {
        case 'base':
          return <ProposeProjectInformationEditor />;

        case 'participation':
          return <ProposeProjectParticipationEditor />;

        case 'detail':
          const step = params.slug?.[2] || PROJETC_DETAIL_STEP[0].key;
          return <ProposeProjectDetailEditor currentStep={step} />;

        default:
          router.push(`/project/${projectId}/base`);
          return null;
      }
    },
    []
  );

  if (isTabletOrSmaller) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen content-layout">
        <ExclamationCircleIcon width={32} height={32} />
        <strong className="mb-3 text-center">
          데스크탑 환경에서 이용해주세요.
        </strong>
        <Link href="/" className="btn btn-primary ">
          홈으로
        </Link>
      </div>
    );
  }
  return (
    <div>
      <ProjectEidtorHeader />
      <div className="relative flex w-full overflow-auto h-[calc(100vh-var(--sticky-header-height))]">
        <ProposeProjectToc currentStep={currentStepItem || currentStep} />
        <div className="w-full">
          <form className="relative flex flex-col p-10">
            {renderProposeFormSection(currentStep as ProduceStepType)}
            <ProjectTutorial />
          </form>
        </div>
      </div>
      <ProposeUnsaveModal />
    </div>
  );
};

export default ProposeDetailPage;
