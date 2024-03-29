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

let $name =qsOne('#name');
let $email =qsOne('#email');
let $password = qsOne('#password');
let $password2 = qsOne('#password2');
let $terms = qsOne('#terms');
let $termsError = qsOne('#termsError');
let spanTerm = qsOne('span.terminos')
let form = qsOne('form#form-register');
let submitError = qsOne('#submitError');
let $nameError =qsOne('#nameError');
let $emailError =qsOne('#emailError');
let $passwordError =qsOne('#passwordError');
let $password2Error =qsOne('#password2Error');
let $spanErrorInputs = document.querySelectorAll(".icon__alert")

regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
regExDNI = /^[0-9]{7,8}$/,
regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;

window.addEventListener('load', () => {

/* >> validacion de nombre << */

$name.addEventListener("keypress", function (e) {
    if (!checkChar(e)) {
        e.preventDefault();
    }
});

function checkChar(e) {
    const char = String.fromCharCode(e.keyCode);
    const pattern = '[a-zA-Z()]';
    if (char.match(pattern)) {
        return true
    }
}

 const validInput = (icon)=>{
    icon.classList.remove("input_invalido")
    icon.classList.add("valido")
    icon.classList.remove("fa-circle-exclamation","icon__invalid")
    icon.classList.add("fa-solid", "fa-circle-check","icon__valid")
} 

 const invalidInput = (icon)=>{
    icon.classList.remove("valido")
    icon.classList.add("input_invalido")
    icon.classList.remove("fa-circle-check","icon__valid")
    icon.classList.add("fa-solid","fa-circle-exclamation","icon__invalid")
    
} 

$name.addEventListener('keyup' , function(e){
        switch (true) { 
            case !$name.value.trim()||$name.value.length < 4:
                $nameError.innerHTML= "Se requiere un nombre valido"
                $name.classList.add("invalido")
                invalidInput($name.nextElementSibling.children[0]) 
                $name.nextElementSibling.classList.add("show__icon")

                break;
            case !regExAlpha.test($name.value):
                $nameError.innerHTML ="Nombre Invalido , no debe poseer numeros"
                $name.classList.add("invalido");
                invalidInput($name.nextElementSibling) 
                $name.nextElementSibling.classList.add("show__icon")
                break;
            default :
                $name.classList.remove("invalido");
                $name.classList.add("valido");          
                validInput($name.nextElementSibling.children[0]) 
/*                 $name.nextElementSibling.classList.remove("show__icon")
 */                $nameError.innerHTML =""
                break; 
            }

})
/* >> validacion de Email << */
$email.addEventListener("keyup" , function(e) {
    switch (true) { 
        case !$email.value.trim():
            $emailError.innerHTML= "Debe ingresar un email";
            $email.classList.add("invalido")
            $email.nextElementSibling.classList.add("show__icon")
            invalidInput($email.nextElementSibling.children[0])
            break;
        case !regExEmail.test($email.value):
            $emailError.innerHTML ="Email Invalido"
            $email.classList.add("invalido");
            $email.nextElementSibling.classList.add("show__icon")
            invalidInput($email.nextElementSibling.children[0])
            break;
        default :
            $email.classList.remove("invalido");
            $email.classList.add("valido");
            $emailError.innerHTML =""
            /* $email.nextElementSibling.classList.remove("show__icon") */
            validInput( $email.nextElementSibling.children[0])
            break;
        }
})
$email.addEventListener('keyup', () => {
    fetch('http://localhost:4000/api/Usuario')
    .then(response => response.json())
    .then(result => {
        result.data.forEach(element => {
            if($email.value === element.email){
                $email.nextElementSibling.classList.add("show__icon")
                invalidInput($email.nextElementSibling.children[0])
                $emailError.innerHTML = "El email ya se encuentra registrado";
                $email.classList.add('invalido');
            }
               
            
        });
    })
})
/* >> validacion de Password << */
$password.addEventListener('keyup', function(){
    switch (true) {
        case !$password.value.trim():
            $passwordError.innerHTML = 'Coloque una contraseña'
            $password.classList.add('invalido')
            $password.nextElementSibling.classList.add("show__icon")
            invalidInput($password.nextElementSibling.children[0])
            break;
        case !regExPass.test($password.value):
            $passwordError.innerHTML = 'La contraseña debe tener: entre 8 y 12 caracteres, al menos una mayúscula, una minúscula y un número';
            $password.classList.add('invalido')
            $password.nextElementSibling.classList.add("show__icon")
            invalidInput($password.nextElementSibling.children[0])
            break;    
        default:
            $password.classList.remove("invalido");
            $password.classList.add('valido')
            /* $password.nextElementSibling.classList.remove("show__icon") */
            validInput($password.nextElementSibling.children[0])
            $passwordError.innerHTML = ""
            break;
    }
})
/* >> validacion de Password2 << */
$password2.addEventListener('keyup', function(){
    switch (true) {
        case $password2.value.length == "":
            $password2Error.innerHTML = 'Reingresa tu contraseña'
            $password2.classList.add('invalido')
            $password2.nextElementSibling.classList.add("show__icon")
            invalidInput($password2.nextElementSibling.children[0])
            break;
        case $password2.value !== $password.value:
            $password2Error.innerHTML = 'Las contraseñas no coinciden';
            $password2.classList.add('invalido')
            $password2.nextElementSibling.classList.add("show__icon")
            invalidInput($password2.nextElementSibling.children[0])
            break;    
        default:
            $password2.classList.remove("invalido");
            $password2.classList.add('valido')
            /* $password2.nextElementSibling.classList.remove("show__icon") */
            validInput($password2.nextElementSibling.children[0])
            $password2Error.innerHTML = ""
            break;
    }
})

/* >> Terminos y Condiciones << */
spanTerm.addEventListener('mouseover', function (){
    if(!$terms.classList.contains('valido')){
        $terms.classList.add('invalido')
        $termsError.innerHTML = "¿Acepta los términos?"
        $termsError.style.top="1.5rem"
    }else{
        $terms.classList.remove('invalido')
        $termsError.innerHTML = ""
    }
})
$terms.addEventListener('click', function (){
        $terms.value = "on"
        $terms.classList.toggle('valido')
        $terms.classList.remove('invalido')
        $termsError.innerHTML = ""
        })
       
        
/* >>>>>>>  PreventDefault  <<<<<<< */
form.addEventListener("submit", function (event) { 
    event.preventDefault()
    let elementsForm = this.elements
    let errors = false

    for (let i = 0; i < elementsForm.length -1; i++) {
        if(elementsForm[i].value == ""
           && elementsForm[i].name !== "button"
           && elementsForm[i].id !== "span"
        || elementsForm[i].classList.contains('invalido')) 
        {
            elementsForm[i].classList.add('invalido')
            elementsForm[i].nextElementSibling.classList.add("show__icon")
            console.log(elementsForm[i])
            console.log("-----------------------");
            console.log(elementsForm[i].nextElementSibling)
/*             invalidInput(elementsForm[i].nextElementSibling) */
            submitError.innerHTML = "Verifique los datos"
            submitError.style.color="red"
            errors = true
        } else {
            elementsForm[i].style.boxShadow = "none"
        }
        
    }

    if(!errors) {
        form.submit()
    } else {
        alertError("Se encontraron algunos errores")
        form.style.border= "4px solid #ff2e008c;"
    }

})
})