import { toastr } from "react-redux-toastr";

export const createBudgetItem = item => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.add(
        {
          collection: "users",
          doc: user.uid,
          subcollections: [{ collection: "budget" }]
        },
        item
      );
      toastr.success("Success", "Item added to budget");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const editBudgetItem = (item, id) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.update(
        {
          collection: "users",
          doc: user.uid,
          subcollections: [{ collection: "budget", doc: id }]
        },
        item
      );
      toastr.success("Success", "Item updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const deleteBudgetItem = id => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    try {
      await firestore.delete({
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "budget", doc: id }]
      });
      toastr.success("Success", "Item removed");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};
