import { SupabaseClient } from '@supabase/supabase-js';
import { ReviewRepository } from 'src/repositories/review/ReviewRepository';

export class ReviewUseCase {
  private reviewRepository: ReviewRepository;

  constructor(client?: SupabaseClient) {
    this.reviewRepository = new ReviewRepository(client);
  }

  async fetchReviewById(uuid: string) {
    return await this.reviewRepository.fetchReviewById({ uuid });
  }

  /**
   *
   */
  async fetchReviewList(props: {
    select: string;
    offset: number;
    pageCount: number;
    projectId?: string;
  }) {
    return await this.reviewRepository.fetchReviewList(props);
  }

  async uploadReview(props: {
    projectId: string;
    uuid: string;
    content: string;
    userId: string;
    imageFile?: File;
  }) {
    return await this.reviewRepository.uploadReview(props);
  }
}
