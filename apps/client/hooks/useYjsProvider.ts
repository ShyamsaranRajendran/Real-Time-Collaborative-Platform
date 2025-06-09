// "use client";

// import { useEffect, useState } from 'react';
// import { initYjsProvider, cleanupYjsProvider, YjsProviderOptions } from '@/lib/utils/yjs-provider';

// export const useYjsProvider = (options: YjsProviderOptions) => {
//   const [provider, setProvider] = useState<ReturnType<typeof initYjsProvider> | null>(null);

//   useEffect(() => {
//     const { doc, provider, awareness } = initYjsProvider(options);
//     setProvider({ doc, provider, awareness });

//     return () => {
//       cleanupYjsProvider();
//     };
//   }, [options.documentId, options.serverUrl]);

//   return provider;
// };