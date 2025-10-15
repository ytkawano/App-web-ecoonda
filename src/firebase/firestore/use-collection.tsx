'use client';

import { useState, useEffect } from 'react';
import type { Query, DocumentData, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection<T>(query: Query<T> | null | undefined) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firestore || !query) {
      setLoading(false);
      setData(null);
      return;
    }

    setLoading(true);

    const unsubscribe: Unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setData(items);
        setLoading(false);
        setError(null);
      },
      async (err) => {
        console.error(err);
        const permissionError = new FirestorePermissionError({
          path: (query as any)._path?.toString() || 'unknown path',
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setLoading(false);
        setData(null);
      }
    );

    return () => unsubscribe();
  }, [firestore, query]);

  return { data, loading, error };
}
