import { Router, request, response } from "express";
import passport from 'passport'
import Auth from "./helpers.js";
import UserController from "./controllers/UserController.js";

const routes = Router()

// Rotas

routes.get('/', UserController.loginRender)

routes.get('/dashboard', UserController.dashboard)

routes.get('/dashboard/:id', UserController.dashboard2)

routes.get('/registro', UserController.registroRender)

routes.post('/registro', UserController.create)

routes.delete('/logout', UserController.logout)

routes.get('/login', UserController.loginRender)

routes.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}), (request, response) => {
    response.redirect('/login')
})

routes.get('/editar/:id', UserController.editarRender)

routes.post('/atualizar/:id', UserController.atualizar)

routes.get('/deletar/:id', UserController.deletar)


export { routes }