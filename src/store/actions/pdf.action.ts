import { PdfAction } from "../types/pdf.types";
import ActionTypes from "../types/types.redux";

export function setPdf(pdf: string): PdfAction {
    return {
        type: ActionTypes.SET_PDF,
        payload: pdf,
    };
}
