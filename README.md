Este é um site desenvolvido para vaga enterscience.

Tecnologias utilizadas:
-> Nest.js
-> React.js
-> React-Bootstrap
-> Node.js
-> API do spotfy para acesso aos dados de artistas e bandas (todo o conteudo é consumido dessa API)

A tela inicial (raiz: "/") contém uma barra de navegação (navbar) que acompanha o layout de todo o projeto, com dois links: Início e Contratações.

-> Início retorna à página inicial, onde temos alguns cards com recomendações de artistas. Ao passar o mouse sobre um card, aparecem informações sobre o artista e um botão para contratar. Caso o usuário clique, ele será levado à página de Contratação ("/contratacao"). Lá, um formulário pode ser preenchido com os dados do evento. Após finalizar, a contratação é salva no localStorage e o usuário é redirecionado de volta à página inicial.

-> No link Contratações, o usuário é direcionado a uma página ("/contratacoes") onde pode visualizar todas as suas contratações em um formato de tabela.

-> Na navbar, há também um ícone de lupa. Ao ser clicado, abre-se um input para buscar artistas e bandas do Spotify. O usuário pode encontrar seu cantor favorito, selecioná-lo e será redirecionado à página de Contratação ("/contratacao").

Para rodar a aplicação:

Clone o repositório do meu GitHub: https://github.com/arcesti/desafioEnterScience.

Dentro da pasta do projeto, instale as dependências executando o comando npm install.

Utilize o terminal para acessar a pasta backend: cd ./backend.

Execute o comando npm run dev (para rodar o Express, que faz a requisição do token de acesso à API do Spotify).

Abra um novo terminal no diretório raiz do projeto e execute novamente npm run dev (para rodar a aplicação Next.js).

Após esses dois passos, basta acessar localhost:3000 para visualizar a aplicação.