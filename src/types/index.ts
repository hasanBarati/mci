export interface PostDataType{
    body:string
    title:string
    id:number
    userId:number
}
export interface Filter {
    header: string;
    condition: ">" | "<" | "=" | "contain";
    value: string | number;
  }
export type  ApiStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";  