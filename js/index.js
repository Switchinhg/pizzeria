let DateTime = luxon.DateTime;


let carrito = [ /* comidas a pedir */ ]
let pedidosAnteriores = [ /* Pedidos viejos */ ]
/* guardar el cliente en el local storage */
let cliente = {
    nombre: "Usuario",
    direccion: "N/A",
    apto: "N/A",
    email: "N/A",
    telefono: "N/A"
}



/* Etiquetas HTML traidas */

let padre = document.getElementsByClassName("productos")[0]
const btnagregar = document.getElementById("btnagregar")
const btnrepetirpedido = document.getElementById("btnrepetirpedido")
let contadorCarrito = document.getElementById("carrito-items")
let carritoTotal = document.getElementById("carritoTotal")
let btnCompra = document.getElementById("btnCompra")
const prdcrrito = document.getElementsByClassName("sec_carrito")[0]
const Usuario = document.getElementById("us2")


/* Agrega los productos  */


const mostrarProductos = async () => {
    const respuesta = await fetch('./JSON/pizzeria.json')
    const info = await respuesta.json()

    padre.innerHTML = "";
    info.forEach(comida => {

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
    suma++, cantidadcompra.innerHTML = suma
}
btnmenos.onclick = () => {
    if (suma != 1) suma--, cantidadcompra.innerHTML = suma
}

/* agregar el producto clickeado al carrito */
function agregarCarrito(id, num) {
    let esta = carrito.find((item) => item.id == id)
    if (esta) {
        esta.cantidad = +num
        document.getElementById(`prod${esta.id}`).innerHTML = ` <p id="prod${esta.id}"><b> ${esta.cantidad +" "+ esta.comida}</b></p>`
    } else {
        let prod = comidas.find((elemento) => elemento.id == id)
        num != 1 ? prod.cantidad = num : prod.cantidad = 1 //le agrego una propiedad "cantidad"
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
    elim.addEventListener("click", () => {
        if (item.cantidad == 1) {
            elim.parentElement.remove()
            carrito = carrito.filter((i) => i.id != item.id)
            actualizarCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito))
        } else {
            item.cantidad--
            document.getElementById(`prod${item.id}`).innerHTML = `<p id="prod${item.id}"><b> ${item.cantidad +" "+ item.comida}</b></p>`
            actualizarCarrito()
            localStorage.setItem("carrito", JSON.stringify(carrito))
        }
    })

}


/* Boton de compra, chequea que exista algun usuario,
 luego borra el carrito y lo guarda en un array para pedidos anteriores con la fecha de compra */
btnCompra.onclick = () => {
    let usuarioCheck = JSON.parse(localStorage.getItem("cliente"))
    if (usuarioCheck && usuarioCheck.direccion != "N/A") {

        if (carrito != "") {
            carrito.forEach(element => {
                element.fecha = DateTime.now().toLocaleString(DateTime.DATETIME_MED)
            });
            let pedidosAnteriores = JSON.parse(localStorage.getItem("pedidosAnteriores"))

            if (pedidosAnteriores) {
                let pedido = carrito.concat(pedidosAnteriores)
                localStorage.setItem("pedidosAnteriores", JSON.stringify(pedido))
                actualizarPedidosAnteriores(pedido)
            } else {
                localStorage.setItem("pedidosAnteriores", JSON.stringify(carrito))
                actualizarPedidosAnteriores(carrito)
            }



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

            let recuperarUsu = JSON.parse(localStorage.getItem("cliente"))

            let params = {
                nombre: recuperarUsu.nombre,
                dir: recuperarUsu.direccion,
            };
            emailjs.send("service_civn85j", "template_fu32the", params);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No hay productos en el carrito!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Proporciona tu dirección y teléfono para pedir comida!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
const aasd = document.querySelector(".pAnteriores")
let pedidospasados = JSON.parse(localStorage.getItem("pedidosAnteriores"))

actualizarPedidosAnteriores(pedidospasados)
/* Al hacer click en realizar pedido lo agrega a pedidos anteriores */


function actualizarPedidosAnteriores(array) {
    aasd.innerHTML = ""
    let num = 1
    if (array) {
        array.forEach(i => {

            let prod = document.createElement("div")
            prod.classList.add('pedido')
            prod.innerHTML += `
                    <div class="prodImg">
                        <img src="${i.img}" alt="">
                    </div>
                    <div class="infoyFecha">
                        <p id="asd">${i.comida +" <br> Cantidad: "+ i.cantidad} </p>
                        <p>Pedido el: ${i.fecha}</p>
                    </div>
                    <div class="precio">
                        <p>$ ${i.precio*i.cantidad}</p>
                        <button class="boton2" id="btnrepetirpedido${num}">Agregar a Carrito</button>
                    </div>      
        `

            aasd.appendChild(prod)
            let asd = document.getElementById(`btnrepetirpedido${num}`)

            asd.onclick = () => {
                agregarCarrito(i.id, i.cantidad)
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
            }
            num++
        })
    }

}


/* Cambiar nombre de usuario */
Usuario.addEventListener("click", () => {
    let asd = document.getElementsByClassName("nombreUsuario")
    let a = (async () => {

        const {
            value: nombre
        } = await Swal.fire({
            title: 'Escriba su nombre:',
            input: 'text',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Tienes que escribir algo!'
                } else {
                    for (let i = 0; i < asd.length; i++) {
                        asd[i].innerText = value
                    }
                    cliente.nombre = value
                    let clent = JSON.parse(localStorage.getItem("cliente"))
                    if (clent) {
                        clent.nombre = value
                        localStorage.setItem("cliente", JSON.stringify(clent))
                    } else {
                        clent = cliente
                        clent.nombre = value
                        localStorage.setItem("cliente", JSON.stringify(clent))
                    }

                }

            }
        })
    })()
})

/* Agrega la info del usuario cuando se sale del modal */
function agregarInfo(algo) {
    let direccion = document.getElementsByClassName("direccion")[0]
    direccion.innerHTML = ""
    let usdir = document.createElement("div")
    usdir.classList.add('producto')
    usdir.innerHTML = `
                        <div class="dataCliente">
                            <div class="infocliente">
                                <p id="dirCliente"><b>Dirección:</b> ${algo.direccion}</p>
                                <p id="AptoCliente"><b>Apto:</b>  ${algo.apto}</p>
                            </div>
                            <div class="infocliente">
                                <p id="emailCliente"><b>Email:</b> ${algo.email}</p>
                                <p id="TelCliente"><b>Teléfono:</b> ${algo.telefono}</p>
                            </div>
                            <button id="btndir" class="boton">Agregar/cambiar </button>
                        </div> 
                            `
    direccion.appendChild(usdir)
}

/* Cuando se presiona click en  guardar direccion se guardan los datos y se borra lo escrito en los 
inputs */
form.addEventListener("submit", (e) => {
    let usuario = JSON.parse(localStorage.getItem("cliente"))

    cliente.direccion = document.getElementById("direccion").value
    cliente.apto = document.getElementById("apto").value
    cliente.email = document.getElementById("Email").value
    cliente.telefono = document.getElementById("Telefono").value
    if (cliente.nombre && usuario) {
        cliente.nombre = usuario.nombre
    }
    localStorage.setItem("cliente", JSON.stringify(cliente));


    agregarInfo(cliente)

    document.getElementById("direccion").value = ''
    document.getElementById("apto").value = ''
    document.getElementById("Email").value = ''
    document.getElementById("Telefono").value = ''

    modal.classList.toggle("modall-active")
    Swal.fire({
        icon: 'success',
        title: 'Dirección agregada!',
        showConfirmButton: false,
        timer: 1500
    })
    

})



function actualizarCarrito() {
    //actualiza la cantidad de productos que hay en el carrito
    contadorCarrito.innerText = carrito.reduce((acc, el) => carrito.length, 0);
    //actualiza el precio
    document.getElementById("precioTotal").innerText = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0)
}

function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem("carrito")) || [] // si no existe, devuele null
    if (recuperarLS) {
        recuperarLS.forEach((el) => {
            mostrarCarrito(el);
            carrito.push(el);
            actualizarCarrito();
        });
    }
    let recuperarUsu = JSON.parse(localStorage.getItem("cliente")) || {}

    if (recuperarUsu) {
        if (recuperarUsu.nombre != "usuario" && recuperarUsu.nombre) {
            let asd = document.getElementsByClassName("nombreUsuario")
            for (let i = 0; i < asd.length; i++) {
                asd[i].innerText = recuperarUsu.nombre
            }
        }
        if (recuperarUsu.direccion != "N/A" && recuperarUsu.direccion) {
            agregarInfo(recuperarUsu)
        }
        /* localStorage.setItem("cliente", JSON.stringify(cliente)); */
    }



}

recuperar();