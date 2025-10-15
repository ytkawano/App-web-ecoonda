'use client';

import React, { ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: ReactNode;
  value: {
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  };
}

export default function FirebaseClientProvider({ children, value }: FirebaseClientProviderProps) {
  // By using this client provider at the root, we ensure that Firebase is
  // initialized only once on the client-side.
  return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}
