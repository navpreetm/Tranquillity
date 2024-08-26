import { db } from "@/firebase/firebaseApp";
import {
  collection,
  getDoc,
  doc,
} from "firebase/firestore";


/**
 * gets a given note for a user
 * @param {Request} request 
 * @returns 
 */
export async function GET(request, {params}) {
  try {
    const id = params.id;
    console.log(id);

    const userId = request.headers.get("userId");

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