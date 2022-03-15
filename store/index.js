import { createStore, action } from "easy-peasy";

const store = createStore({
  categoryWellings: [],
  userLoginStatus: false,
  modal: {
    show: false,
    modalComponent: ""
  },

  setCategoryWellings: action((state, payload) => {
    state.categoryWellings = payload;
  }),

  setUserLoginStatus: action((state, payload) => {
    state.userLoginStatus = payload;
  }),

  setShowModal: action((state, { show, modalComponent }) => {
    state.modal.show = show;
    state.modal.modalComponent = modalComponent;
  })
});

export default store;
