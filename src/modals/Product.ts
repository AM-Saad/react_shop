import CategoryInterface from './Category'
import Attribute from './Attribute'

interface Product {

    images:any[];
    price:string;
    name:string;
    quantity:string;
    category:{name:string | null, subCategory:string | null};
    attributes:Attribute[]
    featured:boolean;
    popular:boolean;
    description:string;
    details:string;

}

export default Product