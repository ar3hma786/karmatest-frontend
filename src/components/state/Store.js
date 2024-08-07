import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import authReducer from "./authentication/Reducer";
import adminSalesReducer from "./sales/Reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
    adminSales: adminSalesReducer

});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));