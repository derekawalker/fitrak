import { toastr } from "react-redux-toastr";
import {
  CREATE_BUDGET_ITEM,
  DELETE_BUDGET_ITEM,
  UPDATE_BUDGET_ITEM,
  FETCH_BUDGET
} from "./budgetConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockAPI";

export const fetchBudget = budget => {
  return {
    type: FETCH_BUDGET,
    payload: budget
  };
};

export const createBudgetItem = item => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_BUDGET_ITEM,
        payload: {
          item
        }
      });
      toastr.success("Success", "Budget tiem has been added");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateBudgetItem = item => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_BUDGET_ITEM,
        payload: {
          item
        }
      });
      toastr.success("Success", "Budget item has been updated");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const deleteBudgetItem = itemID => {
  return {
    type: DELETE_BUDGET_ITEM,
    payload: {
      itemID
    }
  };
};

export const loadBudget = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let budget = await fetchSampleData();
      dispatch(fetchBudget(budget));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
