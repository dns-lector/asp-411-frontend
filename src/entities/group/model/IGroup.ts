import type IProduct from "../../product/model/IProduct";

export default interface IGroup {
    "id": string,
    "name": string,
    "description": string,
    "imageUrl": string,
    "slug": string,
    "deleteAt": string|null,
    "products": Array<IProduct>,
};
