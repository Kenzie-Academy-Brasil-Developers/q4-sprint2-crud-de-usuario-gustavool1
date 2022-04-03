
export default class ErrorHandler {
    
    statusCode: number;
    message:string;

    constructor(statusCode:number, message:string) {
      this.statusCode = statusCode;
      this.message = message;
    }


    static  badRequest  = (message:string) => {
        return new ErrorHandler(400, message)
    }

    static conflict = (message:string) => {
        return new ErrorHandler(409, message)
    }

    static unauthorized = (message:string) => {
        return new ErrorHandler(401, message)
    }

    static notFound = (message:string) => {
        return new ErrorHandler(404, message)
    }
}






