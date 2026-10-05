# Memórias Póstumas de Brás Cubas

Site interativo desenvolvido como projeto escolar sobre a obra **Memórias Póstumas de Brás Cubas**, de **Machado de Assis**.

A proposta é apresentar a trajetória de Brás Cubas de uma maneira diferente de uma apresentação tradicional, utilizando **scroll storytelling**: o usuário percorre a página e, através do próprio scroll, acompanha diferentes momentos da vida do personagem.

## Sobre o projeto

O site parte de um ponto específico:

> **"EU MORRI."**

A história começa depois da morte de Brás Cubas. Conforme o usuário rola a página, a narrativa volta no tempo e apresenta acontecimentos importantes de sua vida.

A experiência passa por 12 momentos narrativos como:

* A morte
* O defunto autor
* O nascimento
* A infância
* Marcela
* A Europa
* Virgília
* Quincas Borba e o Humanitismo
* O Emplasto
* A morte novamente
* O que ficou após sua vida

No final, a experiência retorna à ideia central da obra: **Brás Cubas morreu, mas suas memórias permaneceram.**

## Conceito

O conceito principal do projeto é:

**"A vida depois da morte."**

Em vez de apresentar a obra de forma cronológica tradicional, o site utiliza a perspectiva de Brás Cubas como um **defunto autor**, fazendo o usuário percorrer sua história através de suas memórias.

O scroll funciona como a própria navegação da narrativa.

## Design

A identidade visual foi pensada para combinar uma estética literária com uma abordagem editorial contemporânea.

### Cores

* Fundo: `#11100E`
* Texto principal: `#E8E0D0`
* Texto secundário: `#B8AD9B`
* Cor de destaque: `#8B7355`
* Elementos claros: `#D7CCBA`

### Tipografia

* **Cormorant Garamond** — títulos, anos e elementos literários
* **Inter** — textos, informações secundárias e elementos de interface

A interface utiliza bastante espaço vazio, tipografia serifada, linhas finas e movimentos sutis para criar uma atmosfera mais próxima de uma publicação editorial.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Google Fonts

O projeto utiliza JavaScript para controlar a progressão das cenas conforme o usuário realiza o scroll.

## Estrutura da experiência

A página é organizada em 12 momentos narrativos. Eles são blocos temáticos da experiência e não correspondem aos capítulos numerados do romance.

Cada momento possui uma composição visual própria, enquanto a timeline vertical acompanha o progresso do usuário.

O objetivo é fazer com que a navegação não pareça apenas uma sequência de páginas, mas uma única experiência contínua.

### Fluxo

```text
A MORTE
   ↓
O DEFUNTO AUTOR
   ↓
NASCIMENTO
   ↓
INFÂNCIA
   ↓
MARCELA
   ↓
EUROPA
   ↓
VIRGÍLIA
   ↓
HUMANITISMO
   ↓
O EMPLASTO
   ↓
A MORTE
   ↓
O QUE FICOU
   ↓
ENCERRAMENTO
```

## Objetivo do projeto

O objetivo é apresentar **Memórias Póstumas de Brás Cubas** de uma forma mais interativa e visual, utilizando recursos de desenvolvimento web para complementar a apresentação da obra literária.

Além do conteúdo sobre o livro, o projeto busca demonstrar conhecimentos de:

* HTML
* CSS
* JavaScript
* Animações e transições
* Design de interfaces
* Responsividade
* Experiência do usuário
* Scroll storytelling

## Responsividade

O site foi desenvolvido para funcionar em diferentes tamanhos de tela, incluindo:

* Computadores
* Notebooks
* Tablets
* Celulares

A estrutura da narrativa permanece baseada no scroll, adaptando os elementos visuais para telas menores.

## Acessibilidade e desempenho

As animações são utilizadas de forma moderada para não prejudicar a leitura.

O projeto também considera:

* contraste entre texto e fundo;
* legibilidade;
* redução de animações para usuários que preferem menos movimento;
* uso de animações baseadas principalmente em `transform` e `opacity`;
* prevenção de overflow horizontal.

## Quiz

A página `quiz.html` reúne 10 perguntas baseadas no conteúdo do site (múltipla escolha, verdadeiro/falso e uma questão com várias respostas corretas). Ela funciona 100% no navegador, sem servidor, e mostra pontuação, acertos, erros, aproveitamento e uma mensagem final. O convite para o quiz aparece no final da página principal, e o quiz tem um botão para voltar ao site.

Para editar perguntas, alternativas ou mensagens, basta mexer no início do arquivo `quiz.js` (array `QUESTIONS`).

## Modo claro / escuro

O botão no canto superior direito alterna entre o tema escuro (padrão) e o claro. A escolha é salva no `localStorage` (chave `bc-theme`) e vale para o site e para o quiz. As cores dos dois temas ficam como variáveis CSS no começo de `style.css` (`:root` para o escuro e `[data-theme="light"]` para o claro).

## Arquivos

```text
index.html   página principal (scroll storytelling)
style.css    estilos do site + tokens dos temas + componentes compartilhados (botões, botão de tema)
script.js    controle das cenas por scroll
theme.js     alternância e persistência do tema (usado nas duas páginas)
quiz.html    página do quiz
quiz.css     estilos exclusivos do quiz
quiz.js      perguntas e lógica do quiz
```

## Como executar

Não é necessário instalar dependências para executar a versão atual.

Basta abrir o arquivo:

```text
index.html
```

em um navegador.

Também é possível utilizar uma extensão como **Live Server** no VS Code para executar o projeto durante o desenvolvimento.

## Autor

Projeto desenvolvido por **Eron · Gabriel F. · Heitor · Lucas · Vinicios**.

Projeto escolar baseado na obra:

**Memórias Póstumas de Brás Cubas**
**Machado de Assis**
