import { request } from 'express';
import passport from 'passport'

class Auth{

    checkAuthenticated (req, res, next) {
        if (req.isAuthenticated() || req.user != null)
            next()
        res.redirect('/dashboard')
    }


    checkNotAuthenticated (req, res, next) {
        if (!req.isAuthenticated() || req.user === undefined)
            next()
        res.redirect('/login')

    }
}

export default new Auth