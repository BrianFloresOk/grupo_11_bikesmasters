

let direccion = document.querySelector("input#direccion")
let newDireccion = document.querySelector("input#newdireccion")
let SessionId = document.querySelector('div.inline').getAttribute("target")
let productos = document.querySelectorAll('div.producto-pedido')
let carrito = localStorage.getItem('carrito')
let Precios = document.querySelectorAll('.colum-price')
let btnVaciar = document.querySelector('button#vaciar-carrito')
let btnDelete = document.querySelectorAll('button.delete');
let ProdPrice = document.querySelectorAll('p.subtotal')
let AllPrices = document.querySelector('b#subTotal')
let inputEfectivo = document.querySelector('input#pago_efectivo')
let inputtarjeta = document.querySelector('input#pago_tarjeta')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


    let carro = []
    JSON.parse(carrito).forEach(item =>{

/* --------------Productos a Mostrar---------------------------- */
    productos.forEach(product=>{
    let product_id = product.getAttribute("target");

        if(item== product_id){
        product.style.display="flex"
            console.log(product)
            }
        })
    
/* ---------------------------Precio--------------------------- */
        
    ProdPrice.forEach(t => {
               
        if(item==(t.getAttribute("target"))){
            carro.push((t.textContent).replace(("$"),("")))
            }   })
            console.log(carro)
        if(carro.length >= 1){
           AllPrices.innerHTML=toThousand(carro.reduce((a,b) => {return Number(+a - -b) }))
            }    
        })
     
 /* --------------Precio al Cambiar las Cantidades--------------- */
 
    productos.forEach((product)=>{
        let price = Number(product.children[1].getAttribute("target"))
        let select = product.children[2];
        let Total = product.children[3];
        Total.innerHTML= toThousand(price)
        
/* --------------SI CAMBIA EL PRODUCTO------------------------ */
        if(product.style.display !== "none"){
        product.onchange = function() {
        Total.innerHTML = "$" + toThousand(+select.value * price)
        let carro=[]
        
        ProdPrice.forEach(t => {
        JSON.parse(carrito).forEach(item =>{ 
            if(item ==(t.getAttribute("target"))){
                carro.push((t.textContent).replace("." , "").replace(("$"),("")))    
            }   })  })
        AllPrices.innerHTML=toThousand(carro.reduce((a,b) => {return Number(+a + +b) }))
            console.log(carro) 
        }}       
        })

    
/* ------------------Boton para Vaciar Carro----------------------- */
        btnVaciar.addEventListener('click' , () => {
        let carrito = new Array();
        AllPrices.innerHTML ="0"
        localStorage.setItem("carrito", JSON.stringify(carrito));
        productos.forEach(product=>{
            product.style.display="none"})
        })
/* ----------------Boton para eliminar Producto--------------------- */
        let items = JSON.parse(carrito);

        btnDelete.forEach(btn => {
        btn.addEventListener('click' , (e) => {
            let ProductDelete = +btn.getAttribute("target")
            
            for (let i = 0; i < items.length; i++) {
            if(items[i] == ProductDelete){
                items.splice(i,1);
            break;
            }  
        }

/* ------------------ACTUUALIZAR EL PRECIO FINAL--------------------- */
            let resta = btn.previousElementSibling.textContent.replace("." , "").replace(("$"),(""))
            let precioFinal = (AllPrices.textContent.replace("." , "").replace("." , "").replace(("$"),("")))
            AllPrices.innerHTML=toThousand(Number(precioFinal-resta))
            console.log(items + " item")
            console.log(resta + " restaa")
            console.log(precioFinal + "precioFInal")
            localStorage.setItem("carrito",JSON.stringify(items)) 
            btn.parentElement.style.display="none"

            })
        
            })


/* -------------------------------------------------------------- */
/* req.session.id */
function redirect(){
    window.location.href = "http://localhost:4000/usuario/perfil/agregar/direccion/:id";
}

function Direccion(msg) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: false,
        timerProgressBar: false,
        html:`
        <div class="div-btn-direccion">
        <button class="btns-direccion" onClick="redirect()" >
        Añadir Direccion
        </button>
        <button class="btns-direccion" >
        Omitir
        </button></div>`,
        buttonsStyling:true,
        allowOutsideClick:true
        
      })              
      Toast.fire({
        icon: 'warning',
        title: `${msg}`
      })
}

fetch("http://localhost:4000/api/Usuario")
    .then((response)=>response.json())
    .then((data)=>{ 
        let user = data.data.find((user) => {if(user.id == SessionId){return user}}) 
        console.log(SessionId)
        direccion.addEventListener('click' ,(e) =>{
        if(user.direccion_id == null){
            Direccion("direccion no registrada")
            e.preventDefault()
        }
    })
        
    })
    .catch((error)=> console.log(error))

/* ------------------------------------------------------ */
 
      
        


