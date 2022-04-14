
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const removeAccents = (str) => {return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");}


module.exports = {
    index: (req, res)=> {
        res.render('home' ,{
            css:'home.css',
			products,	
			toThousand}
        )
    },
    search: (req, res) => {
        let searchResult = [];
            products.forEach(product => {
                if(removeAccents(product.name.toLowerCase()).includes(req.query.keywords.toLowerCase())){
                    searchResult.push(product)
                }
            }
            );
            res.render ('',{
                searchResult ,
                keyword: req.query.keywords,
                toThousand
            }
            )},
    login: (req, res) => {
        res.render('users/login', {
            titulo: "Login",
            css: 'login.css'
        })
    },
    register: (req, res) => {
        res.render('users/register', {
            titulo: "Registrarse"
        })
    },
}