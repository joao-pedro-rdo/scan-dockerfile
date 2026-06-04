# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SentinelCI is a GitHub Action that scans Dockerfiles for best practices, security issues, and optimization opportunities. It uses TypeScript, integrates with the GitHub API via Octokit, and optionally uses LLMs (Groq/Gemini via LangChain) for AI-powered refactoring suggestions.

## Commands

```bash
npm run build          # Bundle TypeScript → dist/ using Vercel NCC (single JS file)
npm run build:ci       # Type-check + build (used in CI)
npm run type-check     # TypeScript type check without emitting
npm run format         # Format all files with Prettier
npm run format:check   # Check formatting without modifying files
npm start              # Run the compiled action locally (node dist/index.js)
```

There are no tests currently (`npm test` is a placeholder).

## Architecture

**Entry point:** `src/index.ts` — creates the GitHub adapter and reporter, then runs linter rules sequentially.

**Key abstractions (`src/contracts/`):**
- `ILinterRule` — interface all linter rules implement; each rule receives the adapter + reporter + Dockerfile AST
- `IGitHubActionsAdapter` — wraps Octokit for GitHub API calls
- `IReporter` / `IgithubaActionsReporters` — output abstraction (logs, issues, PR comments)
- `iaServiceInterface.ts` — `RefactorRequest`/`RefactorResponse` for LLM calls

**Linter rules (`src/linterRules/LR_00N_*.ts`):** Named `LR_001` through `LR_007`. Rules ending in pure structural checks run fast; `LR_006` (join RUN layers) and `LR_007` (dependency order) call the LLM and are slower.

**AI layer (`src/refactor/`):**
- `dockerfileAST.ts` — wraps `dockerfile-ast` library with an `AdapterDockerfileAST` class
- `langChain.ts` — `LangchainService` using Groq; `langChainTesteLLM.ts` is a test/stub variant

**Heuristics (`src/heuristic/`):** Pure domain knowledge helpers used by AI rules (e.g., known dependency file patterns per ecosystem: npm, pip, go, cargo).

**Output flow:** Rules push findings to `githubaActionsReporters` (`src/reporters/`), which creates GitHub issues, PR review comments, or job summaries depending on context.

## Bundling

The action uses `@vercel/ncc` to bundle `src/index.ts` and all dependencies into a single `dist/index.js`. The `dist/` directory is committed to the repository — the CI workflow (`build.yml`) auto-commits updated builds on pushes to main/develop/feature branches.

## Adding a New Linter Rule

1. Create `src/linterRules/LR_00N_<name>.ts` implementing `ILinterRule`.
2. Import and call it in `src/index.ts`.
3. Rules that need LLM access should use `LangchainService`; rules without AI should avoid it to stay fast.

## Environment / Inputs

The action reads inputs via `@actions/core` as defined in `action.yml`. The `API_TOKEN` input is required for AI-powered rules (LLM calls). Without it, AI rules should be skipped gracefully.

## Code Style

Prettier enforces formatting (`.prettierrc.json`): 100-char line width, double quotes, trailing commas (ES5), LF line endings. Run `npm run format` before committing.
