import Usuario from "../models/Usuarios.js";
import { Address } from "../models/Users_Address.js";
import bcrypt from 'bcrypt'


class UserController {

    async create(request, response) {

        const hashedSenha = await bcrypt.hash(request.body.senha, 10)
        const requestBody = request.body
        const redirect = response.redirect('/login')

        Usuario.create({

            nome: request.body.nome,
            email: request.body.email,
            senha: hashedSenha,
            cpf: request.body.cpf,

        }).then((usuario) => {

            const usuarioDataValues = usuario.dataValues

            Address.create({
                pais: requestBody.pais,
                estado: requestBody.estado,
                municipio: requestBody.municipio,
                cep: requestBody.cep,
                rua: requestBody.rua,
                numero: requestBody.numero,
                user_Id: usuarioDataValues.id
            })

            return redirect

        }).catch((err) => {
            response.send('Não foi possível cadastrar o novo usuário' + err)
        })

    }

    async dashboard(request, response, next) {

        const requestUser = request.user

        await Address.findOne({
            where: {
                user_Id: requestUser.id
            }
        }).then((address) => {

            const userWhole = {        // criar um novo objeto com os dados pessoais e o endereço
                ...requestUser,
                address: address.dataValues
            }
            response.render('dashboard', { usuario: userWhole })

        })

    }
    async dashboard2(request, response, next) {

        await Usuario.findOne({
            where: {
                id: request.params.id
            }
        })        
        .then((usuario) => {
            Address.findOne({
                where: {
                    user_Id: usuario.id
                }
            }).then((address) => {

                const userWhole = {
                    ...usuario.dataValues,
                    address: address.dataValues
                }

                response.render('dashboard', {usuario: userWhole})

            })

        })
    }

    logout(request, response) {
        request.logOut()
        response.redirect('/')
    }

    async loginRender(request, response) {
        response.render('login')
    }

    registroRender(request, response) {
        response.render('registro')
    }

    homeRender(request, response) {
        response.render('home')
    }

    async editarRender(request, response) {

        await Usuario.findOne({
            where: {
                id: request.params.id
            }
        })        
        .then((usuario) => {
            Address.findOne({
                where: {
                    user_Id: usuario.id
                }
            }).then((address) => {

                const userWhole = {
                    ...usuario.dataValues,
                    address: address.dataValues
                }

                console.log(userWhole)
                response.render('editar', {usuario: userWhole})

            })

        })
    }

    async atualizar(request, response) {

        await Usuario.update({
            nome: request.body.nome,
            email: request.body.email,
            cpf: request.body.cpf,
        }, {
            where: {
                id: request.params.id
            }
        }).then(()=>{

            Address.update({
                pais: request.body.pais,
                estado: request.body.estado,
                municipio: request.body.municipio,
                cep: request.body.cep,
                rua: request.body.rua,
                numero: request.body.numero,
            }, {
                where: {
                    user_Id: request.params.id
                }
            })
        
            response.redirect('/dashboard')

        })

    }

    async deletar(request, response) {

        await Address.destroy({
            where: {
                user_Id: request.params.id
            }
        })

        await Usuario.destroy({
            where: {
                id: request.params.id
            }
        }).then(() => {
            response.redirect('/login')
        })

    }

}


export default new UserController()