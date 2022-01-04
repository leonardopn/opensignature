import { PdfAction } from "../types/pdf.types";
import ActionTypes from "../types/types.redux";

const initialState = "";

export default function configsReducer(state = initialState, action: PdfAction) {
    switch (action.type) {
        case ActionTypes.SET_PDF:
            return action.payload;
        default:
            return state;
    }
}
