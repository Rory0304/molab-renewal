'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import Link from 'next/link';
import ConditionalRouterLink from 'src/components/blocks/ConditionalRouterLink/ConditionalRouterLink';
import { PROPOSE_TUTORIAL_STEPS_SELECTORS } from 'src/constants/proposeTutorial';
import useUnsaveModal from 'src/hooks/useUnsaveModal';
import type { ProjectFormValues } from 'src/types/project';

const ProjectEidtorHeader: React.FC = () => {
  const {
    formState: { isDirty, defaultValues },
  } = useFormContext<ProjectFormValues>();

  const { handleModalOpen } = useUnsaveModal();

  const projectTitle = defaultValues?.payload?.title;
  const projecStatus = defaultValues?.payload?.isOpen;
  const projectId = defaultValues?.payload?.uuid;

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-sm">
      <nav className="mx-auto px-8 flex items-center justify-between py-6 max-h-[var(--sticky-header-height)]">
        <div className="flex">
          <span className="text-xl font-black">Living Lab Studio</span>
        </div>
        <div className="flex items-center justify-center lg:flex-1">
          <ConditionalRouterLink
            href="/myproject"
            when={isDirty}
            className="bold btn-link btn-neutral"
            callback={() => handleModalOpen()}
          >
            내 프로젝트
          </ConditionalRouterLink>
          {/* [TODO] REFACTOR THIS WITH "AFTER" */}
          <span className="px-2">/</span>
          <strong>{projectTitle}</strong>
          <span className="ml-2 badge badge-primary">
            {projecStatus ? '공개' : '비공개'}
          </span>
        </div>
        <div className="flex lg:justify-end">
          <Link
            href={{
              pathname: `/communication/${projectId}`,
              query: { preview: 'Y' },
            }}
            target="_blank"
            rel="noreferrer noopener"
            className={`${PROPOSE_TUTORIAL_STEPS_SELECTORS[3]} mr-2 no-animation btn btn-outline btn-primary`}
          >
            미리보기
          </Link>
          <ConditionalRouterLink
            href="/myproject"
            when={isDirty}
            className="no-animation btn btn-ghost btn-primary"
            callback={() => handleModalOpen()}
          >
            나가기
          </ConditionalRouterLink>
        </div>
      </nav>
    </header>
  );
};

export default ProjectEidtorHeader;
