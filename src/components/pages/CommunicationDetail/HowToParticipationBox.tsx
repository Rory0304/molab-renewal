import React from 'react';

import type { Content } from 'src/types/project';

interface HowToParticipationBoxProps {
  content: Content;
}

const HowToParticipationBox: React.FC<HowToParticipationBoxProps> = ({
  content,
}) => {
  return (
    <section className="flex flex-col my-10">
      <h4 className="mb-4 text-2xl font-semibold text-neutral-600">
        참여 방법
      </h4>
      <div className="p-4 border rounded-lg border-neutral-300">
        {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
      </div>
    </section>
  );
};

export default HowToParticipationBox;
