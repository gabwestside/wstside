# `SKILLS.md`

```md
# WstSide - Skills e Regras de Desenvolvimento

Este arquivo define como o projeto WstSide deve ser desenvolvido, mantido e evoluído.

Ele serve como guia para qualquer conversa, implementação ou decisão técnica relacionada ao projeto.

---

## 1. Modo de Trabalho

O desenvolvimento deve seguir uma abordagem incremental.

Não avançar para uma nova etapa grande antes da etapa atual estar funcional, testada e integrada.

Ordem de prioridade:

1. Fazer funcionar
2. Organizar a arquitetura
3. Melhorar a UI
4. Refinar animações
5. Otimizar performance
6. Polir detalhes

---

## 2. Roadmap Obrigatório da V1

A V1 é composta pelos seguintes módulos:

1. Login
2. Cadastro
3. Dashboard inicial
4. Menu mobile
5. Sidebar desktop
6. Cadastro de patrimônio atual
7. Cadastro de receitas
8. Cadastro de despesas
9. Resumo mensal
10. Metas financeiras simples
11. Rotina diária simples

Nenhuma feature fora da V1 deve virar prioridade antes desses itens estarem prontos.

Ideias futuras podem ser anotadas, mas não devem interromper a entrega da V1.

---

## 3. Stack Oficial

Usar sempre:

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui
- Supabase
- Motion
- Lucide React
- Zod
- React Hook Form
- Recharts
- date-fns

Evitar adicionar bibliotecas novas sem necessidade real.

Antes de instalar uma dependência nova, verificar se o recurso pode ser resolvido com a stack atual.

---

## 4. Arquitetura do Projeto

O projeto começou com:

```bash
npx create-next-app -e with-supabase
````

Portanto, preservar a arquitetura do Supabase sempre que possível.

Não quebrar:

```txt
lib/supabase/client.ts
lib/supabase/server.ts
lib/supabase/middleware.ts
```

Não criar clientes Supabase duplicados em componentes aleatórios.

Usar:

* Client Supabase para Client Components
* Server Supabase para Server Components, Server Actions e rotas server-side

---

## 5. Regras de Autenticação

Toda tela privada deve exigir usuário autenticado.

Fluxo esperado:

```txt
Usuário não autenticado -> /auth/login
Usuário autenticado -> /dashboard
```

Durante a fase inicial, `/protected` pode ser usado como destino provisório.

Quando o dashboard estiver pronto, mudar o redirect para:

```txt
/dashboard
```

---

## 6. Regras de Banco de Dados

Toda tabela com dados do usuário deve ter:

```sql
user_id uuid references auth.users(id) on delete cascade not null
```

Toda query de dados privados deve filtrar por usuário autenticado.

Não buscar dados globais sem `user_id`, exceto tabelas realmente públicas.

Ativar RLS no Supabase para tabelas sensíveis.

Criar policies por usuário.

Exemplo esperado:

```sql
auth.uid() = user_id
```

---

## 7. Regras de Componentização

Separar componentes por responsabilidade.

Evitar arquivos gigantes.

Preferir:

```txt
components/
  auth/
  dashboard/
  finances/
  routine/
  goals/
  layout/
```

Exemplo:

```txt
components/auth/login-form.tsx
components/dashboard/capital-card.tsx
components/dashboard/streak-card.tsx
components/layout/app-sidebar.tsx
components/layout/bottom-nav.tsx
```

Componentes de UI base devem continuar em:

```txt
components/ui/
```

---

## 8. Server Components e Client Components

Usar Server Components por padrão.

Usar `"use client"` apenas quando precisar de:

* Estado local
* Eventos de clique
* Formulários interativos
* Animações com Motion
* Hooks do React
* Hooks do Next
* Componentes que dependem do navegador

Não colocar `"use client"` em páginas inteiras sem necessidade.

---

## 9. Server Actions

Preferir Server Actions para:

* Login
* Cadastro
* Logout
* Criar transação
* Criar meta
* Criar hábito
* Atualizar patrimônio
* Excluir registros simples

Server Actions devem:

* Validar dados
* Verificar usuário autenticado
* Chamar Supabase server-side
* Retornar erro amigável
* Redirecionar ou revalidar quando necessário

---

## 10. Validação

Usar Zod para validar formulários relevantes.

Validações devem ficar próximas da action ou em arquivos reutilizáveis.

Exemplo de estrutura futura:

```txt
lib/validations/
  auth.ts
  finances.ts
  goals.ts
  routine.ts
```

---

## 11. UI e Design

O WstSide deve ter aparência:

* Premium
* Clean
* Minimalista
* Gamificada
* Clara
* Mobile-first

