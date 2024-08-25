import { db } from "@/firebase/firebaseApp";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  Timestamp
} from "firebase/firestore";


/**
 * Asynchronously retrieves all notes of a user
 * @param {Request} request 
 * @returns 
 */
export async function GET(request) {
  try {
    // Extract userId from the query parameters
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    console.log(userId);

    if (!userId) {
      return new Response(JSON.stringify({ error: "There is no user ID" }), {
        status: 400,
      });
    }

    // Reference to the user's notes subcollection
    const notesCollection = collection(db, "users", userId, "notes");
    // Fetch all documents in the notes subcollection
    const notesSnapshot = await getDocs(notesCollection);

    console.log(notesSnapshot);

    if (notesSnapshot.empty) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Map notes to the desired format
    const notes = notesSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        body: data.body,
        createdTime: data.createdTime.toDate().toISOString(), // Adjust date format as needed
        ai: data.ai,
        title: data.title,
      };
    });

    // Send response with notes data
    return new Response(JSON.stringify(notes), { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return new Response(JSON.stringify({ error: "Error fetching notes" }), {
      status: 500,
    });
  }
}


// creates a new note for a user
const createNote = async (userId) => {
  const notesCollection = collection(db, "users", userId, "notes");

  // get all notes from today
  // settings 4 AM EST as the start of the day
  const startOfDay = new Date();
  startOfDay.setDate(startOfDay.getDate() - 1);

  // Convert to Firestore Timestamps
  const startTimestamp = Timestamp.fromDate(startOfDay);
  
  // Query to get notes created today
  const todayNotesQuery = query(
    notesCollection,
    where("createdAt", "<=", startTimestamp),
    // where("createdAt", "<=", endTimestamp)
  );

  const querySnapshot = await getDocs(todayNotesQuery);

  // fetch all notes from notesCollection
  const noteList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const titleList = noteList.map(note => note.title);
  console.log(noteList);
  console.log(titleList)

  const newNoteRef = doc(notesCollection);

  let noteCount = 1;
  // create a title like <2024-08-24 (Today's Date)> Note 1
  let title = `${new Date().toISOString().split("T")[0]} Note ${noteCount}`;

  while (titleList.includes(title)) {
    noteCount++;
    title = `${new Date().toISOString().split("T")[0]} Note ${noteCount}`;
  }

  console.log("title: " + title)
  return;

  await setDoc(newNoteRef, {
    ai: "",
    body: "",
    title: title,
    createdTime: new Date(),
  });
}

/**
 * Handles a POST request to create or update a note in the database. It expects a JSON payload containing note id, body text, ai, and title
 * Additionally, it requires a 'userId' in the request headers to associate the note with a specific user 
 * @param {Request} request 
 * @returns 
 */
export async function POST(request) {
  try {
    const data = await request.json();

    // ai: string | undefined
    // id: firebaseID | undefined
    // body: string | undefined
    // title: string | undefined
    const { ai, id, body, title } = data;

    const userId = request.headers.get("userId");
    
    let resultMessage = "";

    if (!userId) {
      console.error("User ID is missing");
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    // if no id is provided, create a new note
    if (!id) {
      await createNote(userId);
      resultMessage = "Note created successfully!";
    } 
    // id is provided, so update the existing note
    else {
      const noteDoc = doc(collection(db, "users", userId, "notes"), id);

      await setDoc(noteDoc, {
        ai,
        body,
        title,
      });

      resultMessage = "Note updated successfully!";
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: resultMessage 
    }), { status: 200 });
  } catch (error) {
    console.error("Error creating note:", error);
    return new Response(JSON.stringify({ error: "Error creating note" }), {
      status: 500,
    });
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const { id, ai, body, title } = data;
    const userId = request.headers.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }
    const noteDoc = doc(collection(db, "users", userId, "notes"), id);

    await updateDoc(noteDoc, {
      ai,
      body,
      title,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return new Response(JSON.stringify({ error: "Error updating note" }), {
      status: 500,
    });
  }
}
