let body = document.body;
let header = document.querySelector('header');
let main = document.querySelectorAll('main');
let articles = document.querySelectorAll('article');
let parrafos = document.querySelectorAll('p');
let botondark = document.querySelector('#darkMode');
let titulos = document.querySelectorAll('h3');
let divs = document.querySelectorAll('.recent-product');
let divProfile = document.querySelector('#div-profile')

console.log(localStorage)
botondark.addEventListener('click' , function(){

    divs.forEach(divs => { divs.classList.toggle('div-profile') })
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    main.forEach(main => { main.classList.toggle('dark-mode') })
    articles.forEach(article => { article.classList.toggle('darck-mode_card')});
    parrafos.forEach(parrafo => { parrafo.classList.toggle('dark-mode_letras')});
    titulos.forEach(titulos => { titulos.classList.toggle('dark-mode_letras') });
    header.classList.contains('dark-mode') ? localStorage.setItem('dark-mode','true') : localStorage.setItem('dark-mode' , 'false')
    header.classList.contains('dark-mode') ? botondark.textContent = "Modo Normal" : botondark.textContent = "Modo Oscuro"
    console.log(localStorage)

})



     if (!localStorage.getItem('dark-mode')){
    divs.forEach(divs => { divs.classList.remove('div-profile') })
    body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    main.forEach(main => { main.classList.remove('dark-mode') })
    articles.forEach(article => { article.classList.remove('darck-mode_card')});
    parrafos.forEach(parrafo => { parrafo.classList.remove('dark-mode_letras')});
    titulos.forEach(titulos => { titulos.classList.remove('dark-mode_letras') });

    botondark.textContent = "Modo Oscuro"
    }
    if(localStorage.getItem('dark-mode')==='true'){
        divs.forEach(divs => { divs.classList.add('div-profile') })
        body.classList.add('dark-mode');
        header.classList.add('dark-mode');
        main.forEach(main => { main.classList.add('dark-mode') })
        articles.forEach(article => { article.classList.add('darck-mode_card')});
        parrafos.forEach(parrafo => { parrafo.classList.add('dark-mode_letras')});
        titulos.forEach(titulos => { titulos.classList.add('dark-mode_letras') });
        botondark.textContent = "Modo Normal";

         }

   /*  if(body.className ==='dark-mode'){
        botondark.textContent = "Modo Normal";
        
        
    }else{
        botondark.textContent = "Modo Oscuro"
        localStorage.removeItem('modo-oscuro')
    } */
    botondark.addEventListener('click' , () =>{
        divProfile.classList.toggle('div-profile'); 

    })
    divProfile.classList.toggle('div-profile'); 
   

/* articles.forEach(article => {
    article.classList.toggle('darck-mode_card')}); */
