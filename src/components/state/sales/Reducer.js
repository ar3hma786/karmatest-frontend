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
                loading: false,
                sales: [],
                error: action.payload,
            };
        case CREATE_SALES_REQUEST:
        case EDIT_SALES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_SALES_SUCCESS:
            return {
                ...state,
                sales: [...state.sales, action.payload], // Add the new sale to the list
                loading: false,
            };
        case EDIT_SALES_SUCCESS:
            return {
                ...state,
                sales: state.sales.map((sale) =>
                    sale.id === action.payload.id ? action.payload : sale
                ), // Update the existing sale
                loading: false,
            };
        case CREATE_SALES_FAILURE:
        case EDIT_SALES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case DELETE_SALES_REQUEST:
            return { ...state, loading: true };
        case DELETE_SALES_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                sales: state.sales.filter((sale) => sale.id !== action.payload) 
            };
        case DELETE_SALES_FAILURE:
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        default:
            return state;
    }
};

export default adminSalesReducer;
