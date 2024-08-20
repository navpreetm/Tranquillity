import { db } from "@/firebase/firebaseApp";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

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

    console.log(1);

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

export async function POST(request) {
  try {
    console.log("Starting POST function");

    const data = await request.json();
    const { id, ai, body, title } = data;

    const userId = request.headers.get("userId");
    console.log("User ID from headers:", userId);

    if (!userId) {
      console.error("User ID is missing");
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    if (!id || !body || !title) {
      console.error("Missing required fields:", { id, body, title });
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );
    }

    const noteDoc = doc(collection(db, "users", userId, "notes"), id);
    console.log("Firestore document reference:", noteDoc);

    await setDoc(noteDoc, {
      ai,
      body,
      title,
      createdTime: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
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
