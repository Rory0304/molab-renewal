import React from "react";
import ProposePageHeader from "src/components/pages/Propose/ProposePageHeader";
import ProposeFormProvider from "src/context/ProposeFormProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ProjectLayoutProps {
  children: React.ReactNode;
}

//
//
//
const ProjectLayout: React.FC<ProjectLayoutProps> = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ProposeFormProvider>
      <div className="w-full">
        <ProposePageHeader />
        {children}
      </div>
    </ProposeFormProvider>
  );
};

export default ProjectLayout;
