
import api from "../../config/apiConfig";
import {
  GET_SALES_REQUEST,
  GET_SALES_SUCCESS,
  GET_SALES_FAILURE,
  CREATE_SALES_REQUEST,
  CREATE_SALES_SUCCESS,
  CREATE_SALES_FAILURE,
  EDIT_SALES_REQUEST,
  EDIT_SALES_SUCCESS,
  EDIT_SALES_FAILURE,
  DELETE_SALES_REQUEST,
  DELETE_SALES_SUCCESS,
  DELETE_SALES_FAILURE,
} from "./ActionTypes";

// Action Creators
const getSalesRequest = () => ({ type: GET_SALES_REQUEST });
const getSalesSuccess = (data) => ({ type: GET_SALES_SUCCESS, payload: data });
const getSalesFailure = (error) => ({ type: GET_SALES_FAILURE, payload: error });

const createSalesRequest = () => ({ type: CREATE_SALES_REQUEST });
const createSalesSuccess = (data) => ({ type: CREATE_SALES_SUCCESS, payload: data });
const createSalesFailure = (error) => ({ type: CREATE_SALES_FAILURE, payload: error });

const editSalesRequest = () => ({ type: EDIT_SALES_REQUEST });
const editSalesSuccess = (data) => ({ type: EDIT_SALES_SUCCESS, payload: data });
const editSalesFailure = (error) => ({ type: EDIT_SALES_FAILURE, payload: error });

const deleteSalesRequest = () => ({ type: DELETE_SALES_REQUEST });
const deleteSalesSuccess = (id) => ({ type: DELETE_SALES_SUCCESS, payload: id });
const deleteSalesFailure = (error) => ({ type: DELETE_SALES_FAILURE, payload: error });

export const getSales = () => async (dispatch) => {
    dispatch(getSalesRequest());
    try {
      const response = await api.get(`/api/sales`);
      dispatch(getSalesSuccess(response.data));
      return response; // Ensure the response is returned
    } catch (error) {
      dispatch(getSalesFailure(error.message));
    }
  };
  

export const createSale = (saleData) => async (dispatch) => {
  dispatch(createSalesRequest());
  try {
    const response = await api.post(`/api/admin/sales/`, saleData);
    dispatch(createSalesSuccess(response.data));
  } catch (error) {
    dispatch(createSalesFailure(error.message));
  }
};

// export const editSale = (saleId, saleData) => async (dispatch) => {
//   dispatch(editSalesRequest());
//   try {
//     const response = await api.put(`/api/admin/sales/${saleId}`, saleData);
//     dispatch(editSalesSuccess(response.data));
//   } catch (error) {
//     dispatch(editSalesFailure(error.message));
//   }
// };

// export const deleteSale = (saleId) => async (dispatch) => {
//   dispatch(deleteSalesRequest());
//   try {
//     await api.delete(`/api/admin/sales/${saleId}`);
//     dispatch(deleteSalesSuccess(saleId));
//   } catch (error) {
//     dispatch(deleteSalesFailure(error.message));
//   }
// };
