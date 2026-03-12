# 🔗 Encurtador de URL - Full Stack Serverless

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

> Uma aplicação web responsiva e de alta performance para encurtamento de URLs, construída com uma arquitetura Serverless moderna e banco de dados NoSQL na nuvem.

## 💻 Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de criar um sistema Full Stack completo capaz de receber links longos e transformá-los em URLs curtas e amigáveis. 

A aplicação não apenas realiza o redirecionamento rápido, mas também atua como uma ferramenta analítica, rastreando a quantidade de cliques em tempo real de cada link gerado. Tudo isso encapsulado em uma interface de usuário (UI) moderna, com tema vibrante "Dark/Neon", focada em proporcionar a melhor experiência de uso (UX).

## ✨ Funcionalidades

- **Encurtamento Instantâneo:** Geração de códigos únicos de 6 caracteres para URLs longas.
- **Redirecionamento Ágil:** Rotas de backend interceptam o código e direcionam o usuário ao destino instantaneamente.
- **Analytics em Tempo Real:** Contador de cliques atualizado dinamicamente no banco de dados.
- **Destaque UI/UX:** Feedback visual claro quando um novo link é criado e função "Copiar com 1 clique" integrada.
- **Histórico Dinâmico:** Listagem dos últimos links encurtados com atualização em tempo real.

## 🛠️ Arquitetura e Tecnologias

O projeto adota uma abordagem **Serverless**, eliminando a necessidade de um servidor tradicional. As rotas da API são executadas sob demanda através das *Serverless Functions* da Vercel.

**Frontend:**
- **React.js** com **Vite**
- **Tailwind CSS** para estilização utilitária e design responsivo.

**Backend (Serverless):**
- **Node.js** rodando nas funções da Vercel (`/api/encurtar`, `/api/listar`, `/api/redirect`).
- **Nanoid** para a geração de identificadores únicos curtos.
- **Valid-url** para validação de segurança e integridade dos links enviados.

**Banco de Dados:**
- **MongoDB Atlas** (Cloud NoSQL) para armazenamento confiável em nuvem.
- **Mongoose** para modelagem de dados e esquemas.

## 🚀 Como executar o projeto localmente

Pré-requisitos: Node.js, Git e uma conta no MongoDB Atlas.

1. Clone este repositório (lembre-se de alterar o link para o seu repositório oficial):
```bash
git clone [https://github.com/SEU_USUARIO_GITHUB/encurtador-url.git](https://github.com/SEU_USUARIO_GITHUB/encurtador-url.git)
```

2. Acesse a pasta do projeto:
```bash
cd encurtador-url
```

3. Instale as dependências:
```bash
npm install
```

4. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione sua string de conexão do MongoDB:
```env
MONGODB_URI=mongodb+srv://<usuario>:<senha>@seu-cluster.mongodb.net/?retryWrites=true&w=majority
```

5. Instale a CLI da Vercel globalmente (necessário para simular as Serverless Functions com Vite):
```bash
npm i -g vercel
```

6. Inicie o servidor de desenvolvimento:
```bash
vercel dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

👨‍💻 Autor
Eduardo

Portfólio: https://portfolio-eduardo-torres.vercel.app/

Email: eduardobtorres17@gmail.com

- **Portfólio:** [https://portfolio-eduardo-torres.vercel.app/](https://portfolio-eduardo-torres.vercel.app/)
- **Email:** eduardobtorres17@gmail.com
