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
} from "./ActionTypes";

const initialState = {
  loading: false,
  sales: [],
  error: "",
};

const adminSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES_REQUEST:
    case DELETE_SALES_REQUEST:
    case CREATE_SALES_REQUEST:
      return {
        ...state,
        loading: true,
        error: "", // Clear error when starting a new request
      };
    case GET_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        sales: action.payload,
        error: "",
      };
    case DELETE_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        sales: state.sales.filter(sale => sale.id !== action.payload.id), // Remove the deleted sale
        error: "",
      };
    case CREATE_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        sales: [...state.sales, action.payload], // Add the new sale to the list
        error: "",
      };
    case GET_SALES_FAILURE:
    case DELETE_SALES_FAILURE:
    case CREATE_SALES_FAILURE:
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
