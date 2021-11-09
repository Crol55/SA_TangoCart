

let signup_blueprint = {
    "name": '', 
    "correo": '',
    "user_type": ''
}


function init_signup_blueprint (fullName, correo, user_type) {

    let new_signup = signup_blueprint 
        new_signup.name = fullName
        new_signup.correo = correo
        new_signup.user_type = user_type

    return new_signup
}   



module.exports = {
    signup_blueprint
}