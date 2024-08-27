'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseApp";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

const JournalEntry = () => {
  const pathname = usePathname();
  const id = pathname.substring(pathname.lastIndexOf('/') + 1);

  const [user, loading, error] = useAuthState(auth);
  const [note, setNote] = useState(null);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleEditorChange = (newVal) => {
    setNote({
      ...note,
      body: newVal
    });
  };

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

  if (loading) return <h1>Loading user...</h1>;

  if (!note) return <h1>Note is loading...</h1> 

  return (
      <div className="h-full flex items-center flex-col overflow-hidden">
        <div className="m-2 flex flex-col items-center text-2xl text-center text-app-purple-700">
          <span className="">
            {note.title}
          </span>
        </div>
        <div className="h-full w-full">
          <QuillEditor
            value={note.body}
            onChange={handleEditorChange}
            modules={quillModules}
            formats={quillFormats}
            className="w-full h-full bg-app-purple-200"
          />
        </div>
      </div>
  );
};

export default JournalEntry;