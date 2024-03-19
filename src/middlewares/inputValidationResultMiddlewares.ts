import { NextFunction, Request, Response } from "express";
import {validationResult, FieldValidationError} from 'express-validator';
import { OutputErrorsType } from "../input-uotput-types/output-errors-types";


export const inputCheckErrorsMiddleware = (req:Request, res:Response, next: NextFunction) => {
    
        const e = validationResult(req)
        const errors = e.array()
        if (errors.length) {
           // res.status(400).json({ errorsMessages: errors.map(=>) })
           return
        }
     
        next()
    }


/*const errors = validationResult(req)

    if (!errors.isEmpty()){
        const errorsPayload = (
             errors.array({onlyFirstError : true}) as FieldValidationError[]).map((er ) => ({
                message: er.msg,
                fielwd: er.path,
            })
        );
        res.status(400).send({
            errorsMessages: errorsPayload,
        });
    }else{
        next()
    }*/