import { createReducer } from "../../app/common/util/reducerUtil";
import {
  CREATE_BUDGET_ITEM,
  DELETE_BUDGET_ITEM,
  UPDATE_BUDGET_ITEM,
  FETCH_BUDGET
} from "./budgetConstants";

const initialState = [];

export const createBudgetItem = (state, payload) => {
  return [...state, Object.assign({}, payload.item)];
};

export const updateBudgetItem = (state, payload) => {
  return [
    ...state.filter(item => item.id !== payload.item.id),
    Object.assign({}, payload.item)
  ];
};

export const deleteBudgetItem = (state, payload) => {
  return [...state.filter(item => item.id !== payload.itemID)];
};

export const fetchBudget = (state, payload) => {
  return payload.budget;
};

export default createReducer(initialState, {
  [CREATE_BUDGET_ITEM]: createBudgetItem,
  [UPDATE_BUDGET_ITEM]: updateBudgetItem,
  [DELETE_BUDGET_ITEM]: deleteBudgetItem,
  [FETCH_BUDGET]: fetchBudget
});
