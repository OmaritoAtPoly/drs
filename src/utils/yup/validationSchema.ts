import * as Yup from "yup";
import { phoneRegExp } from "../regex";
import STRINGS from "../strings";

const validationSchema = {
  phone: Yup.string()
    .matches(phoneRegExp, STRINGS.validation.WRONG_PHONE_NUMBER)
    .required(STRINGS.error.CELL_REQUIRED),
};

export default validationSchema;
