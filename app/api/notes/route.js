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
    // Extract userId from request headers
    const userId = request.headers.get("userId");
 
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
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  
  // Convert to Firestore Timestamps
  const startTimestamp = Timestamp.fromDate(startOfToday);
  const endTimestamp = Timestamp.fromDate(endOfToday);
  
  // Query to get notes created today
  const todayNotesQuery = query(
    notesCollection,
    where("createdTime", ">=", startTimestamp),
    where("createdTime", "<=", endTimestamp)
  );

  const querySnapshot = await getDocs(todayNotesQuery);

  // fetch all notes from notesCollection
  const noteList = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const titleList = noteList.map(note => note.title);

  const newNoteRef = doc(notesCollection);

  let noteCount = 1;
  // create a title like <2024-08-24 (Today's Date)> Note 1
  let title = `${new Date().toISOString().split("T")[0]} Note ${noteCount}`;

  while (titleList.includes(title)) {
    noteCount++;
    title = `${new Date().toISOString().split("T")[0]} Note ${noteCount}`;
  }

  console.log("title: " + title)

  await setDoc(newNoteRef, {
    ai: "",
    body: "",
    title: title,
    createdTime: new Date(),
  });
}

/**
 * creates a new note for a user
 * @param {Request} request 
 * @returns 
 */
export async function POST(request) {
  try {
    const userId = request.headers.get("userId");
    
    let resultMessage = "";

    if (!userId) {
      console.error("User ID is missing");
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    // create a new note
    await createNote(userId);
    resultMessage = "Note created successfully!";

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

/**
 * updates a given note for a user
 * @param {Request} request 
 * @returns 
 */
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
    
    // get the reference to the note document 
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
