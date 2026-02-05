# Rohit Ranjan - Portfolio

A clean, professional portfolio website for a Software Architect.

## Quick Start

1. Open `index.html` in a browser to preview locally
2. Customize the content (see below)
3. Deploy to GitHub Pages

## Customization

### Update Your Information

Edit `index.html` and replace:

- **Name & Title**: Search for "Rohit Ranjan" and update
- **Email**: Replace `your.email@example.com`
- **LinkedIn**: Replace `linkedin.com/in/yourprofile`
- **GitHub**: Replace `github.com/yourusername`
- **Twitter**: Replace `twitter.com/yourhandle`
- **Company Names**: Update the experience section with real companies
- **Case Studies**: Replace with your actual projects and metrics

### Customize Colors

Edit `styles.css` and modify the CSS variables at the top:

```css
:root {
    --accent-primary: #3b82f6;    /* Main accent color */
    --accent-secondary: #60a5fa;  /* Hover state */
    --bg-primary: #0a0a0b;        /* Background */
}
```

## Deploy to GitHub Pages

### Option 1: Direct Repository

1. Create a new repository named `yourusername.github.io`
2. Push this folder's contents to the repository
3. Your site will be live at `https://yourusername.github.io`

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### Option 2: Project Repository with GitHub Pages

1. Create any repository (e.g., `portfolio`)
2. Push the code
3. Go to Settings > Pages
4. Set Source to "Deploy from branch" and select `main` branch
5. Your site will be at `https://yourusername.github.io/portfolio`

## Structure

```
portfolio/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Navigation & animations
└── README.md       # This file
```

## Features

- Fully responsive design
- Dark theme with accent colors
- Smooth scroll navigation
- Intersection Observer animations
- Mobile hamburger menu
- Easter egg (try the Konami code!)

## Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge).
