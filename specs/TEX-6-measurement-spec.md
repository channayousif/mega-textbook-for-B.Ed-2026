# Measurement Baseline Specification (TEX-6)

## 1. Event Schema (Google Analytics 4)

We need to capture events that answer our core business questions: which pages users land on, whether they reach the Licence track, and whether they interact with key features.

| Event Name | Trigger Condition | Parameters | Purpose |
| :--- | :--- | :--- | :--- |
| `page_view` | Standard GA4 trigger on page load | `page_location`, `page_title`, `language` (en/ur) | Track traffic across the two locales and identify top entry points. |
| `licence_track_view` | User views any page under `/licence/` | `course_code`, `unit_id` | Measure engagement with our primary sellable asset. |
| `app_platform_view` | User views any page under `/app/` | `user_status` (signed_in/anonymous) | Measure engagement with the learning platform. |
| `content_rating_submit` | User submits a rating/feedback on a content page | `rating_value` (1-5), `content_id` | Quantify content quality based on user feedback. |
| `resource_download` | User clicks to download a PDF or resource | `file_name`, `resource_type` | Measure engagement with downloadable content. |
| `checkout_begin` | *(Future)* User lands on a pricing or checkout page | `tier`, `currency` | Track top of the funnel for monetization. |

## 2. Ratings and Comments Surface Proposal

Currently, there is no way to measure the "quality of the educational content" or "visitor comments, reviews and ratings". We need a lightweight feedback surface at the bottom of every unit/topic page.

**UI/UX Specification:**
*   **Location:** At the bottom of `topic-NN.mdx` and `unit-assessment.mdx` pages, just before the footer.
*   **Design (Phase 1):** A simple "Was this page helpful?" component.
    *   Buttons: [Yes] [No]
    *   Upon clicking, it records the event (`content_rating_submit`).
    *   If [No] is clicked, a small optional text area appears: "How can we improve this?" (max 250 chars) + [Submit] button.
*   **Data Storage:** Supabase table `page_feedback` (columns: `id`, `page_path`, `helpful` (boolean), `comment` (text), `created_at`, `locale`).
*   **Implementation:** WebLead to build a React component (`<FeedbackWidget />`) and integrate it into the Docusaurus theme wrapper for documentation pages.

## 3. Weekly Dashboard Shape

The dashboard will be a weekly summary report (e.g., a Looker Studio report, or a simple Supabase dashboard/HTML page). For now, it should report the following metrics:

### Metric Baseline definitions:
1.  **Traffic (Sourced from GA4 / Search Console):**
    *   Total Weekly Visitors (English vs Urdu)
    *   Top 3 Landing Pages
    *   Search Console Impressions (Week over Week)
2.  **Content Quality & Reception (Sourced from Supabase `page_feedback`):**
    *   Total Feedback Submissions
    *   Positive Rating Percentage (Helpful / Total)
    *   Recent Comments (Last 5 verbatim comments)
3.  **Review-Backlog Burn-down (CurriculumLead Triage):**
    *   Number of Pending Content Feedback items
    *   Number of Resolved Items this week
4.  **Revenue vs Expenses (Manual / Accounting):**
    *   *Note: Until checkout is live, revenue is Rs 0.*
    *   Total Revenue: Rs 0
    *   Hosting / Operational Expenses: [Actual value from CEO]

---

**Next Actions for WebLead:**
- Implement GA4 initialization with the above event schema.
- Build the `<FeedbackWidget />` React component and Supabase `page_feedback` table.
