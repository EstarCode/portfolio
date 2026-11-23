# Portfolio (React + TypeScript + Vite)

## Run
    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in /dist

## Add your information
Edit **src/data/profile.ts** only: name, intro, metrics, projects, experience, education, skills, achievements, links.
Put your résumé at **public/resume.pdf**. Update the title and description in **index.html**.

## Structure
    src/data/profile.ts   all your content (typed by src/types.ts)
    src/components/       Header, Hero, Projects (filterable), Experience, Background, Contact
    src/hooks/useTheme.ts light/dark mode, remembered
    src/styles/global.css design tokens and styles

## Deploy (free)
Push to GitHub, then import the repo on Vercel or Netlify. Build command `npm run build`, output `dist`.
