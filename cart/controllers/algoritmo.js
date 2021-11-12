const cron = require('node-cron'); 
const Cart = require('../models/cart');
const nodemailer = require("nodemailer");

function carritoAbandonado(){ 
    try {  
             cron.schedule('* */2 * * * * *', async () =>{

                    cart = await Cart.find()
                    let correos = []
                    cart.forEach(element => {
                    if(element.items.length > 0){ 
                            correos.push(element.correo)  
                    }   
                    });
                    if(correos){
                    let transporter = nodemailer.createTransport({
                            host: "smtp-mail.outlook.com",
                            port: 587,
                            secure: false, 
                            auth: {
                            user: 'servicewater2020@outlook.com',
                            pass: 'servicioagua123'
                            },
                            tls: {
                            ciphers:'SSLv3'
                            }
                    });

                    let info = await transporter.sendMail({
                            from: 'servicewater2020@outlook.com',
                            to: correos, 
                            subject: "TangoCart ✔, No replay Notify", 
                            text: "TangoCart", 
                            html: `<h1>TantoCart</h1>
                            <p>Tienes Productos Olvidados En Tu Carrito de Compras</p>
                            `, 
                    });


                    }
            })    
           
    } catch (error) {
           console.log(error)
    }
}

module.exports = carritoAbandonado;