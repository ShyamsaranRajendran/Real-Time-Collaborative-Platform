"use client";

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { IndexeddbPersistence } from 'y-indexeddb';

// Singleton pattern for the YJS document
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
} => {
  const { documentId, serverUrl, userName = 'Anonymous', userColor = '#ff0000' } = options;

  // Get or initialize the shared document
  const doc = getYjsDoc();

  // Close any existing connection
  if (wsProvider) {
    wsProvider.disconnect();
    wsProvider = null;
  }

  // Connect to the WebSocket server
  wsProvider = new WebsocketProvider(serverUrl, documentId, doc, {
    connect: true,
  });

  // Set initial user state for awareness
  wsProvider.awareness.setLocalState({
    name: userName,
    color: userColor,
    clientId: doc.clientID,
  });

  // Set up offline persistence
  if (typeof window !== 'undefined') {
    indexeddbProvider = new IndexeddbPersistence(documentId, doc);
    
    indexeddbProvider.on('synced', () => {
      console.log('Content from IndexedDB loaded');
    });
  }

  return { doc, provider: wsProvider };
};

export const cleanupYjsProvider = () => {
  if (wsProvider) {
    wsProvider.disconnect();
    wsProvider = null;
  }
  
  if (ydoc) {
    ydoc.destroy();
    ydoc = null;
  }

  if (indexeddbProvider) {
    indexeddbProvider.destroy();
    indexeddbProvider = null;
  }
};

export const getAwareness = () => {
  if (!wsProvider) {
    throw new Error('WebSocket provider not initialized');
  }
  return wsProvider.awareness;
};

export const updateUserCursor = (anchor: number, head: number) => {
  if (!wsProvider) {
    return;
  }
  
  const awareness = wsProvider.awareness;
  const currentState = awareness.getLocalState() || {};
  
  awareness.setLocalState({
    ...currentState,
    cursor: { anchor, head }
  });
};