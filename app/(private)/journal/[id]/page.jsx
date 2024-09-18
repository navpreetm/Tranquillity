'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
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
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [previousBody, setPreviousBody] = useState(null);

  const timeoutRef = useRef(null);

  const customSetIsUnsaved = (newVal) => {
    console.log("setting unsaved to " + newVal);
    setIsUnsaved(newVal);
  }

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
    customSetIsUnsaved(true);
  };

  // fetch note from firebase on user change
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
        customSetIsUnsaved(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      fetchNote();
    }
  }, [user]);

  // Save note to Firebase
  const saveNote = useCallback(async () => {
    if (!isUnsaved || !user) return; // No changes, no need to save

    try {
      await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'userId': user.uid
        },
        body: JSON.stringify({ 
          body: note.body,
          ai: note.ai,
          title: note.title 
        })
      });
      customSetIsUnsaved(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }, [note]);

  useEffect(() => {
    if (note && note.body && note.body !== previousBody) {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(saveNote, 5000);

      setPreviousBody(note.body);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [note]);

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