// src/components/FirebaseErrorListener.tsx
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import type { FirestorePermissionError } from '@/firebase/errors';

// This is a client-side component that listens for permission errors
// and throws them as an uncaught exception. This is what allows the
// Next.js development overlay to display the rich error information.
// In a production build, this would do nothing.
export default function FirebaseErrorListener() {
  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      if (process.env.NODE_ENV === 'development') {
        // Throwing the error here will cause it to be caught by Next.js's
        // error overlay in development mode, which is exactly what we want.
        throw error;
      } else {
        // In production, you might want to log this to a service
        // like Sentry, but we won't throw it.
        console.error('Firestore Permission Error:', error.message);
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  return null; // This component doesn't render anything.
}
