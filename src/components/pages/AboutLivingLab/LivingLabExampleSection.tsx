'use client';

import React from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from 'src/constants/styles/animation';

const LIVING_LAB_EXMPLES = [
  {
    title: '암스테르담 스마트시티',
    imageUrl: '/amsterdam.png',
    description:
      '암스테르담의 스마트시티 조성은 ASC라는 조직이 주도하고 있습니다. ASC에는 정부뿐만 아니라 민간 기업, 학교, 지역주민들이 몸담고 있습니다. 마이크 오식 홍보담당 책임은 “ASC는 다양한 이해관계자가 도시 문제를 해결하기 위해 각종 아이디어를 내고 실행하는 오픈 플랫폼”이라고 소개했습니다.',
  },
  {
    title: '북촌 리빙랩',
    imageUrl: '/bukchon.png',
    description:
      '북촌 리빙랩은 지역 주민이 문제 발굴부터 기술 실험 및 확산•적용까지\n리빙랩 과정 전반에서 주도적인 역할을 수행하고 있는 대표적인 케이스입니다.\n북촌 리빙랩은 사물인터넷 기술(IoT)을 주로 활용하고 있으며 지역 주민과 협업을 통해 지역의 문제를 해결하려는 점이 특징입니다.\n 특히 서울시에서 구성한 특별 그룹이 리빙랩을 총괄하는 중간지원조직 역할을 수행하고 있는 점이 특징입니다.',
  },
  {
    title: '성대골 리빙랩',
    imageUrl: '/sungdaegol.png',
    description:
      '성대골 리빙랩은 지역 주민의 에너지 문제에 집중하고 있는데, 에너지와 관련이 깊은 태양열 온풍기 설치 등 적정기술을 활용하고 있는 점이 특징입니다. 성대골 주민은 전환 협의체를 조직하고 리빙랩 운영을 총괄할 뿐만 아니라 자치구와의 의견 조율 및 재정적 지원을 얻는 중간지원조직 역할도 수행하고 있으므로, 커뮤니티가 스스로 조직화한 뒤 행정의 재정적•제도적 지원을 유도하는 형태로 운영되는 점이 특징입니다.',
  },
];

const LivingLabExampleSection: React.FC = () => {
  return (
    <section className="content-layout">
      <div>
        {LIVING_LAB_EXMPLES.map((example, index) => (
          <div
            className={`flex flex-col w-full pb-40 ${
              index % 2 === 0 ? 'items-start' : 'items-end'
            }`}
          >
            <div className="max-w-2xl">
              <h5 className="inline-block mb-5 text-3xl font-bold p-3 border-[3px] border-black shadow-[3px_5px_black]">
                {example.title}
              </h5>
              <p className="mb-10 text-lg text-gray-500">
                {example.description}
              </p>
              <motion.div
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="w-full relative shadow-2xl h-[400px] rounded-lg overflow-hidden"
              >
                <Image
                  fill
                  src={example.imageUrl}
                  alt={example.title}
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LivingLabExampleSection;
