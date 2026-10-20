# Tap Tempo Trainer

Tap tempo, metrônomo e análise de precisão rítmica para estudo musical.

Autor: Saulo Henrique Evangelista Fernandes · 2026

## Arquivos

| Arquivo | Para quê |
|---|---|
| `index.html` | o app inteiro |
| `manifest.webmanifest` | nome, cores e ícones do app instalado |
| `sw.js` | service worker: deixa o app abrir sem internet |
| `icons/` | ícones (os "maskable" são os que o Android recorta no formato do aparelho) |

## Publicar no GitHub Pages

1. Crie um repositório e envie estes arquivos para a raiz dele (com a pasta `icons`).
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`. Salve.
4. Em um ou dois minutos o app fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Instalar no Android

1. Abra o endereço acima no **Chrome**.
2. Toque no menu **⋮** e escolha **Instalar app** (ou **Adicionar à tela inicial**).

O app abre em tela própria, sem a barra do navegador, e funciona sem internet depois da primeira abertura.

## Publicar uma versão nova

1. Substitua o `index.html`.
2. Em `sw.js`, troque `VERSAO` para o número da versão nova (por exemplo, `"15.4"`).
3. Envie as alterações para o GitHub.

Com internet, o app instalado pega a versão nova na próxima vez que for aberto.

## Direitos autorais

Copyright © 2026 Saulo Henrique Evangelista Fernandes. Todos os direitos reservados.

Este repositório é público só para hospedar o app. Ele **não** é código aberto: copiar, modificar, redistribuir ou republicar o app, no todo ou em parte, depende de autorização por escrito do autor. Veja o arquivo [LICENSE](LICENSE).
