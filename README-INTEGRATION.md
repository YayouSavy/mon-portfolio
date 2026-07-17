# Portfolio Illiana Savy · intégration

## 1. Copier les fichiers
Depuis ce dossier, copie dans ton projet `mon-portfolio` :
- `src/` → remplace `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, et ajoute `src/components/` + `src/lib/`
- `public/portrait.png` → dans ton dossier `public/`
- Dépose aussi ton CV : `public/Savy_Illiana_CV.pdf` (le bouton "Télécharger le CV" pointe dessus)

## 2. Tailwind v4 ou v3 ?
Ouvre ton `src/app/globals.css` ACTUEL avant de le remplacer :
- Il commence par `@import "tailwindcss";` → tu es en **v4** : le nouveau `globals.css` marche tel quel, et tu peux **supprimer** `tailwind.config.ts`.
- Il commence par `@tailwind base;` → tu es en **v3** : dans le nouveau `globals.css`, commente la ligne `@import "tailwindcss";`, décommente les 3 directives `@tailwind`, et garde `tailwind.config.ts` à la racine.

## 3. Lancer
```bash
npm run dev
```
Ouvre http://localhost:3000

## 4. À savoir
- La photo `portrait.png` vient de remove.bg en 388px : pense à réexporter la version HD pour la prod.
- Le lien LinkedIn dans `src/components/Contact.tsx` est à compléter avec ton URL de profil.
- Reduced motion : géré par `<MotionConfig reducedMotion="user">` dans `MotionProvider.tsx`.
