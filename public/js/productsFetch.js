const qs = (element) => {
    return document.querySelector(element)
}

window.addEventListener('load', () => {
    let $products = qs("#products");
    let $article = qs("article")
    let url = "http://localhost:4000/api/producto";

    const productCard = (imagen, nombre, precio, detalle) => {
        let imageProduct = document.createElement("img")
        let productImage = document.createElement("div")
        let productDetail = document.createElement("div")
        let productPrice = document.createElement("p")
        let productDescription = document.createElement("p")
        let productName = document.createElement("h2")
        imageProduct.src = imagen
        imageProduct.alt = imagen
        imageProduct.style = "width: 100%; height: 100%; object-fit: contain;";
        $article.appendChild(productName)
        productName.innerHTML = nombre
        $article.appendChild(productImage)
        productImage.appendChild(imageProduct);
        productImage.insertAdjacentElement("afterend", productDetail);
        productDetail.appendChild(productPrice)
        productPrice.innerHTML = precio
        productPrice.insertAdjacentElement("afterend", productDescription)
        productDescription.innerHTML = detalle;
        $products.appendChild($article)
    }
    
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let products = data.data.allProducts
        products.forEach(producto => {
            productCard(producto.imageURL, producto.name, producto.precio, producto.description)
        })
    })
        
})