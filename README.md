# 🐳 Automated Detection and Remediation of Dockerfile Issues in CI/CD Pipelines

<p align="center">
<p align="center">
  <a href="https://github.com/joao-pedro-rdo/scan-dockerfile/actions/workflows/build.yml">
    <img src="https://github.com/joao-pedro-rdo/scan-dockerfile/actions/workflows/build.yml/badge.svg" alt="Build index.js for GitHub Action">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/LangChain-1C3C3C.svg?style=for-the-badge&logo=LangChain&logoColor=white" alt="LangChain">
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=for-the-badge&logo=GitHub-Actions&logoColor=white" alt="GitHub Actions">
</p>

</p>
A GitHub Action that scans Dockerfiles in your repository and suggests best practices for container security, optimization, and maintainability.

> [!WARNING]  
> This action is in **Development**. Please report any issues or suggestions.

## ✨ Features

<!-- ✅ = Implementado | 🚧 = Em desenvolvimento | ❌ = Planeado -->

- 🔍 **Comprehensive Dockerfile Analysis** - Scans all Dockerfiles in your repository
- 🛡️ **Security Best Practices** - Identifies potential security vulnerabilities
<!-- - ⚡ **Performance Optimization** - Suggests improvements for image size and build time -->
- 📝 **Detailed Reports** - Provides actionable feedback with explanations
<!-- - 🎯 **Customizable Rules** - Configure which checks to run -->
- 💬 **GitHub Integration** - Comments directly on PRs and Issues with suggestions

## 🚀 Quick Start

### ✅ Basic Usage ✅

> [!NOTE]
> Currently, only supports Dockerfiles named `Dockerfile`

> [!NOTE]  
> AI refactoring runs on the **SentinelCI API** (Agno multi-agent). The model
> provider is configured server-side (chatgpt / gemini).

```yaml
name: Dockerfile Scanner
on: [push, pull_request]

jobs:
  scan:
    permissions:
      contents: write # required to push the fix branch (PR creation)
      issues: write
      pull-requests: write # required to open the PR with the corrected Dockerfile
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: joao-pedro-rdo/scan-dockerfile@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # AI multi-agent refactoring via the SentinelCI API:
          API_URL: ${{ secrets.SENTINELCI_API_URL }}
          API_KEY: ${{ secrets.SENTINELCI_API_KEY }}
          NAME_DOCKERFILE: "Dockerfile-back" # Optional, defaults to Dockerfile
          CREATE_PULL_REQUEST: "true" # Optional, opens a PR with the fix (default: true)
```

> [!IMPORTANT]
> Opening a pull request requires `contents: write` **and** `pull-requests: write`
> permissions on the job. With the default `GITHUB_TOKEN`, also enable
> _Settings → Actions → General → Workflow permissions → "Allow GitHub Actions to
> create and approve pull requests"_.

## 🤖 SentinelCI API Integration (AI multi-agent refactoring)

The action can offload AI-powered refactoring to the **SentinelCI API** (an
Agno multi-agent backend). When the `API_URL` and `API_KEY` inputs are both
provided, the action:

1. Runs the local static-analysis rules and records **which rules were
   violated**.
2. Sends the Dockerfile plus the violated **rule ids** (e.g. `lr_002`,
   `lr_007`) and identifying metadata (repository, commit, workflow) to
   `POST {API_URL}/api/v1/analysis/dockerfile`, authenticated with the
   `X-SentinelCI-API-Key` header.
3. The API selects only the agents matching the detected problems and returns a
   corrected Dockerfile, a comment, and **usage metrics** (token usage and cost
   per pipeline stage). The action prints all of it to the logs and the job
   summary (including a per-stage metrics table).
4. Unless `CREATE_PULL_REQUEST` is `"false"`, the action commits the corrected
   Dockerfile to a new branch (`sentinelci/fix-dockerfile-<run-id>`) and opens a
   **pull request** against the branch that triggered the run. The PR description
   carries the API's comment and the metrics table; the PR is skipped when the
   correction is identical to the original Dockerfile.

If no violations are found, the API call is skipped (nothing to refactor). If
either input is missing, the integration is skipped and the local scan still
runs. A full example is available at
[`examples/sentinelci-scan.yml`](examples/sentinelci-scan.yml).

> [!NOTE]
> AI refactoring was **migrated from the local LangChain LLM to the SentinelCI
> API**. The `LangchainService` classes remain in the repo (under
> `src/refactor/`) for historical comparison and can be re-enabled by passing a
> service to `LR_006`/`LR_007` in `src/index.ts`.

> [!NOTE]
> The action now **opens a pull request** with the corrected Dockerfile (in
> addition to logging the response and job summary). Disable it with
> `CREATE_PULL_REQUEST: "false"` to keep the display-only behaviour.

## 📋 Inputs

