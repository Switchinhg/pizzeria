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