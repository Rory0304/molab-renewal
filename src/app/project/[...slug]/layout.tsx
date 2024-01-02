import React from 'react';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjectProvider from 'src/context/ProjectProvider';

interface ProjectLayoutProps {
  children: React.ReactNode;
}

//
//
//
const ProjectLayout: React.FC<ProjectLayoutProps> = async ({ children }) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <ProjectProvider>
      <div className="w-full">{children}</div>
    </ProjectProvider>
  );
};

export default ProjectLayout;
