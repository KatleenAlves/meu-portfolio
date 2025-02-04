const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurando o transporter para o envio de e-mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Usando variável de ambiente
    pass: process.env.EMAIL_PASS, // Usando variável de ambiente
  },
  tls: {
    rejectUnauthorized: false,  // Desativa a verificação de certificado SSL
  },
});

// Endpoint para enviar e-mail
app.post('/send', (req, res) => {
  const { name, email, message, subject } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Seu e-mail como destinatário
    subject: subject,
    text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o e-mail:', error.message);  // Detalhes do erro
      return res.status(500).send(`Erro ao enviar o e-mail: ${error.message}`);
    }
    console.log('E-mail enviado:', info.response);  
    res.send('Message sent successfully!');
  });
  
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
