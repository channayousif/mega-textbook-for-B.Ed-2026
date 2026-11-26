import React from 'react';
import Layout from '@theme/Layout';
import AppDashboardShell from '@site/src/components/AppDashboardShell';
import { NotesContent } from '@site/src/pages/app/dashboard/notes';

/**
 * Teacher Notes (Feature 034 T019, #806): the same private notes list students have, for
 * teachers. Notes written in the floating notes widget on textbook pages land here. RLS
 * (migration 0058) keeps every row private to its author.
 */
export default function TeacherNotesPage(): React.ReactElement {
  return (
    <Layout title="Notes">
      <AppDashboardShell role="teacher">
        <NotesContent />
      </AppDashboardShell>
    </Layout>
  );
}
