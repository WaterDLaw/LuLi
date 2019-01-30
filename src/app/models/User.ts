export interface User{
    id?:number,
    vorname?: string,
    name?: string,
    email?:string,
    password?:string,
    token?: string,
    userType?: number,
    ort?: string
}