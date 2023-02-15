export interface Option {
    _id?: string | never;
    optNo?: string | never;
    name: string
    price: number | string
    quantity: number | string
}
interface Attribute {
    attrNo:string | number
    _id?: string
    name: string
    options: Option[]
}


export interface SelectedAttribute {
    _id?: string;
    name: string;
    option: string
    price: number | string
}

export default Attribute