'use client';

import React from 'react';
import { usePathname } from 'next/navigation'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";

const JournalEntry = () => {
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);

  const [user, loading, error] = useAuthState(auth);

  // query firebase for note with id

  const getNote = async () => {
    const response = await fetch(`/api/notes/`, {
      headers: {
        'userId': user.uid
      },
      body: JSON.stringify({ id })
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <h1>Journal Entry {id}</h1>
    </div>
  );
};

export default JournalEntry;