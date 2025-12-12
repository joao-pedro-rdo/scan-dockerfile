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

> **⚠️ Status:** This action is in **Development**. Please report any issues or suggestions.

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

```yaml
name: Dockerfile Scanner
on: [push, pull_request]

jobs:
  scan:
   permissions:
      contents: read
      issues: write
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: joao-pedro-rdo/SentinelCI@v0.1.0
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          API_TOKEN: ${{ secrets.API_TOKEN }}
```

## 📋 Inputs

| Input          | Description                           | Required | Default |
| -------------- | ------------------------------------- | -------- | ------- |
| `github-token` | GitHub token for API access           | ✅       | -       |
| `API_TOKEN`    | API token for external service access | ✅       | -       |

## 📤 Outputs

| Output         | Description                     |
| -------------- | ------------------------------- |
| `issues-found` | Number of issues found and link |

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

## 📊 Example Output

❌ TODO: Add example output here

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
│ ├── refactor/ # Refactoring logic
│ ├── reporters/ # Reporting logic
│ └── adapters/ # GitHub API interactions
│ └── contracts/ # TypeScript interfaces
│ └── utils.ts # Utility functions
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
