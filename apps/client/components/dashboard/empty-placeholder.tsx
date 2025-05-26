import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

interface EmptyPlaceholderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export function EmptyPlaceholder({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyPlaceholderProps) {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-8 text-xl font-semibold">{title}</h3>
        <p className="mb-8 mt-2 text-sm text-muted-foreground">
          {description}
        </p>
        {buttonText && buttonLink && (
          <Link href={buttonLink}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}