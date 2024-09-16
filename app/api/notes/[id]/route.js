import { db } from "@/firebase/firebaseApp";
import {
  collection,
  getDoc,
  doc,
  updateDoc
} from "firebase/firestore";

/**
 * gets a given note for a user
 * @param {Request} request 
 * @returns 
 */
export async function GET(request, {params}) {
  try {
    const id = params.id;

    const userId = request.headers.get("userId");

    console.log(`notes/id - GET`);

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }
    
    // get the reference to the note document 
    const noteDoc = doc(collection(db, "users", userId, "notes"), id);

    const noteSnapshot = await getDoc(noteDoc);
    const {body, ai, createdTime, title} = noteSnapshot.data();
    const note = {body, ai, createdTime, title};

    return new Response(JSON.stringify({ 
      success: true, note: note 
    }), { status: 200 });
  } catch (error) {
    console.error("Error querying note:", error);
    return new Response(JSON.stringify({ error: "Error quering note" }), {
      status: 500,
    });
  }
}


/**
 * updates a given note for a user
 * @param {Request} request 
 * @returns 
 */
export async function PUT(request, {params}) {
  try {
    const id = params.id;
    const data = await request.json();
    const { ai, body, title } = data;
    const userId = request.headers.get("userId");

    console.log("notes/id - PUT");
    console.log(data);

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
