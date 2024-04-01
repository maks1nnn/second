import { NextFunction, Request, Response } from "express";
import {validationResult, FieldValidationError} from 'express-validator';
import { OutputErrorsType } from "../input-uotput-types/output-errors-types";


export const inputCheckParamsErrorsMiddleware = (req:Request, res:Response, next: NextFunction) => {
    
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        const errorsPayload = (
             errors.array({onlyFirstError : true}) as FieldValidationError[]).map((er ) => ({
                message: er.msg,
                field: er.path,
            })
        );
        res.status(404).send({
            errorsMessages: errorsPayload,
        });
    }else{
        next()}}

