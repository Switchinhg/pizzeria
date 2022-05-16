function abrirCompra(id) {

    let prod = comidas.find((elemento) => elemento.id == id)
    document.getElementById("productoname").innerHTML = prod.comida
    document.getElementById("imgproducto").src = `${prod.imgg}`
    document.getElementById("nombreProducto").innerHTML = prod.comida
    document.getElementById("precioProducto").innerHTML = "$" + prod.precio
    document.getElementById("detalleprod").innerHTML = prod.descripcion

    localStorage.setItem("producto", JSON.stringify(prod))

    document.getElementById("body").style.overflow = "hidden"
    document.getElementsByClassName("pedido-wrap")[0].style.display = "flex"
    document.getElementById("header-sidebar").style.left = "-250px"
    document.getElementsByClassName("productos-wrap")[0].style.display = "none"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "none"
}

function salirCompra() {
    document.getElementsByClassName("pedido-wrap")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementById("imgproducto").src = "./img/placeholder.png"
    document.getElementsByClassName("productos-wrap")[0].style.display = "flex"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "block"


}

function abrirSidebar() {
    document.getElementById("header-sidebar").style.left = "0"

}

function cerrarSidebar() {
    document.getElementById("header-sidebar").style.left = "-250px"
}

function SacarSecCarrito() {
    document.getElementsByClassName("sec_sidebarCarrito")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementsByClassName("productos-wrap")[0].style.display = "flex"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "block"

}

function abrircarrito() {

    document.getElementsByClassName("sec_sidebarCarrito")[0].style.display = "block"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"

    document.getElementsByClassName("productos-wrap")[0].style.display = "none"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "none"
}

function abrirPedidosAnteriores() {

    document.getElementsByClassName("prodAnteriores")[0].style.display = "flex"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"
    document.getElementsByClassName("productos-wrap")[0].style.display = "none"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "none"
}

function cerrarPedidosAnteriores() {
    document.getElementsByClassName("prodAnteriores")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementsByClassName("productos-wrap")[0].style.display = "flex"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "block"
}

function AbrirMiCuenta() {
    document.getElementsByClassName("miCuentaSec")[0].style.display = "block"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"
    document.getElementsByClassName("productos-wrap")[0].style.display = "none"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "none"
}

function CerrarMiCuenta() {
    document.getElementsByClassName("miCuentaSec")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementsByClassName("productos-wrap")[0].style.display = "flex"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "block"
}

function abrirSecNos() {
    document.getElementsByClassName("sobreNosWrapper")[0].style.display = "block"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"
    document.getElementsByClassName("productos-wrap")[0].style.display = "none"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "none"
    document.getElementById("idk").style.display = "none"
}

function salirSecNos() {
    document.getElementsByClassName("sobreNosWrapper")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementsByClassName("productos-wrap")[0].style.display = "flex"
    document.getElementsByClassName("body-carousel-area")[0].style.display = "block"
    document.getElementById("idk").style.display = "block"
}
/* click de los menús */

const cS = document.getElementById("cerrarSidebar")
const aC = document.getElementById("abrirCarrito")
const aC2 = document.getElementById("abrirCarrito2")
const pA = document.getElementById("pedidosAnteriores")
const mC = document.getElementById("miCuenta")
const nos = document.getElementById("nosotros")
const salnos = document.getElementById("salirNos")
const abSid = document.getElementById("abrirSidebar")
const saC = document.getElementById("SacarSecCarrito")
const salC = document.getElementById("salirCompra")
const spa = document.getElementById("salirProdsAnteriores")
const Cuenta = document.getElementById("miCuenta")
const cCuenta = document.getElementById("salirCuenta")
const form = document.getElementById("form")
/* Datos de usuario */


cS.onclick = () => {
    cerrarSidebar()
}
aC.onclick = () => {
    abrircarrito()
}
aC2.onclick = () => {
    abrircarrito()
}
nos.onclick = () => {
    abrirSecNos()
}
salnos.onclick = () => {
    salirSecNos()
}
saC.onclick = () => {
    SacarSecCarrito()
}
salC.onclick = () => {
    salirCompra()
}

abSid.onclick = () => {
    abrirSidebar()
}

pA.onclick = () => {
    abrirPedidosAnteriores()

}
spa.onclick = () => {
    cerrarPedidosAnteriores()
}

Cuenta.onclick = () => {
    AbrirMiCuenta()
}
cCuenta.onclick = () => {
    CerrarMiCuenta()
}

/* modal */
let modal = document.getElementById("miModal")
let btndir = document.getElementById("btndir")

btndir.onclick = () => {
    modal.classList.toggle("modall-active")
}
modal.onclick = () => {
    modal.classList.toggle("modall-active")
}
let a = document.getElementsByClassName("modalContenido")[0]
a.addEventListener("click", (e) => {
    e.stopPropagation()
})