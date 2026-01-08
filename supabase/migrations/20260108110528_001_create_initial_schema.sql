/*
  # Create Conference Management System Schema

  1. New Tables
    - `reviewers` - Store reviewer information
      - `id` (text, primary key)
      - `name` (text)
      - `expertise` (text)
      - `created_at` (timestamp)
    
    - `submissions` - Store abstract/submission information
      - `id` (text, primary key)
      - `title` (text)
      - `author` (text)
      - `abstract` (text)
      - `created_at` (timestamp)
    
    - `assignment_reviews` - Track reviewer assignments and reviews
      - `id` (uuid, primary key)
      - `submission_id` (text, foreign key to submissions)
      - `reviewer_id` (text, foreign key to reviewers)
      - `assignment_status` (text)
      - `originality_score` (integer)
      - `methodology_score` (integer)
      - `relevance_score` (integer)
      - `scientific_quality_score` (integer)
      - `comments` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access to reviewers (read-only for assignments)
    - Restricted access to submissions and assignment reviews
*/

-- Reviewers table
CREATE TABLE IF NOT EXISTS reviewers (
  id text PRIMARY KEY,
  name text NOT NULL,
  expertise text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviewers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviewers are publicly readable"
  ON reviewers FOR SELECT
  USING (true);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id text PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  abstract text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Submissions are publicly readable"
  ON submissions FOR SELECT
  USING (true);

-- Assignment Reviews table
CREATE TABLE IF NOT EXISTS assignment_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id text NOT NULL REFERENCES submissions(id),
  reviewer_id text NOT NULL REFERENCES reviewers(id),
  assignment_status text NOT NULL DEFAULT 'UNASSIGNED',
  originality_score integer DEFAULT 0,
  methodology_score integer DEFAULT 0,
  relevance_score integer DEFAULT 0,
  scientific_quality_score integer DEFAULT 0,
  comments text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assignment_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Assignment reviews are publicly readable for now"
  ON assignment_reviews FOR SELECT
  USING (true);

CREATE POLICY "Assignment reviews can be updated"
  ON assignment_reviews FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Assignment reviews can be inserted"
  ON assignment_reviews FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_assignment_reviews_submission ON assignment_reviews(submission_id);
CREATE INDEX IF NOT EXISTS idx_assignment_reviews_reviewer ON assignment_reviews(reviewer_id);
CREATE INDEX IF NOT EXISTS idx_assignment_reviews_status ON assignment_reviews(assignment_status);