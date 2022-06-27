class Carrito {
  productos = [];
  constructor(productos = []) {
    this.productos = productos;
  }
  guardarProducto (producto){
    this.productos.push(producto);
  }
  obtenerProductos (){
    return this.productos;
  }
  actualizarUnidades(sku, unidades) {
    this.productos.filter(producto => {
      if  (producto.getSku()===sku) {
        return producto.quantity=unidades;
      }
    });
  }
  obtenerInformacionProducto(sku) {
    return this.productos.filter(producto => {
      if  (producto.getSku()===sku) {
        return producto;
      }
    });
  }
  obtenerCarrito() {
    return this.productos.filter(producto => {
      if  (producto.getQuantity() >0) {
        return producto;
      }
    }); 
  }

  obtenerCalculoTotalCarrito(){
    return this.productos.reduce((acc, producto) => {
      return acc += (producto.getPrice()*(producto.getQuantity()));
    }, 0);
  }
}
