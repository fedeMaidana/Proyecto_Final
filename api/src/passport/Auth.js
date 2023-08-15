const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const URL = 'http://localhost:3001';


// Serialización del usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialización del usuario desde la sesión
passport.deserializeUser((id, done) => {
  User.findByPk(id, (err, user) => {
    done(err, user);
  });
});

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

        let fullName = profile.displayName;
        const spaceIndex1 = fullName.indexOf(' ');
        const spaceIndex2 = fullName.lastIndexOf(' ');

        let firstName = fullName;
        let middleName = '';
        let lastName = '';

        if (spaceIndex1 !== -1 && spaceIndex1 !== spaceIndex2) {
          firstName = fullName.substring(0, spaceIndex1);
          middleName = fullName.substring(spaceIndex1 + 1, spaceIndex2);
          lastName = fullName.substring(spaceIndex2 + 1);
        } else if (spaceIndex1 !== -1) {
          firstName = fullName.substring(0, spaceIndex1);
          lastName = fullName.substring(spaceIndex1 + 1);
        }

        const birthDate = profile.birthday ? new Date(profile.birthday) : new Date();
        // Generar un nombre de usuario único basado en el nombre y apellido
        const baseUsername = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
        let username = baseUsername;
        let counter = 1;

        // Verificar si el nombre de usuario ya existe en la base de datos y agregar un número si es necesario
        while (await User.findOne({ where: { userName: username } })) {
          username = `${baseUsername}${counter}`;
          counter++;
        }

        const user = await User.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            name: firstName + (middleName ? ' ' + middleName : ''),
            userName: username, // Almacena el nombre de usuario
            lastName: lastName || null,
            email: profile.emails[0].value,
            password: hashedPassword,
            birthDate: birthDate,
            profileImage: profile.photos[0].value,
          }
        });

        const data = {
          userId: user[0].id,
          userName: user[0].userName,
          // Agrega otros datos del usuario que puedas necesitar en el cliente
        };
        
        const token = jwt.sign(data, process.env.SECRET_KEY, {
          expiresIn: '7d', // Ejemplo: el token expira en 7 días
        });

        return done( null, { user: user[0], token })

      }catch( error ){
        return done( error, null )
      }
    }
  )
)
