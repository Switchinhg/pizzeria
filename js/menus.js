function abrirCompra(){
    document.getElementsByClassName("pedido-wrap")[0].style.display = "flex"
    document.getElementById("body").style.overflow = "hidden"
    document.getElementById("header-sidebar").style.left = "-250px"
}
function salirCompra(){
    document.getElementsByClassName("pedido-wrap")[0].style.display = "none"
    document.getElementById("body").style.overflow = "auto"
    document.getElementById("imgproducto").src= "./img/placeholder.png"
    suma =1
    cantidadcompra.innerHTML = suma
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