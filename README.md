# lucgutm.github.io

Bitácora técnica de Lucas Gutiérrez: blog personal de proyectos y apuntes de
ingeniería de software, construido con [Astro](https://astro.build).

- Posts escritos en Markdown (colección en `src/content/blog/`).
- Generación estática, sin frameworks de cliente ni trackers.
- Despliegue automático a GitHub Pages vía GitHub Actions al hacer push a `main`.

## Desarrollo

```sh
npm install
npm run dev     # servidor local en http://localhost:4321
npm run build   # build de producción en ./dist/
npm run preview # previsualizar el build
```

## Borradores

Un post se marca como borrador con `draft: true` en su frontmatter. Los
borradores se muestran en dev para poder revisarlos, pero quedan excluidos del
build de producción (no aparecen en el listado ni generan página).

## Estructura

```text
src/
├── content/blog/        # posts en markdown
├── components/          # Header, Footer, PostCard, PostList, PostDetail
├── layouts/             # BaseLayout (head, meta, fuentes)
├── pages/               # index (listado) y about
├── styles/              # tokens de diseño y estilos globales
└── utils/               # helpers de contenido (filtro de borradores)
```
