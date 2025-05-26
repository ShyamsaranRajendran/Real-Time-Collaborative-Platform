import { DocumentEditor } from '@/components/editor/document-editor';
import { AuthRequired } from '@/components/auth-required';

interface DocumentPageProps {
  params: {
    id: string;
  };
}

export default function DocumentPage({ params }: DocumentPageProps) {
  return (
    <AuthRequired>
      <div className="container mx-auto py-6">
        <DocumentEditor documentId={params.id} />
      </div>
    </AuthRequired>
  );
}