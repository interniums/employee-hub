import { useUnit } from 'effector-react'
import { $navState, toggleNav } from '../store/nav.store'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import exit from '/assets/exit.svg'

function Sheet() {
  const open = useUnit($navState).open
  const [zIndex, setZIndex] = useState(false)
  const [mount, setMount] = useState(true)

  useEffect(() => {
    if (open) {
      setMount(false)
      setZIndex(true)
    }
    if (!open) {
      setTimeout(() => {
        setZIndex(false)
      }, 800)
    }
  }, [open])
  return (
    <SheetOverlay $zIndex={zIndex}>
      <SheetContainer $open={open} $mount={mount}>
        <TitleContainer>
          <SheetTitle>Navigation Menu</SheetTitle>
          <ExitContainer onClick={() => toggleNav()}>
            <ExitImg src={exit} />
          </ExitContainer>
        </TitleContainer>
        <ContentContainer>
          <SheetContent>Tasks</SheetContent>
          <SheetContent>Notes</SheetContent>
          <SheetContent>Profile page</SheetContent>
          <SheetContent>Settings</SheetContent>
        </ContentContainer>
      </SheetContainer>
    </SheetOverlay>
  )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const ExitImg = styled.img`
  width: 2rem;
  height: 2rem;
`
const ExitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25%;
  padding: 0.25rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
// Animation to slide the sheet from the right
const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const slideOutToRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`

const SheetOverlay = styled.div<{ $zIndex: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  inset: 0;
  overflow-x: hidden;
  z-index: ${(props) => (props.$zIndex ? '1' : '-1')};
`

const SheetContainer = styled.div<{ $open: boolean; $mount: boolean }>`
  background-color: white;
  opacity: ${(props) => (props.$mount ? '0' : '100')};
  padding: 2rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  position: relative;
  transform: translateX(100%);
  animation: ${(props) => (props.$open ? slideInFromRight : slideOutToRight)} 0.5s ease-out forwards;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const SheetTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`

const SheetContent = styled.p`
  font-size: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`

export default Sheet
