import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { fetchNotes } from '../utils/fetchNotes'
import { auth } from '../firebase'

function Notes() {
  const [notes, setNotes] = useState<string[]>([])

  useEffect(() => {
    if (!auth.currentUser?.uid) {
      return
    }
    async function loadNotes() {
      const fetchedNotes = fetchNotes(auth.currentUser?.uid)
    }
  }, [])
  return (
    <>
      <NotesContainer></NotesContainer>
    </>
  )
}

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const NoteContainer = styled.div`
  display: flex;
`

export default Notes
