let DateTime = luxon.DateTime;
class productos {
    constructor(id, nombrecomida, precio, descripcion, img) {
        this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img
    }
    /* Tengo pensado hacer que el "dueño" de la app pueda agregar comidas a gusto */
}


/* Etiquetas HTML traidas */
let carrito = [ /* comidas a pedir */ ]
let pedidosAnteriores = [ /* Pedidos viejos */ ]

let padre = document.getElementsByClassName("productos")[0]
const btnagregar = document.getElementById("btnagregar")
let contadorCarrito = document.getElementById("carrito-items")
let carritoTotal = document.getElementById("carritoTotal")
let btnCompra = document.getElementById("btnCompra")
const prdcrrito = document.getElementsByClassName("sec_carrito")[0]




/* Agrega los productos  */
mostrarProductos(comidas);

function mostrarProductos(array) {
    padre.innerHTML = "";
    array.forEach(comida => {

        let prod = document.createElement("div")
        prod.classList.add('producto')
        prod.innerHTML += `
                                        
                                        <div class="prodImg">
                                            <img src="${comida.img}" alt="">
                                        </div>
                                        <div class="info">
                                            <p id="prod${comida.id}" class="nombrecomidas">${comida.comida}</p>
                                            <p>${comida.descripcion}</p>
                                        </div>
                                        <div class="precio">
                                            <p>$${comida.precio}</p>
                                        </div>
                                        
                                `

        padre.appendChild(prod)



        prod.addEventListener("click", () => {
            abrirCompra(comida.id)

        })
    });
}

/* Al hacer Click agrega el producto al carrito y sale notificacion de producto agregado */
let suma = 1
btnagregar.addEventListener("click", () => {
    let prod = JSON.parse(localStorage.getItem("producto"))
    const cantcompra2 = document.getElementById("cantidadcompra").innerHTML
    console.log(cantcompra2)
    agregarCarrito(prod.id, cantcompra2)
    actualizarCarrito()
    document.getElementById("cantidadcompra").innerHTML = 1
    suma = 1
    salirCompra()
    Toastify({
        text: "Producto agregado al carrito!",
        duration: 3000,
        gravity: "bottom",
        position: "center",
        style: {
            background: "linear-gradient(90deg, rgba(168,42,0,1) 0%, rgba(222,93,19,1) 100%)",
        },
    }).showToast();


})

const btnmas = document.getElementsByClassName("botonchico")[1]
const btnmenos = document.getElementsByClassName("botonchico")[0]
const cantidadcompra = document.getElementById("cantidadcompra")

/* Sube o baja la cantidad de productos a pedir */
btnmas.onclick = () => {
    suma++
    cantidadcompra.innerHTML = suma
}
btnmenos.onclick = () => {
    if (suma != 1) {
        suma--
        cantidadcompra.innerHTML = suma
    }
}

/* agregar el producto clickeado al carrito */
function agregarCarrito(id, num) {
    let esta = carrito.find((item) => item.id == id)
    console.log("este es el id en agregar carrit" + id)
    if (esta) {
        esta.cantidad = +num
        document.getElementById(`prod${esta.id}`).innerHTML = ` <p id="prod${esta.id}"><b> ${esta.cantidad +" "+ esta.comida}</b></p>`

    } else {
        let prod = comidas.find((elemento) => elemento.id == id)
        if (num != 1) {
            prod.cantidad = num
        } else {
            prod.cantidad = 1 //le agrego una propiedad "cantidad"
        }
        console.log("entre en else")
        carrito.push(prod) // lo guardo en mi array

        cargarcarrito(prod)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* Carga el producto al carrito */
function cargarcarrito(prod) {
    const prdcrrito = document.getElementsByClassName("sec_carrito")[0]

    let produ = document.createElement("div")
    produ.classList.add('producto_carrito')
    let suma = 1
    let total = 0
    produ.innerHTML = `
                        <div class="producto_borrar">
                            <a href="javascript:void(0)" onclick="sacarProducto()">
                                <i class="fa-solid fa-xmark agarrar"></i>
                            </a>
                        </div>
                        <div class="carrito_img">
                            <img src="${prod.img}" alt="">
                        </div>
                        <div class="carrito-pedido-gustos-precio">
                            <div class="carrito-pedidogusto">

                                <p id="prod${prod.id}"><b> ${prod.cantidad +" "+ prod.comida}</b></p>
                                <p class="gustos">gustos (Ej: albaca, oregano etc)</p> 
                            </div>
                            <div class="carrito_precio">

                                <p>$${prod.precio*suma}</p>
                            </div>
                        </div>
                            `
    total += prod.precio * suma
    prdcrrito.appendChild(produ)
}

/* Borrar de carrito */

/* Boton de compra, borra el carrito y lo guarda en un array para pedidos anteriores con la fecha de compra */
btnCompra.onclick = () => {
    if (carrito != "") {
        let pedido = JSON.parse(localStorage.getItem("carrito")) 
        pedido.forEach(element => {
            element.fecha = DateTime.now().toLocaleString(DateTime.DATE_MED)
        });
        let pedidosAnteriores =  JSON.parse(localStorage.getItem("pedidosAnteriores")) 
        let pedido2 = pedido.concat(pedidosAnteriores) 
        localStorage.setItem("pedidosAnteriores", JSON.stringify(pedido2))
        carrito = []
        localStorage.setItem("carrito", JSON.stringify(carrito));
        SacarSecCarrito()
        actualizarCarrito()
        prdcrrito.innerHTML = ""
        Swal.fire({
            icon: 'success',
            title: 'Pedido Realizado!',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'No hay productos en el carrito!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

function relizarPedido(array) {



}


function actualizarCarrito() {
    //actualiza la cantidad de productos que hay en el carrito
    contadorCarrito.innerText = carrito.reduce((acc, el) => carrito.length, 0);
    //actualiza el precio
    document.getElementById("precioTotal").innerText = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
}


function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem("carrito")) || [] // si no existe, devuele null
    if (recuperarLS) {
        console.log(recuperarLS)
        recuperarLS.forEach((el) => {
            cargarcarrito(el);
            carrito.push(el);
            actualizarCarrito();
        });
    }
}

recuperar();