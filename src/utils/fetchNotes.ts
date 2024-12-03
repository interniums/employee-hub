import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

export async function fetchNotes(userId: string | undefined) {
  try {
    const notesCollection = collection(db, 'notes')
    const userNotesQuery = query(notesCollection, where('userId', '==', userId))
    const querySnapshot = await getDocs(userNotesQuery)

    const notes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return notes
  } catch (error) {
    return console.error(error)
  }
}
