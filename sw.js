/*
Tap Tempo Trainer
Copyright (c) 2026 Saulo Henrique Evangelista Fernandes.
Todos os direitos reservados. Veja o arquivo LICENSE.
*/

/*
Service worker do Tap Tempo Trainer.

Serve para o app abrir sem internet (num palco, num ensaio sem
sinal) e para o Chrome do Android oferecer "Instalar app".

ESTRATÉGIA
- a página (index.html) vem da REDE primeiro, com 3 s de prazo:
  com internet, cada abertura já pega a versão nova do GitHub;
  sem internet (ou com rede lenta demais), abre a cópia guardada
- ícones e manifest vêm do CACHE primeiro: quase nunca mudam

AO PUBLICAR UMA VERSÃO NOVA
- troque VERSAO abaixo junto com a do app. Isso apaga o cache
  antigo e guarda tudo de novo. Mesmo sem trocar, a página nova
  chega pela rede — mas os ícones só se atualizam com a troca.
*/
const VERSAO = "15.3"
const CACHE = "tap-tempo-" + VERSAO

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/favicon-32.png",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png"
]

const PRAZO_REDE_MS = 3000

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ARQUIVOS.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(
        nomes.filter((n) => n.startsWith("tap-tempo-") && n !== CACHE)
             .map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  )
})

/* rede com prazo; se falhar ou demorar, a cópia guardada */
async function redePrimeiro(req) {
  const cache = await caches.open(CACHE)
  try {
    const resp = await Promise.race([
      fetch(req),
      new Promise((_, rejeita) => setTimeout(() => rejeita(new Error("prazo")), PRAZO_REDE_MS))
    ])
    if (resp && resp.ok) {
      cache.put("./index.html", resp.clone())
      return resp
    }
    throw new Error("resposta " + (resp && resp.status))
  } catch (err) {
    const guardada = await cache.match("./index.html") || await cache.match("./")
    if (guardada) return guardada
    throw err
  }
}

async function cachePrimeiro(req) {
  const guardada = await caches.match(req)
  if (guardada) return guardada
  const resp = await fetch(req)
  if (resp && resp.ok) {
    const cache = await caches.open(CACHE)
    cache.put(req, resp.clone())
  }
  return resp
}

self.addEventListener("fetch", (e) => {
  const req = e.request
  if (req.method !== "GET") return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (req.mode === "navigate") {
    e.respondWith(redePrimeiro(req))
    return
  }
  e.respondWith(cachePrimeiro(req))
})
