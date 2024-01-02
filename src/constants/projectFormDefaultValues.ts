import { ProjectFormValues, ProjectStatus } from 'src/types/project';

export const PROJECT_FORM_DEFAULT_VALUES: ProjectFormValues = {
  payload: {
    uuid: '',
    title: '무제',
    thumbnail: null,
    siDo: '',
    siGunGu: '',
    projectStatus: ProjectStatus.ONGOING,
    isOpen: false,
    startDate: '',
    endDate: '',
    howTo: {
      content: '',
    },
    stepDetail: {
      definition: {
        content: '',
      },
      preparation: {
        content: '',
      },
      execution: { content: '' },
      completion: { content: '' },
    },
  },
};
