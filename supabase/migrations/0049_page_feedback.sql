-- Create page_feedback table
CREATE TABLE IF NOT EXISTS public.page_feedback (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path text NOT NULL,
    helpful boolean NOT NULL,
    comment text,
    locale text DEFAULT 'en' NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.page_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert feedback
CREATE POLICY "Allow public insert to page_feedback" 
ON public.page_feedback FOR INSERT 
TO public
WITH CHECK (true);

-- Only admins/curriculum owners can view feedback (for the dashboard)
-- Here we'll just let authenticated users read for simplicity or restrict it if there's an admin role.
-- If no select policy is provided, default deny is fine for visitors. We'll add a service_role select if needed.
