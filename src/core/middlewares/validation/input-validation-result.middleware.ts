import { FieldValidationError, ValidationError, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../types/http-statuses";
import { ValidationErrorListOutput } from "../../types/validationError.dto";
import { ValidationErrorType } from "../../types/validationError";

export const createErrorMessages = (
    errors: ValidationErrorType[],
): ValidationErrorListOutput => {
    return {
        errors: errors.map((error) => ({
            status: error.status,
            detail: error.detail,
            source: { pointer: error.source ?? ''},
            code: error.code ?? null,
        })),
    }
}

//здесь остановился