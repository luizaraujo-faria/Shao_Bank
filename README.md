# Shao Bank API - @Luiz Araujo

  API bancária para o sistema do banco ShaoBank, o sistema tem como objetivo estudo e entendimento para aprofundamento nos fundamentos de Back-End, TypeScript, Nest.js, Testes e Docker.

# Dependências

  # Core

    - Node.js ( v24LTS )
    - TypeScript ( v5.7.3 )
    - Nest.js ( v11.0.1 )
    - Mysql ( v8.8 )
    - Prisma ( v7.3.0 )

  # Segurança / Autênticação

    - Bcrypt ( v6.0.0 )
    - JWT ( v11.0.2 ) & Passport ( v11.0.5 )
    - Dotenv ( v17.2.3 )

  # Testes / Versão / Infra

    - Jest ( v30.0.0 )
    - Git ( v2.43.0 )
    - Pnpm ( v10.28.2 )
    - Docker ( v29.2.0 )

# Organização

  Baseado na arquitetura modular padrão do Nest.js:

  Shao_Bank/

    database/ - Script do banco
    prisma/ - Schema do prisma
    src/

      generated/
      modules/ - Módulos principais

        user/

      prisma/ - Módulo do prisma
      res/ - Respostas customizadas
      app.module.ts
      main.ts

    test/

      unitary/

        user/

# Instalação

- git clone https://github.com/luizaraujo-faria/Shao_Bank
- pnpm install

# Utilização

- pnpm start:dev
- pnpm test
- pnpm test:cov
- pnpm lint