const mongoose = require("mongoose");
const Bebida = require("./models/bebida");

const data = [
    {
        titulo: "Kaiser Latão 473ml" ,
        imagem: "https://i.imgur.com/04Ygc6k.jpg",
        preco: 5.00,
        quantidade: "20"
    },
    {
        titulo: "Brahma Latão 473ml" ,
        imagem: "https://i.imgur.com/ytVoApw.jpg",
        preco: 5.00,
        quantidade: "20"
    },
    {
        titulo: "Skol Latão 473ml" ,
        imagem: "https://i.imgur.com/m97Fc5u.jpg",
        preco: 5.00,
        quantidade: "20"
    },
    {
        titulo: "Heineken Long 330ml" ,
        imagem: "https://i.imgur.com/iVpMAr8.jpg",
        preco: 7.00,
        quantidade: "20"
    },
    {
        titulo: "Antartica Latão 473ml" ,
        imagem: "https://i.imgur.com/ZDpV68Y.jpg",
        preco: 5.00,
        quantidade: "20"
    },
    {
        titulo: "Budweiser 350ml" ,
        imagem: "https://i.imgur.com/4bhd5ac.jpg",
        preco: 5.00,
        quantidade: "20"
    },
    {
        titulo: "Polar Latão 473ml" ,
        imagem: "https://i.imgur.com/RyGBbnQ.jpg",
        preco: 5.00,
        quantidade: "20"
    },
    {
        titulo: "Stella Artois 310ml" ,
        imagem: "https://i.imgur.com/9WNYdAB.jpg",
        preco: 5.00,
        quantidade: "20"
    },
]

const seedDB = async () => {
    // Remove as bebidas
    await Bebida.deleteMany({}, err => {
        if(err) {
            console.log(err);
        }
        console.log("bebidas removidas");
    })
    // Adiciona algumas bebidas
    data.forEach(seed => {
        Bebida.create(seed, (err, bebida) => {
            if(err) {
                console.log(err);
            } else {
                console.log("bebidas adicionadas");
            }
        });
    });
}

module.exports = seedDB;