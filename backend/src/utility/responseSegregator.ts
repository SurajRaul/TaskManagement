import { Request, Response } from 'express';

interface IResponse{
    status: string,
    message:string,
    data?:any
}

const SucessResObj = (res:Response, message:string, data?:any, statusCode:number=200):void => {
    res.status(statusCode).json({
        status: 'success',
        message,
        data
    })
}

const ErrorResObj = (res:Response,message:string,statusCode:number=400):void =>{
    res.status(statusCode).json({
        status:'error',
        message
    })
}

export { SucessResObj, ErrorResObj }