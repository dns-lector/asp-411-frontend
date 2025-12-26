export default interface IProduct {
    "id": string,
    "groupId": string,
    "manufacturerId": string,
    "name": string,
    "description": string,
    "imageUrl": string|null,
    "stock": number,
    "price": number,
    "slug": string|null,
    "deleteAt": string|null
};
