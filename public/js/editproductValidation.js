function qs(element){
    return document.querySelector(element)
} 


let producto = qs('#nameProduct');
let price =qs("#price");
let marca =qs("#marca");
let discount =qs("#discount");
let stock =qs("#stock");
let description =qs("#description");
let select =qs("#select");
let form =qs(".form-register")
let FormError =qs("#FormError");
let productError =qs("#nameError");
let marcaError =qs("#marcaError");
let priceError =qs("#priceError");
let stockError =qs("#stockError");
let discError =qs("#discError");
let catError =qs("#catError");
let descripcionError =qs("#descripcionError");
let option = qs("#sinCateg")
let InputProduct = qs("#input-Product")
let ProductPreviw = qs("#ProductImage")
let ImageError = qs("#ImageError")


//>> Restricciones de Campos << //
regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/
var reg = new RegExp('^[0-9]*$');


    //>>>>>>>> Nombre Producto <<<<<<<<<<<<//

    producto.addEventListener("keypress" , function(e){
        if(!checkChar(e)){
            e.preventDefault();}
        });
    
    function checkChar(e){
        const char = String.fromCharCode(e.keyCode);
        const pattern = '[0-9a-zA-Z( )]';
    if(char.match(pattern)){
        return true }}

        producto.addEventListener("blur" , () => {
            switch (true) { 
                case !producto.value.trim():
                    productError.innerHTML= "Ingrese un Producto";
                    productError.classList.add("invalido")
                    break;
                case nameProduct.value.length < 3:
                    productError.innerHTML = "Nombre Invalido"
                    productError.classList.add("invalido");
                    break;
                default :
                    producto.classList.remove("invalido");
                    producto.classList.add("valido");
                    productError.innerHTML =""
                    break;
                }})

    //>>>>>>>>>>>>precio<<<<<<<<<<<<<//


        price.addEventListener("blur" , () => {
            switch (true) { 
                case !price.value.trim():
                    priceError.innerHTML= "Ingrese un monto valido";
                    price.classList.add("invalido")
                    break;
                case !reg.test(price.value):
                    priceError.innerHTML = "Valor Invalido"
                    price.classList.add("invalido");
                    break;
                default :
                    price.classList.remove("invalido");
                    price.classList.add("valido");
                    priceError.innerHTML =""
                    break;
                }})
    //>>>>>>>>>>>>> Marca <<<<<<<<<<<<<//


    marca.addEventListener("keypress" , function(e){
        if(!checkChar(e)){
            e.preventDefault();}
        });
    
    function checkChar(e){
        const char = String.fromCharCode(e.keyCode);
        const pattern = '[0-9a-zA-Z( )]';
    if(char.match(pattern)){
        return true }}

        marca.addEventListener("blur" , () => {
            switch (true) { 
                case !marca.value.trim():
                    marcaError.innerHTML= "Ingrese una marca";
                    marca.classList.add("invalido")
                    break;
                case !regExAlpha.test(marca.value):
                    marcaError.innerHTML ="Valor Invalido"
                    marca.classList.add("invalido");
                    break;
                default :
                    marca.classList.remove("invalido");
                    marca.classList.add("valido");
                    marcaError.innerHTML =""
                    break;
                }})

    //>>>>>>>>>>>>> Stock <<<<<<<<<<<<<//
        stock.addEventListener("blur" , () => {
            switch (true) { 
                case !stock.value.trim():
                    stockError.innerHTML= "Ingrese una cantidad";
                    stock.classList.add("invalido")
                    break;
                case !reg.test(stock.value):
                    stockError.innerHTML = "Valor Invalido"
                    stock.classList.add("invalido");
                    break;
                case stock.value === "0":
                    stockError.innerHTML = "Tiene que tener por lo menos 1 producto en stock"
                    stock.classList.add("invalido");
                    break;
                default :
                    stock.classList.remove("invalido");
                    stock.classList.add("valido");
                    stockError.innerHTML = ""
                    break;
                }})

                
    //>>>>>>>>>>>>> discount <<<<<<<<<<<<<//

    discount.addEventListener("blur" , () => {
        switch (true) { 
            case !discount.value.trim():
                discError.innerHTML = "Ingrese un valor";
                discount.classList.add("invalido")
                break;
            case !reg.test(discount.value) || discount.value.length > 3:
                discError.innerHTML ="Valor Invalido"
                discount.classList.add("invalido");
                break;
            case discount.value >= 100:
                discError.innerHTML = "No se puede aplicar descuento"
                discount.classList.add("invalido");
                break;
            default :
                discount.classList.remove("invalido");
                discount.classList.add("valido");
                discError.innerHTML =""
                break;
            }})
            
    //>>>>>>>>>>>>> description <<<<<<<<<<<<<//
    description.addEventListener("blur" , () => {
        switch (true) { 
            case !description.value.trim() || description.value.length < 10:
                descripcionError.innerHTML= "Ingrese una descripcion como mínimo de 10 palabras";
                description.classList.add("invalido")
                break;
            default :
                description.classList.remove("invalido");
                description.classList.add("valido");
                descripcionError.innerHTML =""
                break;
            }})
     //>>>>>>>>>>>>> Categoria <<<<<<<<<<<<<//
    
     select.addEventListener('blur' , () => {
        switch (true) {
            case select.value === "0" || select.value === "":
                catError.innerHTML = "Seleccione una categoria";
                catError.classList.add("invalido")
                break;
            default:
                select.classList.remove("invalido")
                select.classList.add("valido")
                catError.innerHTML = ""
                break;
        }
     })
        
           
