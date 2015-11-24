var ModalActions = {

  raiseModal: function (modalData) {
    AppDispatcher.dispatch({
      actionType: ModalConstants.MODAL_RAISED,
      modalData: modalData
    });
  },
  closeModal: function (modalData) {
    AppDispatcher.dispatch({
      actionType: ModalConstants.MODAL_CLOSED,
      modalData: modalData
    });
  }

};
