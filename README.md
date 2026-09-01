# UseMyCar — P2P Carsharing Landing Page & Validation Framework

Built to test market demand rather than sell a finished product, this repository serves as the validation layer for UseMyCar, a peer-to-peer carsharing concept tailored for the Croatian market. The landing page is instrumented to capture high-intent user signals and measure actual interest rather than relying on passive feedback.

## About the Project
UseMyCar originated as a startup concept developed through the StartIT Dalmacija competition, supported by mentorship from the Smion agency. The initial vision centered on a fully automated rental flow featuring remote vehicle inspection through a machine learning damage detection model. To eliminate the need for physical offices entirely, the platform was designed to handle e-signed contracts and automated tax registration by integrating directly with Croatia's native Certilia and ePorezna systems.

However, early market and regulatory research revealed a critical legal constraint under Croatian law, which prohibits private individuals from renting out personal vehicles outside of licensed rent-a-car companies. Consequently, the platform needed to operate as a licensed rent-a-car entity that acts as the legal bridge between individual vehicle owners and renters, rather than facilitating direct peer-to-peer transactions, which marked a significant pivot from the original premise.

This repository represents the validation phase of that project. Before committing further engineering resources, the landing page was deployed to evaluate genuine demand, validate message-market fit and specifically test whether insurance concerns represented the primary barrier for prospective vehicle owners.

<p align="center">
  <img src="assets/Slika%20zaslona%202026-09-01%2016-25-33.png" alt="UseMyCar App Concept" width="600" />
</p>

## Key Features

- **Lead acquisition form** — To move beyond superficial traffic analytics, the system collects detailed vehicle and contact data as a strong proxy for genuine supply-side commitment.
- **Interactive earnings calculator** — Designed to transform a static pitch into a personalized value proposition, enabling vehicle owners to estimate prospective monthly revenue based on location, car specs, and availability.
<p align="center">
  <img src="assets/Slika%20zaslona%202026-09-01%2016-08-57.png" alt="Interactive earnings calculator" width="600" />
</p>

- **Advanced analytics architecture** — Built with Google Analytics (gtag.js) and Consent Mode v2 to capture granular user interactions, from calculator inputs to form completions, mapping high-intent signals and conversion drop-offs.
  
<p align="center">
  <img src="assets/Slika%20zaslona%202026-09-01%2016-08-31.png" alt="Advanced analytics architecture" width="600" />
</p>

- **Ad-to-conversion tracking** — Integrated directly with Facebook and Instagram video ad campaigns, leveraging custom event triggers to connect ad traffic to on-page behavior and verified lead submissions.

<p align="center">
  <img src="assets/Slika%20zaslona%202026-09-01%2016-16-39.png" alt="Ad-to-conversion tracking" width="600" />
</p>

- **SEO & performance-oriented markup** — Structured with semantic HTML, tailored meta tags, and lightweight WebP media assets to maximize page speed and support discovery across organic and paid channels.

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Tailwind CSS (CDN)
- **Backend:** PHP (`submit_form.php`) — originally handled form submissions into a MySQL database hosted on Hostinger, which was also the primary hosting provider during the active campaign phase (domain registered via Wix)
- **Analytics:** Google Analytics (gtag.js) with Consent Mode v2
- **Consent management:** Cookiebot

> **Note:** After the active advertising campaign ended, the project was migrated off Hostinger/Wix hosting and is now served live directly via **GitHub Pages**. The form submission backend was correspondingly switched from the PHP/MySQL flow to **Web3Forms**, so lead capture and email notifications continue to work on the static GitHub-hosted version without requiring a PHP server. The legacy PHP/MySQL code remains in the repo for reference.

## Validation Methodology & Analytics

The core goal of this landing page wasn't traffic, it was **learning**. Every meaningful interaction on the page is instrumented as a discrete event, so user behavior could be reconstructed and analyzed after each advertising push, rather than relying on aggregate pageview metrics alone.

Key tracked events include:

- `click_hero_join` / `click_calculator_join` — measures which call-to-action (hero section vs. calculator) actually drives intent to sign up
- `open_modal` — tracks engagement with "About Us" and "How It Works" content, indicating how much explanation users need before converting
- `click_protection_div` — specifically tracks clicks on the insurance feature card to quantify owner trust and safety concerns.
- `calculator_input` — logs interaction with each calculator field (location, car type, car year, days available), showing which inputs users actually engage with before abandoning or continuing
- `form_field_filled` — fires on each form field completion (without capturing PII values), used to map the funnel and pinpoint the exact field where drop-off occurs
- `form_submit` — Captures final registrations, automatically saving user entries into the database to build a pool of prospective early adopters and first-wave users. Used as the ground-truth metric against ad spend and traffic source.

<p align="center">
  <img src="assets/Slika%20zaslona%202025-07-11%2013-54-20.jpg" alt="Ad-to-conversion tracking" width="600" />
</p>

Combined with Cookiebot-gated consent and UTM-tagged ad traffic from Instagram and Facebook, this setup made it possible to connect specific ad creatives to specific on-page behavior and conversions, turning the landing page into both a lead-generation tool and a structured research instrument.

## Conversion Performance & Key Data Insights

Data collected across **1,300 unique visitors** and **11,209 total events** (averaging **8.63 events per user**) provided clear validation signals:

* **High Interactive Engagement:** 356 unique users (27.4% of total traffic) actively interacted with the earnings calculator, generating 1875 events. With an average of 5.27 interactions per user, the calculator proved to be the primary hook for driving engagement.
* **Hero CTA Performance:** 145 visitors (11.15%) clicked the main sign-up button right at the top of the page, showing strong immediate interest without needing to scroll down.
* **Critical Trust Signal (Protection):** While 33 users (2.54%) clicked on `click_protection_div`, they generated 172 total clicks—an average of 5.21 interactions per active user. This high repeat engagement highlighted insurance and vehicle coverage as a crucial psychological decision factor.
* **Funnel Progression & Lead Capture:** 49 users (3.77%) progressed to filling out onboarding form fields (`form_field_filled`), recording 6.8 field completions per user (333 total events) as they navigated through the registration flow.

## Previous Project Phases

Before this landing page existed, the team spent three months running a structured **Startup Drill** process on a shared Miro board, under mentor guidance:

1. **Problem discovery** — surfacing and documenting assumptions about the problem space
2. **Early adopter identification** — defining who would feel this problem most acutely
3. **Assumption ranking** — prioritizing which assumptions were riskiest and most worth testing first
4. **User interviews** — testing ranked assumptions directly with target users, extracting learnings and generating new assumptions in response
5. **Market & user research** — covering the regulatory landscape, relevant patents, industry trends, pricing strategy development, competitive analysis and insurance considerations
6. **Value proposition & business model design** — synthesizing interview and research findings into a testable value proposition and business model
7. **Landing page validation** (this repository) — building a live, trackable landing page to test the resulting value proposition with real traffic and real conversions

The results from this landing page — validated interest, the insurance concern signal, and conversion data — became the central evidence base for the project's final pitch presentation.

**Live demo:** https://bjukic00.github.io/UseMyCar-Landing-Page/
