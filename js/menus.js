function abrirCompra(id){

    let prod = comidas.find((elemento) => elemento.id == id)
    console.log(prod)
    document.getElementById("productoname").innerHTML = prod.comida
    document.getElementById("imgproducto").src = `${prod.imgg}`
    document.getElementById("nombreProducto").innerHTML = prod.comida
    document.getElementById("precioProducto").innerHTML = "$" + prod.precio
    document.getElementById("detalleprod").innerHTML = prod.descripcion

    localStorage.setItem("producto", JSON.stringify(prod))

    document.getElementsByClassName("pedido-wrap")[0].style.display = "flex"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"



}

function salirCompra(){
    document.getElementsByClassName("pedido-wrap")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementById("imgproducto").src= "./img/placeholder.png"


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
}

function abrircarrito() {

    document.getElementsByClassName("sec_sidebarCarrito")[0].style.display = "block"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"
}

/* click de los menús */

const cS = document.getElementById("cerrarSidebar")
const aC = document.getElementById("abrirCarrito")
const aC2 = document.getElementById("abrirCarrito2")
const pA = document.getElementById("pedidosAnteriores")
const Fa = document.getElementById("favoritos")
const mC = document.getElementById("miCuenta")
const nos = document.getElementById("nosotros")
const abSid = document.getElementById("abrirSidebar")
const saC = document.getElementById("SacarSecCarrito")
const salC = document.getElementById("salirCompra")


cS.onclick = () =>{
    cerrarSidebar()
}
aC.onclick = () =>{
    abrircarrito()
}
aC2.onclick = () =>{
    abrircarrito()
}
pA.onclick = ()=>{
    /* PedidosAnteriores(no hecho todavia) */
}
Fa.onclick = () =>{
    /* favoritos(no hecho todavia) */
}
mC.onclick = () =>{
    /* Mi cuenta (todavia no hecho) */
}
nos.onclick = () =>{
    /* nosotros (todavia no hecho) */
}
saC.onclick = () =>{
    SacarSecCarrito()
}
salC.onclick = () =>{
    salirCompra()
}

abSid.onclick = () =>{
    abrirSidebar()
}