newDireccion.addEventListener('click' , (e)=>{
    e.preventDefault()
    function direccionNew(){

        const { value: formValues } = Swal.fire({
            title: 'Direccion',
            html:
            '<div class="newDireccion">'+
              '<label id="">Nueva Direccion</label><input id="swal-input1" class="swal2-input">' +
              '<label id="">Quien lo Recibe?</label><input id="swal-input2" class="swal2-input">'+
            '</div>',
            buttonsStyling:true,
            focusConfirm: false, 
            showCancelButton: true,        
            preConfirm: () => {
                if(document.getElementById('swal-input1').value == "" ||
                document.getElementById('swal-input2').value == ""){
                    return "Datos invalidos"
                }
                }
    
             
          }).then((result) =>{
            if (result.isConfirmed) {
                Swal.fire(
                  'Listo!',
                  'Direccion Confirmada',
                  'success'
                  )
                  setTimeout(()=>{
                    
                    newDireccion.checked=true
                  },1000)
                  
              }
            })
        }
        direccionNew()    
})
/*--------------------------------------------*/ 
fetch("http://localhost:4000/api/Usuario")
    .then((response)=>response.json())
    .then((data)=>{ 
        let user = data.data.find((user) => {if(user.id == SessionId){return user}}) 
        console.log(user)
    
   

inputtarjeta.addEventListener('click' , (e) =>{
    e.preventDefault()
function Tarjeta(){


const inputOptions = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        'Con Debito': 'Tarjeta de Debito',
        'Con Tarjeta de Credio': 'Tarjeta de Credito',
        'Con Tras. Bancaria':'Trans. Bancaria'
      })
    }, 1000)
  })
  
  const { value: Tarjeta } = Swal.fire({
    title: 'Selecciona metodo',
    input: 'radio',
    width:'50%',
    showCancelButton: true,
    allowOutsideClick:false,
    stopKeydownPropagation:false,
    inputOptions: inputOptions,
    confirmButtonText: 'Confirmar',
    inputValidator: (value) => {
      if (!value) {
        return 'Selleccione una opcion'
      }
    }
  }).then((result) =>{
    if (result.isConfirmed) {
        Swal.fire(
          'Listo!',
          'Estamos Preparando Tu factura',
          'success'
          )
          setTimeout(()=>{
            
            inputtarjeta.checked=true
          },1000)
          
      }
    })
 
}
Tarjeta()

})
 
})

/* ------------------------------------------- */

let Finalizar = document.querySelector('button#Finalizar')

Finalizar.addEventListener('click' , () => {
    
 function Finaliza(fin) {               
           
     
            fetch("http://localhost:4000/api/Usuario")
            .then((response)=>response.json())
            .then((data)=>{ 
                let user = data.data.find((user) => {if(user.id == SessionId){return user}}) 
           

    const { value: formValues } = Swal.fire({
        title: 'Estas por Comprar',
        html:
        `<form class="form-Compra" action="/producto/compras" method="POST" class="form-register">
        </form>`,
        buttonsStyling:true,
        focusConfirm: false, 
        showCancelButton: true, 
            }).then((result) =>{
                let form2 =document.querySelector('.form-Compra2')
                
                if (result.isConfirmed) {
                    
                    Swal.fire(
                      'Gracias Por tu Compra!',
                      `Te enviaremos los detalles a tu correo : ${user.email}`,
                      'success'
                      ).then((aviso) =>{
                        if(aviso.isConfirmed){
                            
                            JSON.parse(carrito).forEach(item =>{  
                                fetch("http://localhost:4000/api/producto")
                                    .then((response)=>response.json())
                                    .then((producto)=>{ 
                                        
                                            let product = producto.data.find((product) => {if(product.id == +item){return product}})       
                            
                            
                            form2.innerHTML+=`<label for="prod" id="prod">${product.name}</label>
                            <input type="text" name="prod" id="prod"  value="${product.name}" hidden> ` 
                            })
                            })
                            setTimeout(()=>{
                                form2 = document.querySelector('.form-Compra2')
                                console.log(form2)
                                form2.submit() 
                                let carrito = new Array();
                                AllPrices.innerHTML ="0"
                                localStorage.setItem("carrito", JSON.stringify(carrito));
                                                  },1000)    
                            
                                                      
                        }
                      })
                  }
                })

   
})
}
Finaliza("Finalizacion de Compra")
 
JSON.parse(carrito).forEach(item =>{  
    fetch("http://localhost:4000/api/producto")
        .then((response)=>response.json())
        .then((producto)=>{ 
            
                let product = producto.data.find((product) => {if(product.id == +item){return product}})       

let form =document.querySelector('.form-Compra')


form.innerHTML+=`<label for="prod" id="prod">${product.name}</label>
<input type="text" name="prod" id="prod"  value="${product.name}" hidden> `

})

})

 /* setTimeout(()=>{
    form2 = document.querySelector('.form-Compra2')
    console.log(form2) 
                      },2000)   */
                      
})

