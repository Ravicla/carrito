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
    const informacionProducto=this.productos.filter(producto => {
      if  (producto.getSku()===sku) {
        return producto;
      }
    });
    return informacionProducto; 
  }
  obtenerCarrito() {
    return this.productos.reduce((acc, producto) => {
      return acc += producto.price;
    }, 0);  

    // Devuelve información de los productos añadidos al carrito
    // Además del total calculado de todos los productos
    // Por ejemplo:
    // {
    //   "total": "5820",
    //   "currency: "€",
    //   "products" : [
    //     {
    //       "sku": "0K3QOSOV4V"
    //       ..
    //     }
    //    ]}
    // }
  }
}
