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
    constructor(id, nombrecomida, precio, descripcion, img) {
        this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img
    }



}
const carrito = [ /* comidas a pedir */ ]

const comidas = [{
        id: 1,
        nombrecomida: "Muzzarella",
        precio: 170,
        descripcion: "Porción de pizza con salsa de tomate, cubierta con ezquisita muzzarella",
        img: "./img/muzzarella.png",
        imgg: "./img/muzzarellaGrande.png"
    },
    {
        id: 2,
        nombrecomida: "Muzzarella a caballo",
        precio: 265,
        descripcion: "Porción de muzzarella + Porción de fainá 'a caballo'",
        img: "./img/musarellaCaballo.png",
        imgg: "./img/musarellaCaballoGrande.png"
    },
    {
        id: 3,
        nombrecomida: "Fugazzeta",
        precio: 170,
        descripcion: "Porción de pizza con cebolla picada y pequeños trozos de jamón y panceta, cubierta por una capa de exquisita muzzarella",
        img: "./img/fugazzeta.png",
        imgg: "./img/fugazzetaGrande.png"
    },
    {
        id: 4,
        nombrecomida: "Pizza",
        precio: 95,
        descripcion: "Porción de pizza con salsa artesanal, elaborada con tomates seleccionados de baja acidez y buena maduración",
        img: "./img/pizza.png",
        imgg: "./img/pizzaGrande.png"
    },
    {
        id: 5,
        nombrecomida: "Fainá",
        precio: 95,
        descripcion: "Porción de fainá, hecho con harina de garbanzo, horneado en una exclusiva bandeja de cobre",
        img: "./img/faina.png",
        imgg: "./img/fainaGrande.png"
    },
    {
        id: 6,
        nombrecomida: "Fainá con muzzarella",
        precio: 170,
        descripcion: "Porción de fainá con una exquisita capa de muzzarella",
        img: "./img/fainaMuzarella.png",
        imgg: "./img/fainaMuzzarellaGrande.png"
    },
]


/*  comidas.push(new productos(1,"Muzzarella", 170, "Porción de pizza con salsa de tomate, cubierta con ezquisita muzzarella", "./img/muzzarella.png")) EJEMPLO DE PUSH PORQUE VOY A AGREGAR QUE EL DUEÑO AGREGUE COMIDAS*/

let padre = document.getElementsByClassName("productos")[0]
for (const comida of comidas) {




    let prod = document.createElement("div")
    prod.classList.add('producto')

    prod.innerHTML = `
                            
                            <div class="prodImg">
                                <img src="${comida.img}" alt="">
                            </div>
                            <div class="info">
                                <p class="nombrecomidas">${comida.nombrecomida}</p>
                                <p>${comida.descripcion}</p>
                            </div>
                            <div class="precio">
                                <p>$${comida.precio}</p>
                            </div>
                            
                    `

    padre.appendChild(prod)

}



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

const btnagregar = document.getElementById("btnagregar")
btnagregar.onclick = () => {
    const nmb = document.getElementById("productoname").innerHTML
    localStorage.setItem(nmb, suma)

    const prdcrrito = document.getElementsByClassName("sec_carrito")[0]

    for (const i of comidas) {
        if (i.nombrecomida == nmb) {
            let prod = document.createElement("div")
            prod.classList.add('producto_carrito')

            prod.innerHTML = `
                                    
                        <div class="producto_borrar">
                            <a href="javascript:void(0)" onclick="sacarProducto()">
                                <i class="fa-solid fa-xmark"></i>
                            </a>
                        </div>
                        <div class="carrito_img">
                            <img src="./img/faina.png" alt="">
                        </div>
                        <div class="carrito-pedido-gustos-precio">
                            <div class="carrito-pedidogusto">

                                <p><b> ${suma +" "+ i.nombrecomida}</b></p>
                                 <p class="gustos">gustos (Ej: albaca, oregano etc)</p> 
                            </div>
                            <div class="carrito_precio">

                                <p>$${i.precio*suma}</p>
                            </div>
                        </div>
                                    
                            `
                            prdcrrito.appendChild(prod)

        }

    }
    salirCompra()
}