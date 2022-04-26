class productos {
    constructor(id, nombrecomida, precio, descripcion, img) {
        this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img
    }


}
class carritos {
    constructor(id, nombrecomida, precio, descripcion, img, gustos, cantidad) {
        this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img,
            this.gustos = gustos,
            this.cantidad = cantidad
    }

}

let carrito = [ /* comidas a pedir */ ]

let padre = document.getElementsByClassName("productos")[0]
const btnagregar = document.getElementById("btnagregar")
let contadorCarrito = document.getElementById("carrito-items")
let carritoTotal = document.getElementById("carritoTotal")




/* Agrega los productos  */
mostrarProductos(comidas);

function mostrarProductos(array) {

    for (const comida of array) {

        let prod = document.createElement("div")
        prod.classList.add('producto')

        prod.innerHTML = `
                                
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

    }
}



/* Al hacer clic en un producto abre la la pantalla y carga el producto */





const variProductos = document.getElementsByClassName("producto")

for (const is of variProductos) {
        is.addEventListener("click", e =>{
            abrirCompra()
            
            for (const i of comidas) {
                const produclicked = document.getElementById(`prod${i.id}`)
                console.log(produclicked.id)
                if(produclicked.id === i.id){
                    document.getElementById("productoname").innerHTML = i.comida
                    document.getElementById("imgproducto").src = `${i.imgg}`
                    document.getElementById("nombreProducto").innerHTML = i.comida
                    document.getElementById("precioProducto").innerHTML = "$" + i.precio
                    document.getElementById("detalleprod").innerHTML = i.descripcion

                    btnagregar.addEventListener("click", () => {
                        agregarCarrito(i.id)
        
                            //buscamos el producto en nuestra BD
                        let productoAgregar = comidas.find((elemento) => elemento.id == i.id)
                        let prod = comidas.find((elemento) => elemento.id == i.id)
                        localStorage.setItem("producto", JSON.stringify(productoAgregar))
                    }) 

                }
                
            }
        })
}


/* for (const i of variProductos) {
    i.addEventListener("click", e => {
        const ClickComida = i.getElementsByClassName("nombrecomidas")[0].innerHTML
        abrirCompra()
        const precioProducto = 0
        const infoProducto = ""
        for (const i of comidas) {

            if (i.comida == ClickComida) {
                document.getElementById("productoname").innerHTML = i.comida
                document.getElementById("imgproducto").src = `${i.imgg}`
                document.getElementById("nombreProducto").innerHTML = i.comida
                document.getElementById("precioProducto").innerHTML = "$" + i.precio
                document.getElementById("detalleprod").innerHTML = i.descripcion

                
                /*  Que hace? Agregar 
                btnagregar.addEventListener("click", () => {
                    agregarCarrito(i.id)
    
                        //buscamos el producto en nuestra BD
                    let productoAgregar = comidas.find((elemento) => elemento.id == i.id)
                    let prod = comidas.find((elemento) => elemento.id == i.id)
                    localStorage.setItem("producto", JSON.stringify(productoAgregar))
                }) 

            }
        }
        

    })
} */

/* agregar el producto clickeado al carrito */
function agregarCarrito(id) {

    let esta = carrito.find((item) => item.id == id)
    if (esta) { // se va al else con -> false, null, undefind y " " 
        esta.cantidad = esta.cantidad + 1;
        
        console.log(esta.cantidad + "entre a agregar carrito")
        /* Continuar */
        document.getElementById(`prod${esta.id}`).innerHTML = ` <p id="prod${esta.id}"><b> ${esta.cantidad +" "+ esta.comida}</b></p>`
        actualizarCarrito();

    } else {
        let prod = comidas.find((elemento) => elemento.id == id)
        prod.cantidad = 1 //le agrego una propiedad "cantidad"

        carrito.push(prod) // lo guardo en mi array

        /*  actualizarCarrito() */
        actualizarCarrito();
        cargarcarrito(prod)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


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

function actualizarCarrito() {
     //actualiza la cantidad de productos que hay en el carrito
    contadorCarrito.innerText = carrito.reduce((acc, el) => carrito.length,0);
    //actualiza el precio
    document.getElementById("precioTotal").innerText = carrito.reduce((acc, el) => acc + el.precio * el.cantidad,0)    
}


function recuperar() {
    let recuperarLS = JSON.parse(localStorage.getItem("carrito")); // si no existe, devuele null
    console.log("entre en recuperer")
    if (recuperarLS) {
        console.log(recuperarLS)
        recuperarLS.forEach((el) => {
            cargarcarrito(el);
            console.log("soy el EL de recuperar",el)
            carrito.push(el);
            actualizarCarrito();
        });
    }
}

recuperar();