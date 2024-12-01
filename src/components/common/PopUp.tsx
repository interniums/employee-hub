import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { $popupState, hidePopup } from '../../store/popup.store'
import { useUnit } from 'effector-react'

const Popup = () => {
  const store = useUnit($popupState)
  const popupRef = useRef<HTMLDivElement>(null)

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      hidePopup()
    }
  }

  if (!store.visible) return null
  return (
    <>
      <PopupContainer onClick={handleOutsideClick}>
        <PopupContent ref={popupRef}>
          <p>{store.content}</p>
          <CloseButton onClick={() => hidePopup()}>&times;</CloseButton>
        </PopupContent>
      </PopupContainer>
    </>
  )
}

// Keyframes for sliding animation
const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

// Popup Container
const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px; /* Space from the top */
  z-index: 1000;
  pointer-events: auto; /* Allows outside click detection */
`

// Popup Content
const PopupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(0, 0, 25);
  color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  animation: ${slideDown} 0.5s ease-in-out;
  position: relative;
  z-index: 1100;
`

// Close Button
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
`

export default Popup
