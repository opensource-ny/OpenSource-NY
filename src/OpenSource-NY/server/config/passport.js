// const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, userName, password, done) => {
            try {
                User.findOne({
                    where: {
                        [Op.or]: [
                            {
                                userName: userName
                            },
                            {
                                email: req.body.email
                            }
                        ]
                    }
                })
                .then(user => {
                    if(user != null){
                        console.log('Username or email already taken!');
                        return done(null, false, {
                            message: 'Username or email already taken'
                        })
                    } else {
                        User.create({ 
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            mi: req.body.mi,
                            userName,
                            email: req.body.email,
                            password,
                            imageURL: req.body.imageURL,
                            phone: req.body.phone,
                            githubURL: req.body.gitURL,
                            personalURL: req.body.personalURL,
                            links: req.body.userLinks,
                            skills: req.body.skills,
                            hacksAttended: req.body.hacksAttended
                        }).then(user => {
                            console.log('New user created')
                            return done(null, user);
                        })
                    }
                })
            } catch (err) {
                done(err)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy({
        usernameField: 'userName',
        passwordField: 'password',
        session: false
    },
        (userName, password, done) => {
            try{
                console.log('userName, password')
                console.log(userName)
                User.findOne({
                    where: {
                        userName: userName
                    }
                }).then(user => {
                    if(user === null){
                        return done(null, false, { message: 'Invalid username'})
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if(response !== true) {
                                console.log('Invalid password')
                                return done(null, false, {message: 'Invalid password'})
                            }
                            console.log('User authenticated')
                            return done(null, user);
                        })
                    }
                })
            } catch (err) {
                done(err);
            }
        }
    )
)

const JWToptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: "some-secret-here"//jwtSecret.secret
}

passport.use(
    'jwt',
    new JWTstrategy(JWToptions, (jwt_payload, done) => {
        console.log("We are in JWT")
        try {
            User.findOne({
                where: {
                    id: jwt_payload.id
                }
            }).then(user => {
                if(user) {
                    console.log('Passport found user in psql db')
                    done(null, user);
                } else {
                    console.log('Passport is lost and didnt find this user in psql db')
                    done(null, false)
                }
            })
        } catch (err) {
            done(err);
        }
    })
)