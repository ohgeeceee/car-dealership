# Car Dealership SaaS Demo

A portfolio concept for an all-in-one independent dealership platform: a customer-facing inventory site, a sales-team desk, and an owner/dealer portal. The landing page includes three illustrative packages and links into the interactive sample workspace.

**Live demo:** https://ohgeeceee.github.io/car-dealership/  
**Sales desk:** https://ohgeeceee.github.io/car-dealership/demo/  
**Dealer portal:** https://ohgeeceee.github.io/car-dealership/portal/

## Run locally

```sh
npm ci
npm run dev
```

## Build for GitHub Pages

```sh
npm run build:pages
```

The GitHub Actions workflow deploys the `main` branch to GitHub Pages after each push. The `/demo/` and `/portal/` static entry points keep direct links and refreshes working on Pages.

All workspace records are fictional sample data. This portfolio demo does not connect to a dealership account, database, API, or billing service. The displayed monthly prices are illustrative, not a commercial offer.
