export interface ITodo{
    id:string,
    complete:boolean,
    title:string,
    date:string,
    file:any,
    url:string,
}
export interface IModalProps {
    url:string,
    open:Function
}