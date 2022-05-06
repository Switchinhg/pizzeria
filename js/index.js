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
const btnrepetirpedido = document.getElementById("btnrepetirpedido")
let contadorCarrito = document.getElementById("carrito-items")
let carritoTotal = document.getElementById("carritoTotal")
let btnCompra = document.getElementById("btnCompra")
const prdcrrito = document.getElementsByClassName("sec_carrito")[0]

/* Agrega los productos  */


const  mostrarProductos = async () => {
    const resp = await fetch('/JSON/pizzeria.json')
    const data = await resp.json()

    padre.innerHTML = "";
    data.forEach(comida => {

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
mostrarProductos();

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
btnmas.onclick = () => {suma++ , cantidadcompra.innerHTML = suma}
btnmenos.onclick = () => {if (suma != 1) suma-- , cantidadcompra.innerHTML = suma}

/* agregar el producto clickeado al carrito */
function agregarCarrito(id, num) {
    let esta = carrito.find((item) => item.id == id)
    console.log("este es el id en agregar carrit" + id)
    if (esta) {
        esta.cantidad = +num
        document.getElementById(`prod${esta.id}`).innerHTML = ` <p id="prod${esta.id}"><b> ${esta.cantidad +" "+ esta.comida}</b></p>`
    } else {
        let prod = comidas.find((elemento) => elemento.id == id)
        num != 1? prod.cantidad = num : prod.cantidad = 1 //le agrego una propiedad "cantidad"
        console.log("entre en else")
        carrito.push(prod) // lo guardo en mi array

        mostrarCarrito(prod)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


/* muestra el producto en el carrito y lo elimina si se apreta la cruz o disminuye la cantidad en 1 */
function mostrarCarrito(item) {
    let produ = document.createElement("div")
    produ.className = "producto_carrito"
    
    let suma = 1
    let total = 0
    produ.innerHTML = 
    `
            <div class="producto_borrar" id="eliminar${item.id}">
                <i class="fa-solid fa-xmark agarrar"></i>
            </div>

            <div class="carrito_img">
                <img src="${item.img}" alt="">
            </div>

            <div class="carrito-pedido-gustos-precio">
            <div class="carrito-pedidogusto">

                <p id="prod${item.id}"><b> ${item.cantidad +" "+ item.comida}</b></p>
                
            </div>
            <div class="carrito_precio">

                <p>$${item.precio*suma}</p>
                </div>
            </div>
            `
    total += item.precio * suma
    prdcrrito.appendChild(produ)

    let elim = document.getElementById(`eliminar${item.id}`)
    elim.addEventListener("click", ()=>{
        if(item.cantidad ==1){
            elim.parentElement.remove()
            carrito = carrito.filter((i)=> i.id != item.id)
            actualizarCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }else{
            item.cantidad --
            document.getElementById(`prod${item.id}`).innerHTML = `<p id="prod${item.id}"><b> ${item.cantidad +" "+ item.comida}</b></p>`
            actualizarCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
    })

}


/* Boton de compra, borra el carrito y lo guarda en un array para pedidos anteriores con la fecha de compra */
btnCompra.onclick = () => {
    if (carrito != "") {
        let pedido = JSON.parse(localStorage.getItem("carrito"))
        pedido.forEach(element => {
            element.fecha = DateTime.now().toLocaleString(DateTime.DATE_MED)
        });
        let pedidosAnteriores = JSON.parse(localStorage.getItem("pedidosAnteriores"))
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
        actualizarPedidosAnteriores(pedido2)
    } else {
        Swal.fire({
            icon: 'error',
            title: 'No hay productos en el carrito!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
const aasd = document.querySelector(".pAnteriores")
let pedidospasados = JSON.parse(localStorage.getItem("pedidosAnteriores"))
actualizarPedidosAnteriores(pedidospasados)
/* Al hacer click en realizar pedido lo agrega a pedidos anteriores */

function actualizarPedidosAnteriores(array){
    aasd.innerHTML = ""
    array.forEach(e => {
        let prod = document.createElement("div")
        prod.classList.add('pedido')
        prod.innerHTML +=`
                    <div class="prodImg">
                        <img src="${e.imgg}" alt="">
                    </div>
                    <div class="infoyFecha">
                        <p id="asd">${e.comida +" <br> Cantidad: "+ e.cantidad} </p>
                        <p>Pedido el: ${e.fecha}</p>
                    </div>
                    <div class="precio">
                        <p>$ ${e.precio*e.cantidad}</p>
                        <button class="boton2" id="btnrepetirpedido${e.id}">Repetir Pedido</button>
                    </div>      
        `

        aasd.appendChild(prod)

        btnrepetirpedido.addEventListener("click", () =>{
            agregarCarrito(e.id, e.cantidad)
            actualizarCarrito()
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
    });
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
            mostrarCarrito(el);
            carrito.push(el);
            actualizarCarrito();
        });
    }
}

recuperar();