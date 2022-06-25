const objetoCarrito = new Carrito ();

document.addEventListener('DOMContentLoaded',() => {
  fetch('https://jsonblob.com/api/jsonBlob/981718291185942528')
  .then(response => response.json())
  .then(data => {
    guardarProducto(data);
    pintarCarrito(data.currency, objetoCarrito.obtenerProductos());
  });
  //guarda productos
  const guardarProducto = (data) => {
    data.products.forEach(producto => {
      const nuevoProducto = new Producto (producto.SKU, producto.title,0, producto.price);
      objetoCarrito.guardarProducto(nuevoProducto);  
    });
  };
  //pinta carrito
  const pintarCarrito = (currency, listaProductos) => {  
    const carritoEl = document.querySelector('#contenido');
    carritoEl.innerHTML = "";
    console.log(listaProductos);
    listaProductos.forEach(product => {

      const sumarButton = document.createElement('button');
      sumarButton.innerText = '+';
      sumarButton.setAttribute('sumar-sku', product.getSku());
      sumarButton.setAttribute('sumar-precio', product.getPrice());
      sumarButton.setAttribute('currency', currency);
      sumarButton.addEventListener('click', sumarButtonClickHandler);
      
      const calcularInput = document.createElement('input');
      calcularInput.setAttribute('disabled', '');
      calcularInput.setAttribute('value', 0);
      calcularInput.setAttribute('id', product.getSku ());

      const restarButton = document.createElement('button');
      restarButton.innerText = '-';
      restarButton.setAttribute('restar-sku', product.getSku());
      restarButton.setAttribute('restar-precio', product.getPrice());
      restarButton.setAttribute('currency', currency);
      restarButton.addEventListener('click', restarButtonClickHandler);

      const tr = document.createElement('tr');

      const tdtitle = document.createElement ('td');
      const title = document.createElement ('p');
      title.innerHTML= `${product.getTitle()}</br>Ref: ${product.getSku()}`;
      tdtitle.appendChild(title); 

      const tdcantidad = document.createElement ('td');
      tdcantidad.appendChild(restarButton);
      tdcantidad.appendChild(calcularInput);
      tdcantidad.appendChild(sumarButton);

      const tdprice = document.createElement ('td');
      const price = document.createElement ('p');
      price.innerHTML= `${product.getPrice()} ${currency}`;
      tdprice.appendChild(price);

      const tdcurrency = document.createElement ('td');
      const curre = document.createElement ('p');
      curre.innerHTML= `0.00 ${currency}`;
      tdcurrency.appendChild(curre);
      curre.setAttribute('id', "td_" + product.getSku ());

      tr.appendChild(tdtitle);    
      tr.appendChild(tdcantidad);
      tr.appendChild(tdprice);
      tr.appendChild(tdcurrency);
      carritoEl.appendChild(tr);          
    });
  };

  const sumarButtonClickHandler = (event) => {       
    const codigoSku = event.target.getAttribute('sumar-sku');
    const currency = event.target.getAttribute('currency');
    const inputSku = document.getElementById(codigoSku);
    let valorInput = Number(inputSku.value);
    let unidades = valorInput + 1;
    inputSku.value = unidades;
    objetoCarrito.actualizarUnidades(codigoSku,unidades);
    const productoActualizado = objetoCarrito.obtenerInformacionProducto(codigoSku);
    productoActualizado.forEach (producto => {
      const columnaTotal = document.getElementById ("td_"+codigoSku);
      columnaTotal.innerHTML = (producto.getPrice()*(producto.getQuantity())).toFixed(2) +" "+ currency;  
    });        
  };
  
  const restarButtonClickHandler = (event) => {
    const codigoSku = event.target.getAttribute('restar-sku');
    const currency = event.target.getAttribute('currency');
    const inputSku = document.getElementById(codigoSku);
    let valorInput = Number(inputSku.value);
    let unidades = 0;
    if (valorInput > 0) {
      unidades = valorInput - 1; 
    } 
    inputSku.value = unidades;
    objetoCarrito.actualizarUnidades(codigoSku,unidades);
    const productoActualizado = objetoCarrito.obtenerInformacionProducto(codigoSku);
    productoActualizado.forEach (producto => {
      const columnaTotal = document.getElementById ("td_"+codigoSku);
      columnaTotal.innerHTML = (producto.getPrice()*(producto.getQuantity())).toFixed(2) +" "+ currency;  
    });  
  };

});
