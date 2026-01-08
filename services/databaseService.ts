import { supabase } from './supabaseClient';
import { Reviewer, SubmissionReview, AssignmentStatus } from '../types';

export const databaseService = {
  // Reviewer operations
  async getReviewers(): Promise<Reviewer[]> {
    const { data, error } = await supabase
      .from('reviewers')
      .select('id, name, expertise')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  // Submission operations
  async getSubmissions(): Promise<any[]> {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Assignment operations
  async getAssignments(): Promise<SubmissionReview[]> {
    const { data, error } = await supabase
      .from('assignment_reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((assignment: any) => ({
      id: assignment.submission_id,
      title: '', // Will be filled by joining with submissions
      author: '',
      reviewerId: assignment.reviewer_id,
      assignmentStatus: assignment.assignment_status,
      scores: {
        originality: assignment.originality_score,
        methodology: assignment.methodology_score,
        relevance: assignment.relevance_score,
        scientificQuality: assignment.scientific_quality_score,
      },
      comments: assignment.comments,
    }));
  },

  async getAssignmentsWithDetails(): Promise<SubmissionReview[]> {
    const { data, error } = await supabase
      .from('assignment_reviews')
      .select(`
        *,
        submissions:submission_id (id, title, author)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((assignment: any) => ({
      id: assignment.submissions?.id || assignment.submission_id,
      title: assignment.submissions?.title || '',
      author: assignment.submissions?.author || '',
      reviewerId: assignment.reviewer_id,
      assignmentStatus: assignment.assignment_status,
      scores: {
        originality: assignment.originality_score,
        methodology: assignment.methodology_score,
        relevance: assignment.relevance_score,
        scientificQuality: assignment.scientific_quality_score,
      },
      comments: assignment.comments,
    }));
  },

  async getAssignmentsForReviewer(reviewerId: string): Promise<SubmissionReview[]> {
    const { data, error } = await supabase
      .from('assignment_reviews')
      .select(`
        *,
        submissions:submission_id (id, title, author)
      `)
      .eq('reviewer_id', reviewerId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map((assignment: any) => ({
      id: assignment.submissions?.id || assignment.submission_id,
      title: assignment.submissions?.title || '',
      author: assignment.submissions?.author || '',
      reviewerId: assignment.reviewer_id,
      assignmentStatus: assignment.assignment_status,
      scores: {
        originality: assignment.originality_score,
        methodology: assignment.methodology_score,
        relevance: assignment.relevance_score,
        scientificQuality: assignment.scientific_quality_score,
      },
      comments: assignment.comments,
    }));
  },

  async assignReviewer(submissionId: string, reviewerId: string): Promise<void> {
    const { data: existing, error: checkError } = await supabase
      .from('assignment_reviews')
      .select('id')
      .eq('submission_id', submissionId)
      .eq('reviewer_id', reviewerId)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existing) {
      const { error } = await supabase
        .from('assignment_reviews')
        .update({ assignment_status: 'ASSIGNED' })
        .eq('submission_id', submissionId)
        .eq('reviewer_id', reviewerId);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('assignment_reviews')
        .insert({
          submission_id: submissionId,
          reviewer_id: reviewerId,
          assignment_status: 'ASSIGNED',
        });

      if (error) throw error;
    }
  },

  async updateAssignmentStatus(submissionId: string, reviewerId: string, status: AssignmentStatus): Promise<void> {
    const { error } = await supabase
      .from('assignment_reviews')
      .update({ assignment_status: status })
      .eq('submission_id', submissionId)
      .eq('reviewer_id', reviewerId);

    if (error) throw error;
  },

  async submitReview(
    submissionId: string,
    reviewerId: string,
    scores: { originality: number; methodology: number; relevance: number; scientificQuality: number },
    comments: string
  ): Promise<void> {
    const { error } = await supabase
      .from('assignment_reviews')
      .update({
        originality_score: scores.originality,
        methodology_score: scores.methodology,
        relevance_score: scores.relevance,
        scientific_quality_score: scores.scientificQuality,
        comments,
        assignment_status: 'COMPLETED',
        updated_at: new Date().toISOString(),
      })
      .eq('submission_id', submissionId)
      .eq('reviewer_id', reviewerId);

    if (error) throw error;
  },
};
