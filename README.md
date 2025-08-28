# ⚡ Mini FitScore  
> Formulário público + Dashboard autenticado + Notificações automáticas via n8n

![Vite](https://img.shields.io/badge/Vite-React-blueviolet?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?logo=supabase)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-blue?logo=netlify)
![n8n](https://img.shields.io/badge/n8n-Automations-orange?logo=n8n)

---

## 📖 Visão Geral

O **Mini FitScore** é uma aplicação que permite:  
- Coletar candidatos via **formulário público**.  
- Calcular e registrar o **FitScore** com classificação.  
- Visualizar os candidatos no **Dashboard autenticado** (apenas gestores logados).  
- Enviar **notificações automáticas por e-mail** (a cada 8 horas) para todos os gestores cadastrados, listando os candidatos com **score ≥ 80**.  

---

## 🏗️ Arquitetura

```mermaid
flowchart TD
  A[Usuário]
  B[(Supabase: candidates / fitscore_responses)]
  C[[v_last_fitscore view]]
  D[Dashboard React + Vite]
  E[n8n Workflow]
  F[SendGrid / E-mails Gestores]

  A -->|Formulário público| B
  B --> C
  C --> D
  C --> E
  E -->|a cada 8h | F[SendGrid / E-mails Gestores]

🚀 Stack
Frontend: React + TypeScript + Vite + Material UI

Backend: Supabase (Auth, Postgres, Policies, Views)

Automação: n8n + SendGrid

Infra: Netlify (deploy SPA), Supabase (DB/Auth)

Qualidade: ESLint + Vitest + Storybook

⚙️ Setup Local
bash
# clone o repo
git clone <repo-url>
cd <repo>

# copie variáveis
cp .env.example .env.local

# instale deps
npm install

# dev server
npm run dev

# build & preview
npm run build
npm run preview
.env.example
bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

🔐 Decisões de Autenticação
Formulário → usa anon para inserções (sem login).

Dashboard → usa RequireAuth, apenas usuários logados acessam.

Sessão → persistSession: false, expira no refresh.

Gestores → registrados via tela de cadastro/login.

🌐 Deploy (Netlify)
Build command: npm run build

Publish directory: dist

SPA redirect: public/_redirects

bash
/*    /index.html   200
Variáveis no Netlify
VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

🤖 Automação (n8n)
Workflow configurado:

Trigger: Cron → a cada 8h.

HTTP GET → v_last_fitscore?score=gte.80

HTTP GET → auth.users (emails dos gestores)

Code → monta HTML com candidatos (nome, email, score, data)

Send Email (SendGrid) → dispara para todos gestores

🧪 Testes
Vitest + React Testing Library
Exemplo:

tsx
import { render, screen } from '@testing-library/react'
import ScoreBadge from '../ScoreBadge'

test('renderiza score', () => {
  render(<ScoreBadge score={85} />)
  expect(screen.getByText(/85/)).toBeInTheDocument()
})

🎨 Storybook
Rodar:

bash
npm run storybook
Exemplos implementados:

FormCard

ScoreSelect

DataTable

CardGrid

ScoreBadge

🗄️ Migrations (Supabase CLI)
bash
# inicializar
npx supabase init

# gerar migration do estado atual
npx supabase db diff -f init_schema

# reset local e aplicar migrations
npx supabase db reset
Seeds opcionais em supabase/seed.sql.

📌 Fluxo de Uso
Candidato preenche formulário público.

Dados são salvos em candidates e fitscore_responses.

View v_last_fitscore agrega os registros mais recentes.

Gestores autenticados acessam /dashboard.

n8n roda a cada 8h → dispara e-mail com candidatos score ≥ 80.

📖 Próximos Passos
Melhorar UX do dashboard (filtros avançados, paginação server-side).

Refinar policies do Supabase para produção.

Expandir testes automatizados.

👨‍💻 Autor
Feito por Weverton Souza Camargo.
