"use client";

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';
import { Awareness } from 'y-protocols/awareness';
type UserAwareness = {
  name: string;
  color: string;
  clientId: number;
  cursor?: { anchor: number; head: number };
};

let ydoc: Y.Doc | null = null;
let wsProvider: WebsocketProvider | null = null;
let indexeddbProvider: IndexeddbPersistence | null = null;

export type YjsProviderOptions = {
  documentId: string;
  serverUrl: string;
  userName?: string;
  userColor?: string;
};

export const getYjsDoc = (): Y.Doc => {
  if (!ydoc) {
    ydoc = new Y.Doc();
  }
  return ydoc;
};

export const initYjsProvider = (options: YjsProviderOptions): {
  doc: Y.Doc;
  provider: WebsocketProvider;
  awareness: Awareness;
} => {
  const { documentId, serverUrl, userName = 'Anonymous', userColor = '#ff0000' } = options;

  const doc = getYjsDoc();

  // Cleanup existing connection
  if (wsProvider) {
    wsProvider.disconnect();
    wsProvider.destroy();
    wsProvider = null;
  }

  // Initialize new WebSocket provider
  wsProvider = new WebsocketProvider(serverUrl, documentId, doc, {
    connect: true,
  });

  // Initialize awareness with proper typing
  const awareness = wsProvider.awareness;
  awareness.setLocalStateField('user', {
    name: userName,
    color: userColor,
    clientId: doc.clientID,
  } as UserAwareness);

  // Setup offline persistence
  if (typeof window !== 'undefined') {
    indexeddbProvider = new IndexeddbPersistence(documentId, doc);
    indexeddbProvider.on('synced', () => {
      console.log('Content loaded from IndexedDB');
    });
  }

  return { doc, provider: wsProvider, awareness };
};

export const cleanupYjsProvider = () => {
  if (wsProvider) {
    wsProvider.disconnect();
    wsProvider.destroy();
    wsProvider = null;
  }
  
  if (ydoc) {
    ydoc.destroy();
    ydoc = null;
  }

  if (indexeddbProvider) {
    indexeddbProvider.clearData();
    indexeddbProvider = null;
  }
};

export const updateUserCursor = (anchor: number, head: number) => {
  if (!wsProvider) return;

  const awareness = wsProvider.awareness;
  const currentState = awareness.getLocalState() as UserAwareness | null;
  
  awareness.setLocalStateField('user', {
    ...currentState,
    cursor: { anchor, head }
  });
};