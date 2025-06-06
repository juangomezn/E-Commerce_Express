export default class CreateProductDto{
    constructor(data){
        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.price = data.price;
        this.stock = data.stock;
        this.categories = data.categories;
        this.brand = data.brand;
        this.condition = data.condition;
        this.vat = data.vat;
        this.active = data.active;
    }
}