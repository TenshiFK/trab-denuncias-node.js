const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000; // use process.env.PORT
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const axios = require('axios');

const { getApps, initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { signOut } = require('firebase/auth');

var firebaseConfig = {
    apiKey: "AIzaSyDMaY63qyaZ8Km-pG9IW3tTeK7Bt0cXCmk",
    authDomain: "trab-denuncias-b799e.firebaseapp.com",
    projectId: "trab-denuncias-b799e",
    storageBucket: "trab-denuncias-b799e.appspot.com",
    messagingSenderId: "842026702356",
    appId: "1:842026702356:web:281e2e0a24bebf72f1f901"
};

const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);

app.use(cors({
    origin: 'http://localhost:5000', // Substitua por seu domínio de cliente
    credentials: true
  }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyparser.urlencoded({extended : true}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser('minhachave-denunciaAnonima'));

app.use(
    session({
        secret: 'minhachave-denunciaAnonima', //chave sercreta para assinar os cookies da sessão
        resave: false, //evita regravar sessões sem alterações
        saveUninitialized: true, //salva sessões não inicializadas 
        proxy: true,
        cookie: { 
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            //secure: true,
            httpOnly:true,
            sameSite: 'lax',
            signed: true, 
        },
    })
);

//rota teste de funcionamento do server
app.get('/server', (req, res) =>{
    res.send('Olá Mundo');
 })

 //rota para erro ou endereços desconhecidos
 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

//rota login
app.post('/login', async (req, res) => {
    try {
       const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
       let user = userCredential.user;
       req.session.userId = user.uid;
       res.json({ status: 'success', message: 'Login bem-sucedido', uid: user.uid, email: user.email, redirectUrl: '/console' });
    } catch (error) {
       res.json({ status: 'error', message: error.message });
    }
   });
   
   //rota logout
   app.post('/logout', async (req, res) => {
    try {
       await signOut(auth);
       res.clearCookie('connect.sid', { path: '/' });
       req.session.destroy();
       console.log(req.session);
       console.log("Logout bem sucedido");
       res.json({ status: 'success', message: 'Logout bem-sucedido', redirectUrl: '/' });
    } catch (error) {
       res.json({ status: 'error', message: error.message });
    }
   });

//rota de postagem api
app.post('/denuncia', async (req, res) => {
    try {
      const response = await axios.post('https://64c7ec4fa1fe0128fbd5750a.mockapi.io/Denuncia', req.body);
      console.log(response.data);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  });

app.listen(PORT, () => {
   console.log(`server started on port http:localhost:${PORT}`);
});