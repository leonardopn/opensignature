import { Action } from "redux";

interface SET_PDF extends Action {
    type: string;
    payload: string;
}

export type PdfAction = SET_PDF;
