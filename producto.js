class Producto {
    constructor(...info) {
        this.sku = info[0];
        this.title = info[1];
        this.quantity = Number (info[2]);
        this.price = Number (info[3]);
    }
    getSku() {
        return this.sku;
    }
    getTitle() {
        return this.title;
    }
    getPrice() {
        return this.price;
    }
    getQuantity() {
        return this.quantity;
    }
}
