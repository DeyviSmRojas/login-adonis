'use strict'

//Creamos el controlador y jale la funcion user
const User = use('App/Models/User')

//Creamos la funcion login con las campos email y password
class UserController {
    async login({request, response, auth}){
        const {email,password}= request.only(['email','password'])

        const token = await auth.attempt(email, password)
        return response.json(token)
    }
//Creamos la funcion de registro con los campos designados y creados
    async register({request, response}){
        const {first_name, last_name, email, password} = request.only(['first_name','last_name','email', 'password'])

        await User.create({
            first_name,
            last_name,
            email,
            password
        })
        return response.send({mensaje: 'Usuario creado Satisfactoriamente'})
    }

//Creamos la funcion de mostrar los registros
    async show({params, response}){
        const user = await User.find(params.id)
        const res = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        return response.json(res)
    }

}

module.exports = UserController
