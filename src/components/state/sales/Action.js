import axios from "axios";
import api from '../../config/apiConfig';
import {
  GET_SALES_REQUEST,
  GET_SALES_SUCCESS,
  GET_SALES_FAILURE,
  DELETE_SALES_REQUEST,
  DELETE_SALES_SUCCESS,
  DELETE_SALES_FAILURE,
} from "./ActionTypes";

const getSalesRequest = () => ({ type: GET_SALES_REQUEST });
const getSalesSuccess = (sales) => ({ type: GET_SALES_SUCCESS, payload: sales });
const getSalesFailure = (error) => ({ type: GET_SALES_FAILURE, payload: error });

const deleteSalesRequest = () => ({ type: DELETE_SALES_REQUEST });
const deleteSalesSuccess = (id) => ({ type: DELETE_SALES_SUCCESS, payload: id });
const deleteSalesFailure = (error) => ({ type: DELETE_SALES_FAILURE, payload: error });

export const getSales = () => async (dispatch) => {
  dispatch(getSalesRequest());

  try {
    const response = await api.get("/api/sales");
    dispatch(getSalesSuccess(response.data));
  } catch (error) {
    dispatch(getSalesFailure(error.message));
  }
};

export const deleteSale = (id) => async (dispatch) => {
  dispatch(deleteSalesRequest());

  try {
    await api.delete(`/api/sales/${id}`);
    dispatch(deleteSalesSuccess(id));
  } catch (error) {
    dispatch(deleteSalesFailure(error.message));
  }
};