Estilo visual:

* Cards arredondados
* Bordas suaves
* Sombras leves
* Fundos off-white
* Verde esmeralda como cor principal
* Azul para progresso
* Laranja para streaks/alertas
* Vermelho para despesas/erros

Evitar:

* Telas poluídas
* Muitos gradientes ao mesmo tempo
* Muitos efeitos visuais competindo
* Componentes sem espaçamento
* Contraste baixo demais

---

## 12. Responsividade

Toda tela deve ser pensada primeiro para mobile.

Breakpoints esperados:

* Mobile: navegação inferior
* Tablet: layout híbrido
* Desktop: sidebar fixa

Nenhuma funcionalidade importante pode existir apenas no desktop.

---

## 13. Animações

Usar Motion com moderação.

Animações permitidas:

* Entrada suave de cards
* Transições de hover
* Microinterações em botões
* Transições simples de menu
* Feedback visual em ações importantes

Evitar:

* Animações longas
* Movimento exagerado
* Animação em excesso no dashboard
* Qualquer efeito que atrapalhe o uso

---

## 14. Nomenclatura

Usar nomes claros em inglês no código.

Exemplos:

```txt
LoginForm
DashboardPage
CapitalCard
RecentTransactions
FinancialAccountForm
GoalCard
HabitList
BottomNav
AppSidebar
```

Textos visíveis ao usuário devem ficar em português.

---

## 15. Padrão de Rotas

Rotas públicas:

```txt
/auth/login
/auth/sign-up
/auth/forgot-password
/auth/update-password
```

Rotas privadas futuras:

```txt
/dashboard
/finances
/routine
/goals
/menu
```

Enquanto a migração não estiver feita, `/protected` pode concentrar a área privada.

---

## 16. Padrão de Dados Financeiros

Transactions devem ter:

```txt
income
expense
```

Receitas:

```txt
type = income
```

Despesas:

```txt
type = expense
```

Valores devem ser positivos no banco.

A diferença entre receita e despesa deve ser calculada pelo campo `type`, não por valor negativo.

---

## 17. Padrão de Datas

Usar `date-fns` para formatação.

Datas no banco:

```txt
YYYY-MM-DD
```

Interface em português:

```txt
dd/MM/yyyy
```

Resumo mensal deve considerar mês e ano atuais por padrão.

---

## 18. Padrão de Erros

Erros devem ser amigáveis.

Evitar mostrar mensagens técnicas do Supabase diretamente ao usuário.

Exemplo ruim:

```txt
Invalid login credentials
```

Exemplo bom:

```txt
E-mail ou senha inválidos. Verifique os dados e tente novamente.
```

---

## 19. Padrão de Loading

Toda ação assíncrona importante deve ter loading.

Exemplos:

* Entrando...
* Criando conta...
* Salvando...
* Atualizando...
* Carregando dados...

Botões devem ser desabilitados durante envio de formulário.

---

## 20. Padrão de Commits

Sugestão de commits:

```txt
feat: create login screen
feat: add signup flow
feat: create dashboard layout
feat: add mobile bottom navigation
feat: add desktop sidebar
feat: create financial accounts table
feat: add income form
feat: add expense form
feat: add monthly summary
feat: add goals module
feat: add daily routine module
fix: adjust supabase auth redirect
style: polish dashboard cards
refactor: organize protected layout
```

---

## 21. Critério de Pronto

Uma tarefa só está pronta quando:

* Compila sem erro
* Funciona no navegador
* Funciona no mobile
* Tem tratamento de erro
* Tem estado de carregamento quando necessário
* Segue o visual do WstSide
* Não quebra autenticação
* Não cria duplicação desnecessária
* Está alinhada com a V1

---

## 22. Como o Assistente Deve Ajudar

Sempre que ajudar no projeto WstSide, seguir este padrão:

1. Entender em qual etapa da V1 estamos
2. Não pular etapas
3. Gerar código compatível com a arquitetura atual
4. Explicar exatamente onde criar ou alterar arquivos
5. Evitar refatorações grandes sem necessidade
6. Preservar o template Supabase
7. Priorizar código funcional
8. Manter o design premium e responsivo
9. Sugerir o próximo passo lógico
10. Não introduzir dependências desnecessárias

---

## 23. Estado Atual

Projeto criado com template Supabase.

Comando usado:

```bash
npx create-next-app -e with-supabase
```

Etapa atual:

```txt
V1 / Login
```

Próxima entrega:

```txt
Finalizar tela de login
```

```

Depois de criar esses arquivos, seguimos com a tela de login já usando esse roadmap como referência fixa.
```
