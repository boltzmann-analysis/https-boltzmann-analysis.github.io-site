# Blog Section

This directory contains the Boltzmann Analyser research blog.

## Structure

- `index.html` - Blog listing page showing all posts
- `YYYY-MM-DD-slug.html` - Individual blog posts (date-prefixed for sorting)
- `images/` - Images used in blog posts
- `blog-post-plan.md` - Content roadmap for planned posts

## Adding a New Blog Post

1. Create a new HTML file with naming convention `YYYY-MM-DD-slug.html`
2. Copy the structure from an existing post (e.g., `2025-01-17-lexical-complexity-intro.html`)
3. Update the `<title>`, metadata, and content
4. Add an entry to `index.html` in the `.blog-list` section

## Blog Post Template Structure

Each post includes:
- Inline `<style>` block for blog-specific styles (copied from existing posts)
- Standard site header with nav (links to Blog and Register Interest)
- `.blog-container` main content area with:
  - `.blog-header` - Title and metadata
  - `.blog-content` - Article body
- Prism.js for code syntax highlighting

## Navigation

All blog pages include consistent nav links:
- Logo links back to home (`../index.html`)
- "Blog" link points to `index.html`
- "Register Interest" links to `../index.html#register`

## Styles

Blog pages use `../styles.css` for base styles plus inline styles for blog-specific layout. Key CSS variables from the main stylesheet:
- `--text-primary` - Main text color
- `--text-secondary` - Muted text
- `--accent-color` - Cyan highlight color (#00d4ff)
- `--border-color` - Subtle borders

## Images

Place blog images in the `images/` subdirectory. Reference them with relative paths:
```html
<img src="images/my-image.png" alt="Description" />
```

## Content Guidelines

**Research claims and citations:** Never include claims about external research (e.g., "cognitive science research shows...", "studies have found...") without proper citations. Only include such claims if the user provides the specific citation or source. Making unsourced claims about research findings undermines credibility and may be inaccurate.
