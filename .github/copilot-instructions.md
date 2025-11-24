<!-- Generated: guidance for AI coding agents working in Noircraft -->
# Copilot Instructions for Noircraft

This file gives concise, actionable guidance for AI coding agents working in this repository.

1. Big picture
- **Purpose:** privacy-preserving Noir contracts + a static website showcasing examples and templates.
- **Major folders:** `contracts/` (production templates and demos), `examples/` (learning projects), `docs/` (guides/research), `website/` (static site), `assets/` (images/scripts).
- **Data flow:** Noir projects produce `target/*.json` artifacts via `nargo` (proof inputs/contract artifacts) which are referenced by `website/assets/example-contracts.js` or deployed to Aztec via an SDK/CLI.

2. Key developer workflows (commands you can run)
- Install Noir CLI: `curl -L https://raw.githubusercontent.com/noir-lang/noir/master/install.sh | bash`.
- Common Noir project flow (run inside a Noir project directory with `Nargo.toml`):
  - `nargo test` — run unit tests for a circuit/contract.
  - `nargo prove` — generate a proof artifact.
  - `nargo verify` / `nargo info` — verify or inspect compiled info and constraint counts.
- Serve the website locally: from `website/` run `npx serve -l 9000 .` (or `python -m http.server 8000`) and open `http://localhost:9000`.
- Deploy: follow `DEPLOYMENT.md` and set Netlify publish directory to `website`.

3. Project-specific conventions & patterns
- Noir projects follow the `Nargo.toml` + `src/main.nr` layout (see `examples/*/*/` and `contracts/templates/*`).
- Use `std::println` for on-chain/circuit debugging output during local testing.
- Common primitives: Pedersen hashes for commitments, nullifier schemes to prevent double-spend, Merkle proofs for membership checks — see `contracts/templates` and `docs/guides` for examples.
- Keep public inputs minimal and validate them explicitly; tests often exercise edge cases via `examples/*`.

4. Files/directories to inspect for context
- `contracts/templates/` — production-ready contract patterns.
- `examples/` — runnable, minimal projects for copy-paste examples (each contains `Nargo.toml`, `src/main.nr`, and often `target/*.json`).
- `docs/guides/` — explains reasoning behind cryptographic choices and debugging tips.
- `website/assets/example-contracts.js` — shows how generated artifacts are consumed by the frontend.
- `DEPLOYMENT.md`, `VERSION_README.md`, and top-level scripts (`deploy.sh`, `update-version.sh`) for release flows.

5. Safe editing guidance for AI agents
- Do not change contract logic in `contracts/templates/` without adding or updating `nargo` tests; these are security-sensitive.
- When changing a Noir circuit, run `nargo test` and `nargo prove` locally and include the resulting `target/*.json` in PRs when the change affects artifacts used by the website/examples.
- Avoid altering CSS/visual assets without checking `website/README.md` for styling expectations; the site is static and lightweight.

6. Example snippets (where to find examples)
- Example Noir program entry: `examples/snark/simple_snark_demo/src/main.nr` and `examples/privacy/aztec_privacy_demo/`.
- Use `nargo info` and `nargo test --verbose` when debugging failing proofs.

7. When you need more info
- Read `docs/` for protocol rationale and `README.md` files in each top-level folder for quick context.
- If something touches deployment or live keys, stop and ask a human reviewer.

If any section is unclear or you want additional examples (for instance, a quick walkthrough of `examples/snark/simple_snark_demo`), tell me what to expand.
