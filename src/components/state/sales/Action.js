import axios from "axios";
import api from '../../config/apiConfig';
import {
  GET_SALES_REQUEST,
  GET_SALES_SUCCESS,
  GET_SALES_FAILURE,

} from "./ActionTypes";

const getSalesRequest = () => ({ type: GET_SALES_REQUEST });
const getSalesSuccess = (sales) => ({ type: GET_SALES_SUCCESS, payload: sales });
const getSalesFailure = (error) => ({ type: GET_SALES_FAILURE, payload: error });

export const getSales = () => async (dispatch) => {
  dispatch(getSalesRequest());

  try {
    const response = await api.get("/api/sales");
    dispatch(getSalesSuccess(response.data));
  } catch (error) {
    dispatch(getSalesFailure(error.message));
  }
};

