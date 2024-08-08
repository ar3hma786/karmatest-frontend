import axios from "axios";
import api from '../../config/apiConfig';
import {
  GET_SALES_REQUEST,
  GET_SALES_SUCCESS,
  GET_SALES_FAILURE,
  DELETE_SALES_REQUEST,
  DELETE_SALES_SUCCESS,
  DELETE_SALES_FAILURE,
  CREATE_SALES_REQUEST,
  CREATE_SALES_SUCCESS,
  CREATE_SALES_FAILURE,
  EDIT_SALES_REQUEST,
  EDIT_SALES_SUCCESS,
  EDIT_SALES_FAILURE,
  GET_SALE_BY_ID_REQUEST,
  GET_SALE_BY_ID_SUCCESS,
  GET_SALE_BY_ID_FAILURE,
} from "./ActionTypes";

const getSalesRequest = () => ({ type: GET_SALES_REQUEST });
const getSalesSuccess = (sales) => ({ type: GET_SALES_SUCCESS, payload: sales });
const getSalesFailure = (error) => ({ type: GET_SALES_FAILURE, payload: error });

const deleteSalesRequest = () => ({ type: DELETE_SALES_REQUEST });
const deleteSalesSuccess = (id) => ({ type: DELETE_SALES_SUCCESS, payload: id });
const deleteSalesFailure = (error) => ({ type: DELETE_SALES_FAILURE, payload: error });

const createSalesRequest = () => ({ type: CREATE_SALES_REQUEST });
const createSalesSuccess = (sale) => ({ type: CREATE_SALES_SUCCESS, payload: sale });
const createSalesFailure = (error) => ({ type: CREATE_SALES_FAILURE, payload: error });

const editSalesRequest = () => ({ type: EDIT_SALES_REQUEST });
const editSalesSuccess = (sale) => ({ type: EDIT_SALES_SUCCESS, payload: sale });
const editSalesFailure = (error) => ({ type: EDIT_SALES_FAILURE, payload: error });

const getSaleByIdRequest = () => ({ type: GET_SALE_BY_ID_REQUEST });
const getSaleByIdSuccess = (sale) => ({ type: GET_SALE_BY_ID_SUCCESS, payload: sale });
const getSaleByIdFailure = (error) => ({ type: GET_SALE_BY_ID_FAILURE, payload: error });



export const createSale = (sale) => async (dispatch) => {
  dispatch(createSalesRequest());

  try {
    const response = await api.post("/api/sales", sale);
    dispatch(createSalesSuccess(response.data));
  } catch (error) {
    dispatch(createSalesFailure(error.message));
  }
};

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

export const getSaleById = (id) => async (dispatch) => {
  dispatch(getSaleByIdRequest());
  try {
    const response = await api.get(`/api/sales/${id}`);
    dispatch(getSaleByIdSuccess(response.data));
  } catch (error) {
    dispatch(getSaleByIdFailure(error.message));
  }
};

export const editSale = (sale) => async (dispatch) => {
  dispatch(editSalesRequest());

  try {
    const response = await api.put(`/api/sales/${sale.id}`, sale);
    dispatch(editSalesSuccess(response.data));
  } catch (error) {
    dispatch(editSalesFailure(error.message));
  }
};
