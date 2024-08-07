import {
    GET_SALES_REQUEST,
    GET_SALES_SUCCESS,
    GET_SALES_FAILURE,
  
  } from "./ActionTypes";

  const initialState = {
    loading: false,
    sales: [],
    error: "",
  };

  const adminSalesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_SALES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_SALES_SUCCESS:
        return {
          loading: false,
          sales: action.payload,
          error: "",
        };
      case GET_SALES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  export default adminSalesReducer;


// Action Creators