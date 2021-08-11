
// Logica de lo que se realizara para resolver una peticion de un usuario.
function login(req, res){ // Idealmente tipo post

    let {username, password} = req.body;
    console.log(username, password);

    res.send("Respuesta a solicitud de login");
}


module.exports = {
    login:login
};