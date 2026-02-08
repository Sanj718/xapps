# xapps

Simple static site for xapps. Built with Jekyll. Deployable to GitHub Pages.

## Local development

1. Install Ruby (if not already installed).

2. Install dependencies:

   ```bash
   bundle install
   ```

3. Run the dev server:

   ```bash
   bundle exec jekyll serve
   ```

   Or with npm:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:4000](http://localhost:4000). The site will reload when you edit files.

## Deploy with GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under "Source", select **Deploy from a branch**.
4. Choose your default branch (usually `main`) and **/ (root)** as the folder.
5. Click Save. GitHub will build the site with Jekyll automatically.

The site will be live at `https://<username>.github.io/<repo-name>/`.

## Project structure

```
├── _config.yml
├── _includes/
│   └── header.html
├── _layouts/
│   └── default.html
├── css/
│   └── style.css
├── index.html
├── docs.html
├── Gemfile
└── README.md
```

- **`_includes/header.html`** — Shared header with logo and nav.
- **`_layouts/default.html`** — Base layout wrapping all pages.
- **`index.html`**, **`docs.html`** — Page content with front matter.
