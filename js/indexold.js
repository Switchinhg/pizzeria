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
const carrito = [ /* comidas a pedir */ ]



/*  comidas.push(new productos(1,"Muzzarella", 170, "Porción de pizza con salsa de tomate, cubierta con ezquisita muzzarella", "./img/muzzarella.png")) EJEMPLO DE PUSH PORQUE VOY A AGREGAR QUE EL DUEÑO AGREGUE COMIDAS*/





/* Agarra cual comida fue seleccionada para pedirla y cambia los datos a la pantalla */

const variProductos = document.getElementsByClassName("producto")

for (const i of variProductos) {
    i.addEventListener("click", e => {
        const ClickComida = i.getElementsByClassName("nombrecomidas")[0].innerHTML
        abrirCompra()
        const precioProducto = 0
        const infoProducto = ""
        for (const i of comidas) {
            if (i.nombrecomida == ClickComida) {
                document.getElementById("productoname").innerHTML = ClickComida
                document.getElementById("imgproducto").src = `${i.imgg}`
                document.getElementById("nombreProducto").innerHTML = ClickComida
                document.getElementById("precioProducto").innerHTML = "$" + i.precio
                document.getElementById("detalleprod").innerHTML = i.descripcion
            }
        }

    })
}

const btnmas = document.getElementsByClassName("botonchico")[1]
const btnmenos = document.getElementsByClassName("botonchico")[0]
const cantidadcompra = document.getElementById("cantidadcompra")

let suma = 1

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

/* Cuando apreta el boton comprar lo pone en el carrito */


btnagregar.onclick = () => {
    const nmb = document.getElementById("productoname").innerHTML
    localStorage.setItem(nmb, suma)
    
    const prdcrrito = document.getElementsByClassName("sec_carrito")[0]

    for (const i of comidas) {
        if (i.nombrecomida == nmb) {


                            /* agrega lo elegido a comprar en el array carrito */
            carrito.push(new carritos(1, i.nombrecomida, i.precio * suma, i.descripcion, i.img, i.gustos , suma))
                /* guarda el array como json */
                
                const carritoJSON = JSON.stringify(carrito)
                localStorage.setItem("carritoJSON" , carritoJSON)
                actualizarcarritonavbar()
                

        }

    }
    salirCompra()
}

const loadcarrito = document.getElementsByClassName("loadcarrito")

for(let i =0 ; i<loadcarrito.length; i++){
    loadcarrito[i].addEventListener("click", e => {
    cargarcarrito()
})
}

actualizarcarritonavbar()


function cargarcarrito() {

    

        
        const prodJSON = localStorage.getItem("carritoJSON")
        const prodJSONobject = JSON.parse(prodJSON)

        let total = 0
        
        for (const i of prodJSONobject) {
            
            
            const prdcrrito = document.getElementsByClassName("sec_carrito")[0]
            
                let prod = document.createElement("div")
                prod.classList.add('producto_carrito')
                
                prod.innerHTML = `
                                        
                            <div class="producto_borrar">
                                <a href="javascript:void(0)" onclick="sacarProducto()">
                                    <i class="fa-solid fa-xmark agarrar"></i>
                                </a>
                            </div>
                            <div class="carrito_img">
                                <img src="${i.img}" alt="">
                            </div>
                            <div class="carrito-pedido-gustos-precio">
                                <div class="carrito-pedidogusto">
    
                                    <p><b> ${i.cantidad +" "+ i.nombrecomida}</b></p>
                                    <p class="gustos">gustos (Ej: albaca, oregano etc)</p> 
                                </div>
                                <div class="carrito_precio">
    
                                    <p>$${i.precio*suma}</p>
                                </div>
                            </div>
                                        
                                `
                                total += i.precio*suma 
                                prdcrrito.appendChild(prod)
                                document.getElementById("carritoTotal").innerHTML = "Total: <span style='color:rgb(7, 167, 7)'>$" + total + "</span>"
                                

            
        }
}

function actualizarcarritonavbar(){

    const prodJSON = localStorage.getItem("carritoJSON")
    const prodJSONobject = JSON.parse(prodJSON)

    document.getElementById("carrito-items").innerHTML =prodJSONobject.length
}

/* borrar el carrito cada vez que sale, para evitar que se buge */

const prdcrrito = document.getElementsByClassName("sec_carrito")[0]

const salircarrito = document.getElementById("salircarrito")
salircarrito.addEventListener("click", e =>{
    prdcrrito.innerHTML = ""
})


const xs = document.getElementsByClassName('agarrar')
function sacarProducto() {



    for(let i =0 ; i<xs.length; i++){
        xs[i].addEventListener("click", e => {
            e.currentTarget.parentNode.parentNode.parentNode.remove()
    })
    }


    /* return this.parentNode.remove()
    /* return this.parentNode.remove(); */ 
    
}


