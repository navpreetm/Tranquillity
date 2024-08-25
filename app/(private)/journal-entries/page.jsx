'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";

export default function JournalEntries() {

  const [user, loading, error] = useAuthState(auth);

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

  return (
    <div className="p-8">
      <h1 className="text-4xl">Journal Entries</h1>
      <p className="text-xl">Your journal entries will be displayed here.</p>
      <button onClick={createJournalEntry} className="bg-app-purple-500 text-white p-2 rounded-lg mt-4">Create New Journal Entry</button>
    </div>
  );
}