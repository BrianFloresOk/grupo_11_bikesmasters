function qsOne(element) {
    return document.querySelector(element)
}

function alertError(msg) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })              
      Toast.fire({
        icon: 'error',
        title: `${msg}`
      })
}

window.addEventListener("load",() => {
    let $direccion = qsOne("#direccion"),
        $altura = qsOne("#altura"),
        $postal = qsOne("#postal"),
        $localidad = qsOne("#localidad"),
        $provincia = qsOne("#provincia"),
        $form = qsOne("#formulario__direction"),
        $inputDireccionError = qsOne("#inputDireccionError"),
        $inputAlturaError = qsOne("#inputAlturaError"),
        $inputPostalError = qsOne("#inputPostalError"),
        $submitError = qsOne("#submitError"),
        $localidadError = qsOne('#localidadError'),
        $provinciaError = qsOne('#provinciaError')

        regExAlpha = /^[a-zA-Z\sñáéíóúü]*$/,
        regExAlt = /^[0-9]{7,8}$/;
        regExCar = /^[A-Za-z0-9]/
        regExEsp = /^[°!#$%&=?¡¿*<>+]/
        

        /*SELECCION DE PROVINCIA*/

     /*    console.log(data)
        for (let index = 0; index < data.provincias.length; index++) {
            $provincia.innerHTML += `<option value="${data.provincias[index].id}">${data.provincias[index].nombre}</option>`
            } */

    fetch("https://apis.datos.gob.ar/georef/api/provincias")
    .then((response)=>response.json())
    .then((data)=>{ 
        
        /* let Provincias = data.provincias; */
        console.log(data.provincias);
        for (let index = 0; index < data.provincias.length; index++) {
            $provincia.innerHTML += `<option value="${data.provincias[index].id}">${data.provincias[index].nombre}</option>`
            }
        
    })
    .catch((error)=> console.log(error))
      
  
        $provincia.addEventListener("change", (event) => {
            let idProvincia = event.target.value;
            $localidad.innerHTML = `<option value="" hidden selected>Localidades</option>`
    
            fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&campos=id,nombre&max=5000`)
            .then((response) => response.json())
            .then((data) => {
                data.localidades.forEach(localidad => { 
                    $localidad.innerHTML += `<option value="${localidad.id}">${localidad.nombre}</option>`
                });
            })
            .catch((error) => console.log(error))
        })
        /* Validaciones de provincia */
        $provincia.addEventListener("blur", () => {
            switch (true) {
                case $provincia.value === "" || $provincia.value === "default":
                    $provinciaError.innerHTML = "Seleccione una provincia"
                    $provincia.classList.add('is-invalid')
                    break;
                case $provincia.value.length === 0:
                    $provinciaError.innerHTML = "Seleccione una provincia"
                    $provincia.classList.add('is-invalid')
                    break;
                default:
                    $provincia.classList.remove("is-invalid"); 
                    $provincia.classList.add("is-valid");
                    $provinciaError.innerHTML = "";    
                    break;
            }
        })

        /* Validacion de localidad */

        $localidad.addEventListener("blur", () => {
            switch (true) {
                case $localidad.value === "" || $localidad.value === "default":
                    $localidadError.innerHTML = "Seleccione una localidad"
                    $localidad.classList.add('is-invalid')
                    break;
                case $localidad.value.length === 0:
                    $localidadError.innerHTML = "Seleccione una localidad"
                    $localidad.classList.add('is-invalid')
                    break;
                default:
                    $localidad.classList.remove("is-invalid"); 
                    $localidad.classList.add("is-valid");
                    $localidadError.innerHTML = "";    
                    break;
            }
        })


        /*VALIDACION DE DIRECCION */

        $direccion.addEventListener("keypress" , function(e){
            if(!checkChar(e)){
                e.preventDefault();}
            });
        
        function checkChar(e){
            const char = String.fromCharCode(e.keyCode);
            const pattern = '[0-9a-zA-Z( )]';
        if(char.match(pattern)){
            return true }}

        $direccion.addEventListener("blur", (e)=>{

            switch(true){
                case !$direccion.value.trim():
                    $inputDireccionError.innerHTML = "Direccion requerida"
                    $direccion.classList.add("is-invalid");
                    break;
                case $direccion.value.length < 4:
                    $inputDireccionError.innerHTML = "Nombre de direccion inválida"
                    $direccion.classList.add("is-invalid");
                    break;
                case !regExCar.test($direccion.value) :
                    console.log($direccion.value)
                    $inputDireccionError.innerHTML = "No debe tener caracteres especiales"
                    $direccion.classList.add("is-invalid");
                    break;
                default:
                    $direccion.classList.remove("is-invalid"); 
                    $direccion.classList.add("is-valid");
                    $inputDireccionError.innerHTML = "";       
            }
        })
        /*VALIDACION DE ALTURA */
        $altura.addEventListener("blur",()=>{
            switch(true){
                case !$altura.value.trim():
                $inputAlturaError.innerHTML = "Ingrese altura de la direccion"
                $altura.classList.add("is-invalid");
                break;

            default:
                $altura.classList.remove("is-invalid");
                $altura.classList.add("is-valid");
                $inputAlturaError.innerHTML = "";  
                break;  
            }
        })
        /*CODIGO POSTAL */
        $postal.addEventListener("blur",()=>{
            switch(true){
                case !$postal.value.trim():
                    $inputPostalError.innerHTML = "Ingrese su código postal"
                    $postal.classList.add("is-invalid");
                break;

            default:
                $postal.classList.remove("is-invalid");
                $postal.classList.add("is-valid");
                $inputPostalError.innerHTML = "";  
                break;  
            }
        })

        /*VALIDACION DE FORMULARIO */
          $form.addEventListener("submit", function (e) {
            e.preventDefault()
          let elementsForm = this.elements; 
          let errores = false;
          for (let index = 0; index < elementsForm.length - 1; index++) {    
            if(elementsForm[index].value === ""
            || elementsForm[index].classList.contains("is-invalid")) {
                elementsForm[index].classList.remove('input-style')
                elementsForm[index].classList.add("error-input");
                console.log(elementsForm[index])
                $submitError.innerHTML = "Los campos señalados son obligatorios"
                errores = true;
            }        
             }
           if(!errores){
            alert("Direccion actualizado!")
            $form.submit()
           } else {
            alertError("Hay errores en el formulario")
           }
        }) 

}) 