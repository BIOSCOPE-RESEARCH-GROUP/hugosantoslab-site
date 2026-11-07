# hugosantoslab.com — site estático

Site do Santos Laboratory. É HTML, CSS e JavaScript simples, sem base de dados, sem plugins e sem passo de compilação.

```
index.html          ← todo o texto do site
assets/style.css    ← cores e estilos (a cor de destaque é --accent, logo no topo)
assets/app.js       ← partes interativas (espectro, classes moleculares, pedidos, cursos)
assets/favicon.svg  ← ícone do separador
CNAME               ← domínio, usado pelo GitHub Pages
```

## Antes de publicar: preencher os marcadores

Procure por `[` no `index.html` e no `assets/app.js`:

- `[PORTRAIT PHOTO]`: ponha a fotografia em `assets/hugo-santos.jpg` e troque o bloco pela linha `<img …>` que está no comentário logo acima.
- `[TEAM MEMBER]`: nomes e cargos da equipa.
- `[POSTCODE]`: código postal.
- `[LINK TO PRICING PDF]`: link da tabela de preços ou dos formulários.
- `[VENDOR]`: fabricante do equipamento de DLS.
- `[CONFIRM]` em `app.js`: confirmar que fazem análise de pequenas moléculas no qTOF.

Para ver o site no seu computador, basta abrir o `index.html` com duplo clique.

---

## Publicar com o GitHub Pages (grátis, com HTTPS)

### 1. Criar o repositório
1. Crie uma conta em https://github.com, se ainda não tiver.
2. Clique em **New repository**, dê-lhe o nome `hugosantoslab-site` e escolha **Public**.
3. Na página do repositório, clique em **Add file → Upload files**, arraste **todo o conteúdo** desta pasta (incluindo `assets/` e `CNAME`) e clique em **Commit changes**.

### 2. Ligar o GitHub Pages
1. No repositório, abra **Settings → Pages**.
2. Em *Source*, escolha **Deploy from a branch**, depois a branch **main** e a pasta **/ (root)**, e clique em **Save**.
3. Em *Custom domain*, confirme que aparece `hugosantoslab.com`.

### 3. Apontar o domínio (no sítio onde o domínio está registado)
⚠️ **Não mude os "nameservers".** Altere apenas os registos indicados abaixo. Se o email do domínio funciona no mesmo alojamento, os registos **MX** têm de ficar intactos.

Apague os registos **A** atuais de `hugosantoslab.com` (os que apontam para o alojamento do WordPress) e crie estes:

| Tipo  | Nome / Host | Valor                 |
|-------|-------------|-----------------------|
| A     | @           | 185.199.108.153       |
| A     | @           | 185.199.109.153       |
| A     | @           | 185.199.110.153       |
| A     | @           | 185.199.111.153       |
| CNAME | www         | SEU-UTILIZADOR.github.io |

Confirme estes endereços na documentação oficial: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

### 4. Ativar o HTTPS
Quando o DNS propagar (de minutos a algumas horas), volte a **Settings → Pages** e marque **Enforce HTTPS**.

### 5. O WordPress antigo
Antes do passo 3, faça uma cópia de segurança do WordPress (exportação em *Ferramentas → Exportar*, ou backup do alojamento). Depois da mudança, pode cancelar esse alojamento, ou mantê-lo num subdomínio como `old.hugosantoslab.com`.

---

## Alternativa: Cloudflare Pages ou Netlify
As duas também são grátis para um site destes. Em vez do passo 2, crie lá um projeto ligado ao repositório do GitHub (ou arraste esta pasta, na Netlify), sem comando de build e com a pasta de saída `/`. Depois adicione `hugosantoslab.com` como domínio personalizado e siga as instruções de DNS que a plataforma mostra.

## Editar o site depois de publicado
Abra o ficheiro no GitHub, clique no ícone do lápis, altere o texto e clique em **Commit changes**. O site atualiza-se sozinho em cerca de um minuto.
