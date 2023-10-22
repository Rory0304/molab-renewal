"use client";

import React from "react";
import dynamic from "next/dynamic";
import { PROPOSE_TUTORIAL_STEPS } from "src/constants/proposeTutorial";

const ReactTour = dynamic(() => import("reactour"), { ssr: false });

const LIVING_LAB_STUDIO_VISITED = 'living_lab_studio_visited';

const ProjectTutorial: React.FC = () => {
  const accentColor = "#32b5ed";
  const [isTourOpen, setIsTourOpen] = React.useState(false);

  // Show tutorial if user is first visiter to living lab studio
  React.useEffect(() => {
    const isVisited = localStorage.getItem(LIVING_LAB_STUDIO_VISITED);
    if(!isVisited){
        setIsTourOpen(true)
        localStorage.setItem(LIVING_LAB_STUDIO_VISITED, "true")
    }
  }, [])

  //
  //
  //
  const handleTourClose = () => {
    setIsTourOpen(false);
  };

  return (
    <ReactTour
      steps={PROPOSE_TUTORIAL_STEPS}
      isOpen={isTourOpen}
      onRequestClose={handleTourClose}
      accentColor={accentColor}
    />
  );
};

export default ProjectTutorial;
