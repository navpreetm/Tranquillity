'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";

const JournalEntry = () => {
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);

  const [user, loading, error] = useAuthState(auth);
  const [note, setNote] = useState(null);

  useEffect(() => {
    // query firebase for note with id
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`, {
          headers: {
            'userId': user.uid
          },
        });
    
        const result = await response.json();
        setNote(result.note);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchNote();
    }
  }, [user]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="text-app-purple-700">
      <h1>Journal Entry {id}</h1>
      <p>Title: {note?.title}</p>
      <p>Body: {note?.body}</p>
    </div>
  );
};

export default JournalEntry;