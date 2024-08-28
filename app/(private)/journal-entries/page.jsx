'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function JournalEntries() {

  const [user, loading, error] = useAuthState(auth);
  const [notes, setNotes] = useState([]);

  const createJournalEntry = async () => {
    // create a new journal entry
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'userId': user.uid
      },
      body: JSON.stringify({})
    });

    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes', {
          headers: {
            'userId': user.uid
          }
        });

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchNotes();
    }
  }, [user]);

  if (loading) return <h1>Loading user...</h1>

  return (
    <div className="p-8">
      <h1 className="text-4xl">Journal Entries</h1>
      <p className="text-xl">Your journal entries will be displayed here.</p>

      {notes?.map((note) => (
        <Link href={`/journal/${note.id}`} key={note.id}>
          <div className="bg-app-purple-200 p-2 rounded-lg mt-4">
            <h2 className="text-2xl">{note.title}</h2>
            <p>{note.body}</p>
          </div>
        </Link>
      ))}

      <button onClick={createJournalEntry} className="bg-app-purple-500 text-white p-2 rounded-lg mt-4">Create New Journal Entry</button>
    </div>
  );
}