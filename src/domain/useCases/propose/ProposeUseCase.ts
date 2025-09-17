import { SupabaseClient } from '@supabase/supabase-js';
import { ProjectFormValues } from 'src/data/types';
import { ProposeRepository } from 'src/domain/repositories/propose/ProposeRepository';

export class ProposeUseCase {
  private proposeRepository: ProposeRepository;

  constructor(client?: SupabaseClient) {
    this.proposeRepository = new ProposeRepository(client);
  }

  async createPropose(uuid: string, userId: string) {
    return await this.proposeRepository.createPropose(uuid, userId);
  }

  async uploadProposeImage(fileName: string, file?: File | null) {
    return await this.proposeRepository.uploadProposeImage(fileName, file);
  }

  async updatePropose(uuid: string, proposeData: ProjectFormValues) {
    return await this.proposeRepository.updatePropose(uuid, proposeData);
  }

  async paginateMyProposeList(props: {
    userId: string;
    offset: number;
    pageCount: number;
  }) {
    return await this.proposeRepository.paginateMyProposeList(props);
  }

  async deleteProposeById(projectId: string) {
    return await this.proposeRepository.deleteProposeById(projectId);
  }

  async fetchProposeById(projectId: string) {
    return await this.proposeRepository.fetchProposeById(projectId);
  }

  async paginateProposeList(props: {
    offset: number;
    pageCount: number;
    siDo?: string;
    siGunGu?: string;
  }) {
    return await this.proposeRepository.paginateProposeList(props);
  }
}
