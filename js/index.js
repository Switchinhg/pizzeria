
    class productos{
        constructor(id,nombrecomida, precio, descripcion, img ){
            this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img
        }

    } 
    class carritos{
        constructor(id,nombrecomida, precio, descripcion, img ){
            this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img
        }



    }
    const carrito = [/* comidas a pedir */]

    const comidas = [{id: 1,nombrecomida:"Muzzarella",precio: 170,descripcion: "Porción de pizza con salsa de tomate, cubierta con ezquisita muzzarella", img:"./img/muzzarella.png"},
                    {id: 2,nombrecomida:"Muzzarella a caballo",precio: 265,descripcion: "Porción de muzzarella + Porción de fainá 'a caballo'", img:"./img/musarellaCaballo.png"},
                    {id: 3,nombrecomida:"Fugazzeta",precio: 170,descripcion: "Porción de pizza con cebolla picada y pequeños trozos de jamón y panceta, cubierta por una capa de exquisita muzzarella", img:"./img/fugazzeta.png"},
                    {id: 4,nombrecomida:"Pizza",precio: 95,descripcion: "Porción de pizza con salsa artesanal, elaborada con tomates seleccionados de baja acidez y buena maduración", img:"./img/pizza.png"},
                    {id: 5,nombrecomida:"Fainá",precio: 95,descripcion: "Porción de fainá, hecho con harina de garbanzo, horneado en una exclusiva bandeja de cobre", img:"./img/faina.png"},
                    {id: 6,nombrecomida:"Fainá con muzzarella",precio: 170,descripcion: "Porción de fainá con una exquisita capa de muzzarella", img:"./img/fainaMuzarella.png"},
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
                                <p>${comida.nombrecomida}</p>
                                <p>${comida.descripcion}</p>
                            </div>
                            <div class="precio">
                                <p>$${comida.precio}</p>
                            </div>
                    `

        padre.appendChild(prod)

    }



