
    class productos{
        constructor(id,nombrecomida, precio, descripcion, img ){
            this.id = id,
            this.nombrecomida = nombrecomida,
            this.precio = precio,
            this.descripcion = descripcion,
            this.img = img
        }

        

    } 

    const comidas = []
            comidas.push(new productos(1,"Muzzarella", 170, "Porción de pizza con salsa de tomate, cubierta con ezquisita muzzarella", "./img/muzzarella.png"))
            comidas.push(new productos(2,"Muzzarella a caballo", 265, "Porción de muzzarella + Porción de fainá 'a caballo'", "./img/musarellaCaballo.png"))
            comidas.push(new productos(3,"Fugazzeta", 170, "Porción de pizza con cebolla picada y pequeños trozos de jamón y panceta, cubierta por una capa de exquisita muzzarella", "./img/fugazzeta.png"))
            comidas.push(new productos(4,"Pizza", 95, "Porción de pizza con salsa artesanal, elaborada con tomates seleccionados de baja acidez y buena maduración", "./img/pizza.png"))
            comidas.push(new productos(5,"Fainá", 95, "Porción de fainá, hecho con harina de garbanzo, horneado en una exclusiva bandeja de cobre", "./img/faina.png"))
            comidas.push(new productos(6,"Fainá con muzzarella", 170, "Porción de fainá con una exquisita capa de muzzarella", "./img/fainaMuzarella.png"))
    
    
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

                    console.log("entre pero no hice nada se ve xd")
        padre.appendChild(prod)

    }



