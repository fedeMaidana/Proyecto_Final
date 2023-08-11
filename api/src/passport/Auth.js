const passport = require( 'passport' )
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy
const { User } = require( '../db' )
const bcrypt = require( 'bcrypt' )

const URL = 'http://localhost:3001'


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.SECRET_CLIENT,
      callbackURL: `${URL}/login/auth/google/callback` //esta el la url que se pasa al crear la app en google para que redirija
    },

    async ( _accessToken, _refreshToken, profile, done ) => {
      try {
        //se busca el mail si esta registrado
        const existingUser = await User.findOne({
            where: { email: profile.emails[ 0 ].value }
        })

        if( existingUser ) return done( null, existingUser ) // Si el mail ya está registrado inicia sesión con el usuario existente

        //sino crea uno nuevo en la base
        const randomPassword = Math.random().toString( 36 ).slice( -10 ) // Genera una contraseña aleatoria
        const salt = bcrypt.genSaltSync( 10 )
        const hashedPassword = bcrypt.hashSync( randomPassword, salt )

        const user = await User.findOrCreate({
          where: { email: profile.emails[ 0 ].value },
          defaults: {
            name: profile.displayName,
            email: profile.emails[ 0 ].value,
            password: hashedPassword,
          }
        })

        return done( null, user[ 0 ] )

      }catch( error ){
        return done( error, null )
      }
    }
  )
)
