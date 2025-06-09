"use client";

import { useEffect, useState, useCallback } from 'react';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent } from '@tiptap/react';
import * as Y from 'yjs';

import { EditorToolbar } from './editor-toolbar';
import { UserPresence } from './user-presence';
import { initYjsProvider, cleanupYjsProvider } from '@/lib/utils/yjs-provider';
import { useAuth } from '@/components/auth-provider';
import { Card } from '@/components/ui/card';

interface DocumentEditorProps {
  documentId: string;
  initialTitle?: string;
}

export function DocumentEditor({ documentId, initialTitle = 'Untitled Document' }: DocumentEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [isSaving, setIsSaving] = useState(false);
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [editor, setEditor] = useState<Editor | null>(null);
  const { user } = useAuth();
  
  const websocketUrl = 'ws://localhost:3001';

  const getRandomColor = useCallback(() => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', 
      '#009688', '#4caf50', '#8bc34a', '#cddc39', 
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    if (!documentId || !user) return;

    let isMounted = true;
    let editorInstance: Editor | null = null;
    let provider: any = null;
    let awareness: any = null;

    const initEditor = async () => {
      try {
        const { doc, provider: yProvider, awareness: yAwareness } = initYjsProvider({
          documentId,
          serverUrl: websocketUrl,
          userName: user.name,
          userColor: getRandomColor(),
        });

        provider = yProvider;
        awareness = yAwareness;

        const updateActiveUsers = () => {
          if (!isMounted) return;
          const states = awareness.getStates();
          const users = (Array.from(states.entries()) as [any, any][]).map(
            ([clientId, state]) => ({
              clientId,
              name: (state as any)?.user?.name ?? (state as any)?.name,
              color: (state as any)?.user?.color ?? (state as any)?.color,
            })
          ).filter(user => user.name && user.color);
          
          setActiveUsers(users);
        };

        awareness.on('change', updateActiveUsers);
        updateActiveUsers(); // Initial update

        editorInstance = new Editor({
          extensions: [
            StarterKit.configure({ history: false }),
            Placeholder.configure({
              placeholder: 'Start writing your document...',
            }),
            Collaboration.configure({ document: doc }),
            CollaborationCursor.configure({
              provider: yProvider,
              user: {
                name: user?.name || 'Anonymous',
                color: getRandomColor(),
              },
            }),
          ],
          editorProps: {
            attributes: {
              class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none',
            },
          },
        });

        if (isMounted) {
          setEditor(editorInstance);
        }
      } catch (error) {
        console.error('Error initializing editor:', error);
      }
    };

    initEditor();

    return () => {
      isMounted = false;
      
      // Cleanup in the correct order
      if (awareness) {
        awareness.off('change');
      }

      if (editorInstance) {
        editorInstance.destroy();
      }

      // Add a small delay to ensure all transactions are complete
      setTimeout(() => {
        if (provider) {
          cleanupYjsProvider();
        }
      }, 100);
    };
  }, [documentId, user, getRandomColor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  if (!editor) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="flex flex-col w-full min-h-[calc(100vh-8rem)] shadow-md">
      <div className="flex items-center p-4 border-b">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="flex-grow text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 mr-4"
          placeholder="Untitled Document"
        />
        <div className="flex items-center">
          {isSaving ? (
            <span className="text-xs text-muted-foreground">Saving...</span>
          ) : (
            <span className="text-xs text-muted-foreground">All changes saved</span>
          )}
        </div>
      </div>
      
      <EditorToolbar editor={editor} />
      
      <div className="flex-grow p-4 md:p-8 overflow-auto">
        <EditorContent editor={editor} className="min-h-[calc(100vh-16rem)]" />
      </div>
      
      <div className="border-t p-2">
        <UserPresence users={activeUsers} />
      </div>
    </Card>
  );
}