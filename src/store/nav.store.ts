import { createEvent, createStore } from 'effector'

export const toggleNav = createEvent()

interface NavInterface {
  open: boolean
}

export const $navState = createStore<NavInterface>({
  open: false,
}).on(toggleNav, (state) => ({ ...state, open: !state.open }))
