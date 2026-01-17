# Boltzmann Site

Astro-based static site for boltzmann.co.uk

## Git Workflow

**Never work directly on the main branch.** Always create a feature branch for changes:

```bash
git checkout -b feature/description-of-change
```

Push the branch and create a PR for review before merging to main.

## Structure

- `src/pages/` - Page routes (index, blog)
- `src/layouts/` - BaseLayout, BlogPost
- `src/components/` - Reusable components (Header, ImageModal)
- `src/content/blog/` - Blog posts in MDX format
- `public/` - Static assets (images, logo, CNAME)

## Adding a Blog Post

Create a new `.mdx` file in `src/content/blog/` with frontmatter:

```mdx
---
title: "Post Title"
description: "Brief description"
date: 2025-01-20
series: "Lexical Complexity Research Series"
seriesPart: 2
---
```

Images in blog posts automatically open in a modal when clicked.

## Research Sources

When writing blog posts, use these directories as sources of information:

- `../boltzmann-experiment` - Phase 1 experiment data and analysis
- `../boltzmann-experiment-phase-2` - Phase 2 experiment data and analysis

These contain the actual research findings, validation results, and methodology documentation.

Copy relevant charts and visualizations from these directories into `public/images/` and include them in blog posts. New charts can also be generated (using matplotlib, seaborn, etc.) where helpful to illustrate a point. Visual evidence strengthens the writing.

## Content Guidelines

**Tone:** Be humble and curious, not self-aggrandizing. Don't put down other people's work or metrics to make this one look better. The framing should be genuine curiosity about whether this metric (which started as a whim) actually has value - not claiming superiority over established approaches.

Present findings with appropriate uncertainty throughout - not confident claims followed by late walk-backs. If a result has multiple interpretations or limitations, introduce that ambiguity upfront rather than building up confidence and then deflating it. The reader should feel they're exploring alongside the author, not being sold a conclusion.

**Research claims and citations:** Never include claims about external research (e.g., "cognitive science research shows...", "studies have found...") without proper citations. Only include such claims if the user provides the specific citation or source. Making unsourced claims about research findings undermines credibility and may be inaccurate.

## Development

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production
```

Deploys automatically via GitHub Actions on push to main.
