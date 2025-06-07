// Carrega as variáveis de ambiente do arquivo .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // A chave agora vem do .env
});

app.post("/api/enviar", async (req, res) => {
  try {
    const { mensagem } = req.body;

    const resposta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: mensagem,
        },
      ],
    });

    const respostaDoChat = resposta.choices[0].message.content;

    res.json({ resposta: respostaDoChat });
  } catch (erro) {
    console.error("Erro ao acessar a API da OpenAI:", erro);
    res.status(500).json({ erro: "Erro ao acessar a API da OpenAI" });
  }
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});