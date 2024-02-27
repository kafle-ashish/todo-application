import Joi from "joi";
import { isObjectIdOrHexString } from "mongoose";

export const objectidValidationSchema = Joi.object({
    id: Joi.string().required().custom((value, helpers) => {
        if (isObjectIdOrHexString(value)) return true;

        return helpers.error("Value is not a valid ObjectID.");
    })
});