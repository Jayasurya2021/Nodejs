import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginModalOpen: false,
  isChatOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    openChat: (state) => {
      state.isChatOpen = true;
    },
    closeChat: (state) => {
      state.isChatOpen = false;
    }
  },
});

export const { openLoginModal, closeLoginModal, toggleChat, openChat, closeChat } = uiSlice.actions;
export default uiSlice.reducer;
