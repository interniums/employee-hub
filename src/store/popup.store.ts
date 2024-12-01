import { createEvent, createStore } from 'effector'

export const showPopup = createEvent<string>()
export const hidePopup = createEvent()

export interface PopupInterface {
  visible: boolean
  content: string
}

export const $popupState = createStore<PopupInterface>({ visible: false, content: '' })
  .on(showPopup, (state, content) => ({ ...state, visible: true, content }))
  .on(hidePopup, (state) => ({ ...state, visible: false }))
