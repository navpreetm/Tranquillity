import { db } from "@/firebase/firebaseApp";
import { collection, query, where, getDocs } from "firebase/firestore";

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
