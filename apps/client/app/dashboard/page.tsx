import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { DocumentList } from '@/components/dashboard/document-list';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';
// import { AuthRequired } from '@/components/auth-required';

export default function DashboardPage() {
  // In a real app, we would fetch documents from the API
  // For now, we'll use empty state to demonstrate the UI
  const documents: any[] = [];

  return (
    // <AuthRequired>
      <DashboardShell>
        <DashboardHeader heading="Documents" text="Create and manage your collaborative documents.">
        </DashboardHeader>
        <div className="grid gap-8">
          {documents.length > 0 ? (
            <DocumentList documents={documents} />
          ) : (
            <EmptyPlaceholder
              title="Create your first document"
              description="Get started by creating a new collaborative document."
              buttonText="Create Document"
              buttonLink="/docs/new"
            />
          )}
        </div>
      </DashboardShell>
    // </AuthRequired>
  );
}