//>>>>>>>>>>>>>>>>>>> submit <<<<<<<<<<<<<<<>><<<<<<<<<<<<<<<<<<<<<><//
          
        form.addEventListener("submit", function (event) {
            event.preventDefault()
            let elementsForm = this.elements
            console.log(elementsForm)
            let errors = false
       
            for (let i = 0; i < elementsForm.length ; i++) {
                if(elementsForm[i].value == ""
                && elementsForm[i].type !== "submit"
                && elementsForm[i].type !== "file"
                || elementsForm[i].classList.contains('invalido')) {
                   
                    elementsForm[i].classList.add('invalido')
//>>>>>>>>>>>>>>>Se aplica invalido al siguiente elemento , es decir los Small <<<<<<<<<<<<<<//
                    elementsForm[i].nextElementSibling.classList.add("invalido")
                     if(!elementsForm[i].nextElementSibling.classList.contains("admin")){
                    elementsForm[i].nextElementSibling.innerHTML ="Complete el campo"} 

                    errors = true
                    
                    }
                }
                if(!errors) {
                    form.submit()
                } else { 
                    alert("Se encontraron errores en el formulario")
                }
            })
        

        //>>>>>>>>>>> imagen <<<<<<<<<<<<<//

        InputProduct.addEventListener('change', 
            function fileValidation(){
            let filePath = InputProduct.value, 
                allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
	        //si la imagen no es valida//
            if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
                ImageError.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
                InputProduct.value = '';
                ProductPreviw.innerHTML = '';
            return false;
	        //si la imagen es valida//
            }else{
            // Image preview
            if(InputProduct.files && InputProduct.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                ProductPreviw.innerHTML = '<img src="' + e.target.result +'"style="width: 100%;"/>"';
                };
                reader.readAsDataURL(InputProduct.files[0]);
                ImageError.innerHTML = '';
                InputProduct.classList.remove('invalido')
            }
        }
    })
    
    
    /* form.addEventListener('change' , () => {
            if((producto , marca , price, stock ).classList.contains("valido")){
                form.lastElementChild.classList.remove("invalido")
                form.lastElementChild.innerHTML = ""
                FormError.classList.remove("invalido")         
                } 
            }) */
        /* let producto = this.productos.find(prod => prod.id === id);
        let productosDelCarrito = [];
        let productos = this.state.carrito.map((prod) => {
                switch (true) { 
                case prod.id === producto.id:
                    prod.cantidad = prod.cantidad + producto.cantidad;
                    productosDelCarrito.push(prod)
                    break;
                default :
                    productosDelCarrito.push(prod)
                    break;
                }})
        carrito:productosDelCarrito */
                    