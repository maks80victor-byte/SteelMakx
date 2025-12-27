# Estrutura de Imagens - SteelMakx

Esta pasta contém todas as imagens utilizadas no site SteelMakx.

## Estrutura de Pastas

### 📦 `/products`
Imagens dos produtos (jogos, gift cards, softwares, etc.)
- Formato recomendado: JPG, PNG ou WebP
- Dimensões recomendadas: 800x600px (proporção 4:3)
- Nomenclatura: `produto-nome-descritivo.jpg`

### 🎨 `/banners`
Banners promocionais e imagens de destaque
- Formato recomendado: JPG, PNG ou WebP
- Dimensões recomendadas: 1920x600px para banners hero
- Nomenclatura: `banner-nome-descritivo.jpg`

### 🏷️ `/logos`
Logotipos da marca e parceiros
- Formato recomendado: PNG ou SVG (com transparência)
- Dimensões: variadas, manter qualidade alta
- Nomenclatura: `logo-nome.png`

### 🎯 `/icons`
Ícones e elementos visuais menores
- Formato recomendado: PNG ou SVG
- Dimensões: 64x64px, 128x128px, 256x256px
- Nomenclatura: `icon-nome.png`

## Como Usar as Imagens

No código, referencie as imagens usando o caminho relativo a partir da pasta `public`:

```tsx
// Exemplo em componente React
<img src="/images/products/meu-produto.jpg" alt="Descrição do produto" />

// Exemplo em CSS
background-image: url('/images/banners/hero-banner.jpg');
```

## Otimização de Imagens

Antes de adicionar imagens, considere:
- ✅ Comprimir imagens para reduzir o tamanho do arquivo
- ✅ Usar formatos modernos como WebP quando possível
- ✅ Manter proporções adequadas para evitar distorção
- ✅ Adicionar texto alternativo (alt) para acessibilidade

## Ferramentas Recomendadas

- **TinyPNG** - Compressão de PNG e JPG
- **Squoosh** - Conversão e otimização de imagens
- **SVGOMG** - Otimização de arquivos SVG
