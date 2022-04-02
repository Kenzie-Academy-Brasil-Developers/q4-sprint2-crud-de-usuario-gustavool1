export interface UserInterface {
    name:string,
    email:string,
    password:string
    isAdm?: boolean,
    createdOn?: Date,
    updatedOn?:Date
}