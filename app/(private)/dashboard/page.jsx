"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebaseApp";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Timestamp,
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const getStartAndEndOfWeek = () => {
  const now = new Date();
  // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDay = now.getDay();
  // Calculate the start of the week (Sunday)
  const start = new Date(now);
  start.setDate(now.getDate() - currentDay); // Move to Sunday
  // Calculate the end of the week (Saturday)
  const end = new Date(now);
  end.setDate(now.getDate() + (6 - currentDay)); // Move to Saturday
  // Set time to the beginning and end of the day
  start.setHours(0, 0, 0);
  end.setHours(23, 59, 59);
  return {
    start: Timestamp.fromDate(start),
    end: Timestamp.fromDate(end),
  };
};

export default function Dashboard() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  // thisWeekNotes is a boolean array
  // 7 elements that are either true or false, depending if the user wrote a note that day
  const [thisWeekNotes, setThisWeekNotes] = useState([]);
  const [fetchError, setFetchError] = useState(null); // State for fetch errors
  const [streak, setStreak] = useState(0); // State to hold the streak value

  useEffect(() => {
    const fetchThisWeekNotes = async () => {
      if (loading) return; // Avoid running fetchNotes while loading
      if (error) {
        console.error("Authentication Error:", error.message);
        return;
      }
      if (!user) {
        router.push("/login");
        return;
      }
      try {
        const { start, end } = getStartAndEndOfWeek();
        const userID = user.uid;
        const notesRef = collection(db, "users", userID, "notes");
        const notesQuery = query(
          notesRef,
          where("createdTime", ">=", start),
          where("createdTime", "<=", end)
        );
        // fetch all documents in the notes subcollection with the query
        const querySnapshot = await getDocs(notesQuery);
        // map each query document snapshot to a javascript object containing the document data
        const notes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), //spread operator spreads all properties from the document's data object into this new object
        }));
        // Create an boolean array to keep track of which days have notes
        const daysWithNotes = new Array(7).fill(false); // 7 days of the week are initially false
        // for each note, check the time date, check the day
        notes.forEach((note) => {
          const noteDate = note.createdTime.toDate();
          const dayIndex = noteDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
          daysWithNotes[dayIndex] = true;
        });
        setThisWeekNotes(daysWithNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setFetchError("Failed to fetch notes. Please try again later.");
      }
    };
    fetchThisWeekNotes();
  }, [loading, user, error]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userID = user.uid;
        const userRef = doc(db, "users", userID);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log("User data:", userData);
          setStreak(userData.streak || 0);
        } else {
          console.log("No such document");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setFetchError("Failed to fetch document. Please try again later.");
      }
    };
    fetchUserData();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (fetchError) return <div>{fetchError}</div>;
  if (!user) return; // Redirect handled in useEffect

  const getFirstName = (name) => name.split(" ")[0];
  const firstName = getFirstName(user.displayName);

  const now = new Date();
  const dayOfTheWeek = now.getDay();
  let journalExists = false;
  if (thisWeekNotes[dayOfTheWeek]) {
    journalExists = true;
  }

  //TODO: update this condition for checking if mood exists for today's note
  let moodExists = false;


  return (
    <div className="p-8">
      <h1 className="text-4xl"> Hello {firstName}!</h1>

      <div className="mt-8">
        <p className="text-xl">
          Your daily streak is{" "}
          <span className="text-app-purple-700">{streak}</span>
        </p>
        <div className="flex mt-2">
          {thisWeekNotes.map((hasNote, index) => (
            <div
              key={index}
              // TODO: Styling for the bar cuz i can't see it
              className={`w-12 h-12 border-2 ${
                hasNote ? "bg-app-purple-700" : "bg-white"
              } border-gray-300`}
              title={
                [
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ][index]
              }
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl mt-12">Today&apos;s Tasks</h2>
      <ul className="list-none mt-4">
        <li className="text-xl flex items-center">
          <input type="checkbox" id="journal-entry" className="mr-2" checked={journalExists} readOnly/>
          <label htmlFor="journal-entry">
            write a{" "}
            <Link href="/journal-entries" className="text-purple-600 underline">
              journal entry
            </Link>
          </label>
        </li>
        <li className="text-xl mt-2 flex items-center">
          <input type="checkbox" id="mood-tracker" className="mr-2" checked={moodExists} readOnly/>
          <label htmlFor="mood-tracker">
            complete{" "}
            <Link href="/mood-tracker" className="text-purple-600 underline">
              mood tracker
            </Link>
          </label>
        </li>
      </ul>
    </div>
  );
}
