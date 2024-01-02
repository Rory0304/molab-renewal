import { Camelized } from 'humps';
import type { Row } from 'src/types/supabase';

export enum ProjectStatus {
  ONGOING = 'Ongoing',
  D_DAY = 'D-day',
  ENDED = 'Ended',
}

export type Proposetype = Camelized<Row<'Propose'>>;

export type Content = string | null;

export interface ProjectContent {
  id?: number;
  uuid: string;
  title: string;
  thumbnail?: FileList | null;
  siDo: string;
  siGunGu: string;
  projectStatus: ProjectStatus;
  isOpen: boolean;
  startDate: string;
  endDate: string;
  howTo: {
    content: Content;
  };
  stepDetail: {
    definition: {
      content: Content;
    };
    preparation: {
      content: Content;
    };
    execution: { content: Content };
    completion: { content: Content };
  };
}

export interface ProjectFormValues {
  payload: ProjectContent;
  isFetching?: boolean;
  refetch?: () => void;
}