| Input                 | Description                                                         | Required | Default          |
| --------------------- | ------------------------------------------------------------------- | -------- | ---------------- |
| `GITHUB_TOKEN`        | GitHub token for API access                                         | ✅       | -                |
| `API_URL`             | Base URL of the SentinelCI API (enables AI multi-agent refactoring) | ❌       | -                |
| `API_KEY`             | SentinelCI API access key (`X-SentinelCI-API-Key`)                  | ❌       | -                |
| `NAME_DOCKERFILE`     | Name of the Dockerfile to scan (only one supported currently)       | ❌       | Dockerfile       |
| `CREATE_PULL_REQUEST` | Open a PR with the corrected Dockerfile (`"true"`/`"false"`)        | ❌       | true             |
| `API_TOKEN`           | _Legacy_ LLM key for the local LangChain rules (no longer required) | ❌       | -                |
| `MODEL_NAME`          | _Legacy_ model name for the local LangChain rules                   | ❌       | gemini-1.5-flash |

> [!NOTE]
> `API_URL` and `API_KEY` work together — both must be set to enable the
> SentinelCI API integration. `API_TOKEN`/`MODEL_NAME` are legacy inputs for the
> superseded local LangChain path and are no longer required.

## 📤 Outputs

| Output         | Description                     |
| -------------- | ------------------------------- |
| `issues-found` | Number of issues found and link |

## ✨ Next Features

- ✅ Migrate AI refactoring to the SentinelCI API (Agno multi-agent)
- ✅ `API_TOKEN` no longer required (refactoring moved to the API)
- ✅ Apply the API's corrected Dockerfile (open a PR automatically)
- 🔜 Support custom Dockerfile names and paths
- 🔜 Setting which Linter Rules you want to enable
- 🔜 Add support for multiple Dockerfile paths
- 🔜 More control over issue creation (labels, assignees, etc)
- 🔜 Support other platforms (GitLab, CLI ...)

## 🔍 What We Check

- ✅ Use .dockerignore
- ✅ Set WORKDIR to simplify the copy of nested files
- ✅ Avoid pip upgrade
- ✅ Declare ports usage
- ✅Join non-consecutive RUN instructions

- 🔜 Copy dependencies before sources
- 🔜 Copy only the necessary files from the build context
- 🔜 Extract stage in a separate Dockerfile
- 🔜 Use VOLUME for Configuration Files
- 🔜 Use VOLUME for Dependencies Cache
- 🔜 Use VOLUME for App Data
- 🔜 Avoid silencing exit signals
- 🔜 Prefer a binary executable for ENTRYPOINT
- 🔜 Avoid hard-coded app-related configuration
- 🔜 Prefer popular base images (official/community)
- 🔜 Avoid hard-coded package versions
- 🔜 Prefer up-to-date packages and sources
- 🔜 Avoid hard-coded base image tag

### Best Practices

- 🔜 Proper LABEL usage
- 🔜 HEALTHCHECK instructions
- 🔜 Signal handling
- 🔜 File permissions
- 🔜 Documentation completeness

<!-- ## 📊 Example Output

❌ TODO: Add example output here -->

## 🛠️ Development

### Prerequisites

- TypeScript
- Node.js 20+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/joao-pedro-rdo/scan-dockerfile.git
cd scan-dockerfile

# Install dependencies
npm install

```

## 🗂️ Project Structure

```
├── src/
│ ├── index.ts # Main entry point
│ ├── linterRules/ # Linter rules
│ ├── refactor/ # Refactoring logic (local LangChain LLM)
│ ├── services/ # SentinelCI API HTTP client
│ ├── reporters/ # Reporting logic (also collects detected agent ids)
│ └── adapters/ # GitHub API interactions
│ └── contracts/ # TypeScript interfaces
│ └── utils.ts # Utility functions
├── examples/ # Example consumer workflows
├── dist/ # Compiled JavaScript
├── action.yml # Action metadata
└── README.md

```

### Building

```bash
# Build TypeScript to JavaScript
npm run build

```

> [!NOTE]  
> The pipeline will automatically build the project on push.

## 🚧 Testing 🚧

I am using repository dispatch events to trigger tests in another repository, you can check it out ([workflows/build.yml](https://github.com/joao-pedro-rdo/scan-dockerfile/blob/develop/.github/workflows/build.yml))

````-->

## 📚 Examples

### 🚧 Basic PR Comment 🚧

```yaml
name: Dockerfile Review
on:
  pull_request:
    paths:
      - "**/Dockerfile*"

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: joao-pedro-rdo/scan-dockerfile@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          create-issue: false
````

#

## 🔗 Related Actions

- [Hadolint Action](https://github.com/hadolint/hadolint-action)
- [dockerfile-ast](https://github.com/rcjsuen/dockerfile-ast) - TypeScript library for
  Dockerfile parsing (used internally)

## 🙏 Acknowledgments

This project uses the following open-source libraries:

- **[dockerfile-ast](https://github.com/rcjsuen/dockerfile-ast)** by [Remy Suen](https://github.com/rcjsuen) - A comprehensive TypeScript library for parsing and analyzing Dockerfiles. Licensed under MIT.
- **[LangChain](https://github.com/langchain-ai/langchainjs)** - Framework for developing applications with language models.

## 📄 License

This project is licensed under the Apache 2.0 - see the [LICENSE](LICENSE) file for details.

<!-- # 🤝 Contributing -->

<!-- Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details. -->

<!-- 1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request -->

---

<p align="center">
  Made by <a href="https://github.com/joao-pedro-rdo">João Pedro</a>
</p>
