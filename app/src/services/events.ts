"use strict"

import { Request } from "express";
import { 
  Result, 
  ValidationError,
  check,
  validationResult
} from "express-validator";

export const validate = async (req: Request): Promise<Result<ValidationError>> => {
  await check("title").not().isEmpty().trim().escape()
    .withMessage("Title is empty")
    .run(req);
  await check("startTime").not().isEmpty().trim().escape()
    .withMessage("Start time is empty")
    .run(req);
  await check("endTime").not().isEmpty().trim().escape()
    .withMessage("End time is empty")
    .run(req);

  return validationResult(req);
}