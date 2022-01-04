import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import pdfReducer from "./reducers/pdf.reducer";

const reducers = combineReducers({
    pdf: pdfReducer,
});

const initStore = () => createStore(reducers, composeWithDevTools(applyMiddleware()));

export default initStore;
