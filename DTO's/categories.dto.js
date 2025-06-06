export default class CreateCategoryDto {
    constructor(data) {
        this.code = data.code;
        this.name = data.name;
        this.active = data.active;
    }
}