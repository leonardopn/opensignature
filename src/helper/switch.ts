import { ButtonDateDay } from "../components/ButtonDateDay";
import { ButtonDate } from "../components/ButtonDate";
import { ButtonDateMonth } from "../components/ButtonDateMonth";
import { ButtonDateYear } from "../components/ButtonDateYear";
import { ButtonInitial } from "../components/ButtonInitial";
import { ButtonSign } from "../components/ButtonSign";

export function selectButton(type: string) {
    switch (type.toUpperCase()) {
        case "SIGN":
            return ButtonSign;
        case "DATE":
            return ButtonDate;
        case "DATE_DAY":
            return ButtonDateDay;
        case "DATE_MONTH":
            return ButtonDateMonth;
        case "DATE_YEAR":
            return ButtonDateYear;
        default:
            return ButtonInitial;
    }
}
