import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Document } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Share2, MoreHorizontal, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Link key={doc.id} href={`/docs/${doc.id}`} className="transition-all">
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center text-lg font-medium line-clamp-1">
                <FileText className="mr-2 h-4 w-4" />
                {doc.title || 'Untitled Document'}
              </CardTitle>
              <CardDescription className="flex justify-between items-center">
                <span>
                  Updated {formatDistanceToNow(new Date(doc.updatedAt))} ago
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="h-24 overflow-hidden text-sm text-muted-foreground">
                {/* This would render a preview of the document content */}
                {doc.content ? (
                  <div className="line-clamp-4">Content preview would go here</div>
                ) : (
                  <div className="italic">No content</div>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 flex justify-between border-t bg-muted/20">
              <div className="flex items-center">
                <UserCircle2 className="h-4 w-4 mr-1" />
                <span className="text-xs text-muted-foreground">
                  You
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {doc.isPublic && (
                  <Badge variant="outline" className="text-xs">Public</Badge>
                )}
                {doc.collaborators && doc.collaborators.length > 0 && (
                  <div className="flex items-center">
                    <Share2 className="h-3 w-3 mr-1" />
                    <span className="text-xs text-muted-foreground">
                      Shared with {doc.collaborators.length}
                    </span>
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}