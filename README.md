# Bhupinder Singh Portfolio

Personal portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion. It includes experience, featured GitHub projects and case studies, certificates, a CV download, a contact form, theme controls, a terminal demo, and a portfolio assistant.

## Development

Use Node.js 20.9 or later and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Local settings are kept in a single `.env.local` file. Preserve it when updating the project. The build downloads Google Fonts, so it requires access to Google's font servers.

## Email setup

Your existing `.env.local` already contains the EmailJS settings. On a fresh checkout, create that file with the following entries and fill in your EmailJS values:

```dotenv
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Set the same variables in your hosting provider's environment settings. `.env.local` is excluded from Git.

The EmailJS template must accept `from_name`, `from_email`, and `message`, send to your intended inbox, and use the sender's address as Reply-To. Configure allowed website origins in EmailJS, including localhost for local testing. These browser identifiers are public by design; do not place private API keys in `NEXT_PUBLIC_` variables.

The form validates and trims input, retains the message if sending fails, and reports success only after EmailJS accepts the request. Inbox delivery depends on the EmailJS account and template configuration. Test real delivery separately using your own email address.

## Keeping credentials out of Git

Keep local configuration in the existing root `.env.local`; do not commit it. The ignore rules also cover environment-file backups, private-key files, and local credential folders. Check `git status --short` before committing and avoid force-adding ignored credential files.

Git ignore rules prevent normal staging of untracked files; they do not remove a file that was already committed. To verify the current setup:

```sh
git check-ignore -v .env.local
git ls-files -- '.env*' '*.env' '*.key' '*.pem'
```

The first command should show the matching ignore rule, and the second should print no files. Keep the populated `.env.local` on your computer and configure production values in your hosting provider's dashboard.

Values prefixed with `NEXT_PUBLIC_` are included in browser JavaScript even when the environment file is ignored. The current EmailJS service ID, template ID, and public key are browser configuration; do not add a private API key, password, or database credential with that prefix. See the [Next.js environment-variable guide](https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser) and [EmailJS public-key explanation](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/).

The [repository security review](docs/security-review.md) records the Git/history scan, dependency updates, validation results, and remaining development-tool advisory. Run both `npm audit --omit=dev` and `npm audit` when reviewing future dependency changes.

## Code structure

```text
src/
  app/                    Routes, global styles, metadata, social preview image
  components/             Portfolio sections and interactive widgets
    projects/             Project card and case-study presentation
    ui/                   Shared reveal animation and accessible native dialog
  data/                   Profile, experience, projects, certificates
  hooks/                  Browser state and GitHub loading
  lib/                    Terminal, assistant, email, theme, storage, cache logic
  types/                  Shared project interfaces
scripts/test.mjs          Compiles core modules and runs Node's test runner
tests/                   Regression tests for the repaired behavior
public/                  CV, certificates, profile photo, project screenshots
```

Change portfolio text and links in `src/data/`. Add a featured project to `STATIC_PROJECTS` and `FEATURED_REPOSITORY_NAMES` in `src/data/projects.ts`. Each local project remains visible when GitHub is unavailable or returns partial results. GitHub metadata is cached for 30 minutes; invalid cache entries and unavailable browser storage do not prevent loading.

Runtime theme values live in `src/app/globals.css` as `--palette-*` variables. The `@theme inline` mappings generate Tailwind's color utilities, including opacity and hover variants. Supported accent IDs and the pre-paint bootstrap are in `src/lib/theme.ts`.

The social preview is generated at `/opengraph-image` with no external image asset. Update the deployed domain in `src/app/layout.tsx` when changing hosts.

The separate `/softly` concept page is unchanged by this repair. Its original signup demonstration and placeholder links remain; it is not connected to EmailJS.

## Portfolio assistant

The assistant answers questions from the profile, projects, experience, skills and certificates in `src/data/`. It remembers the selected project during the conversation, so questions such as “What technologies does it use?” or “How was it tested?” refer to that project. Replies include links to relevant sections, source code, certificates, the CV and contact options.

Use the restart button in the chat header to clear the conversation and its context. Responses and context logic live in `src/lib/assistant.ts`; the interface is in `src/components/Chatbot.tsx`. The assistant does not require an additional service or API key. Personal details absent from the portfolio are referred to Bhupinder directly.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

Regression tests cover inherited terminal command names, partial repository responses, invalid caches, assistant topic matching, contact validation, and blocked browser storage. They use the existing TypeScript dependency and Node's built-in test runner; they do not send emails.

For browser verification, check:

1. `constructor` and `__proto__` in the terminal return “Command not found” while the page stays usable.
2. A case study shows its screenshot, focuses its close button, contains keyboard focus, closes with Escape or backdrop click, and restores focus to its opener.
3. Theme controls switch the intended colors, persist across reloads, and update supported accents.
4. Blank and whitespace-only contact submissions show validation feedback.
5. `/opengraph-image` returns a 1200 × 630 PNG.

To run the production build locally:

```sh
npm run build
npm start
```

Restart a long-running development server if it continues serving stale styles after theme configuration changes.
