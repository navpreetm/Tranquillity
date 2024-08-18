import React from 'react';
import { useRouter } from 'next/navigation';

const JournalEntry = () => {
  const router = useRouter();
  const { id } = router.query;  // `id` will be whatever was in the URL

  return (
    <div>
      <h1>Journal Entry {id}</h1>
      <p>This is the content for journal entry with ID: {id}.</p>
    </div>
  );
};

export default JournalEntry;