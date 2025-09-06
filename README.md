# 🐳 Automated Detection and Remediation of Dockerfile Issues in CI/CD Pipelines

[![Build index.js for GitHub Action](https://github.com/joao-pedro-rdo/scan-dockerfile/actions/workflows/build.yml/badge.svg)](https://github.com/joao-pedro-rdo/scan-dockerfile/actions/workflows/build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A GitHub Action that scans Dockerfiles in your repository and suggests best practices for container security, optimization, and maintainability.

> **⚠️ Status:** This action is in **Development**. Please report any issues or suggestions.

## ✨ Features

<!-- ✅ = Implementado | 🚧 = Em desenvolvimento | ❌ = Planejado -->

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
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: joao-pedro-rdo/scan-dockerfile@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

<!-- ### 🚧 Advanced Configuration 🚧

```yaml
- uses: joao-pedro-rdo/scan-dockerfile@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    dockerfile-path: "./docker"
    ignore-files: "Dockerfile.dev,Dockerfile.test"
    severity-level: "medium"
    create-issue: true
    fail-on-error: false
``` -->

## 📋 Inputs

| Input            | Description                                | Required                     | Default  |
| ---------------- | ------------------------------------------ | ---------------------------- | -------- | --- |
| `github-token`   | GitHub token for API access                | ✅                           | -        |
| <!--             | `dockerfile-path`                          | Path to scan for Dockerfiles | ❌       | `.` |
| `ignore-files`   | Comma-separated list of files to ignore    | ❌                           | -        |
| `severity-level` | Minimum severity level (low, medium, high) | ❌                           | `medium` |
| `create-issue`   | Create GitHub issue with results           | ❌                           | `true`   |
| `fail-on-error`  | Fail the action on high severity issues    | ❌                           | `false`  |

## 📤 Outputs

| Output         | Description            |
| -------------- | ---------------------- |
| `issues-found` | Number of issues found |

<!-- | `security-score` | Security score (0-100) | -->
<!-- | `report-url`     | URL to detailed report | -->

## 🔍 What We Check

- ✅ Use .dockerignore
- ✅ Set WORKDIR to simplify the copy of nested files

- ❌ Declare ports usage
- ❌ Copy dependencies before sources
- ❌ Copy only the necessary files from the build context
- ❌ Avoid pip upgrade
- ❌ Extract stage in a separate Dockerfile
- ❌Use VOLUME for Configuration Files
- ❌Use VOLUME for Dependencies Cache
- ❌Use VOLUME for App Data
- ❌Avoid silencing exit signals
- ❌Prefer a binary executable for ENTRYPOINT
- ❌Avoid hard-coded app-related configuration
- ❌Prefer popular base images (official/community)
- ❌Avoid hard-coded package versions
- ❌Prefer smaller base images
- ❌Avoid outdated base image
- ❌Prefer up-to-date packages and sources
- ❌Avoid hard-coded base image tag
- ❌Join non-consecutive RUN instructions

### Best Practices

- ❌ Proper LABEL usage
- ❌ HEALTHCHECK instructions
- ❌ Signal handling
- ❌ File permissions
- ❌ Documentation completeness

## 📊 Example Output

❌ TODO: Add example output here

<!-- ```
🐳 Dockerfile Scan Results

📁 Found 3 Dockerfiles
🔍 Analyzed 45 instructions
⚠️  Found 7 issues (2 high, 3 medium, 2 low)

High Severity Issues:
• Running as root user (Dockerfile:15)
• Using 'latest' tag (Dockerfile:1)

Medium Severity Issues:
• Missing HEALTHCHECK instruction
• Large image size detected
• Uncached package installation

Security Score: 72/100
``` -->

## 🛠️ Development

### Prerequisites

- Node.js 20+
- TypeScript
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/joao-pedro-rdo/scan-dockerfile.git
cd scan-dockerfile

# Install dependencies
npm install

# Build the action
npm run build

# Run tests
npm test
```

### Project Structure

TODO Make a better structure

```
├── src/
│   ├── index.ts          # Main entry point
│   ├── linterRules/      # Linter rules
│   ├── refactor/         # Refactoring logic
│   ├── reporters/        # Reporting logic
│   └── adapters/         # GitHub API interactions
│   └── utils/            # Utility functions
├── dist/                 # Compiled JavaScript
├── action.yml            # Action metadata
└── README.md
```

### Building

```bash
# Build TypeScript to JavaScript
npm run build

# Package with dependencies
npm run package
```

## 🚧 Testing 🚧

<!--
```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Test locally with act
act -j scan
``` -->

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
```

<!-- ### Custom Rules Configuration

```yaml
- uses: joao-pedro-rdo/scan-dockerfile@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    config-file: ".dockerfile-scanner.yml"
``` -->

<!-- ## ⚙️ Configuration File

Create `.dockerfile-scanner.yml` in your repository root:

```yaml
rules:
  security:
    - no-root-user
    - specific-tags
    - secret-detection
  performance:
    - multi-stage-builds
    - layer-optimization
  style:
    - label-consistency
    - instruction-order

ignore:
  - "Dockerfile.dev"
  - "test/**"

thresholds:
  security_score: 80
  max_image_size: "500MB"
``` -->

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Actions

- [Hadolint Action](https://github.com/hadolint/hadolint-action)

<!-- ## 💬 Support

- 📖 [Documentation](https://github.com/joao-pedro-rdo/scan-dockerfile/wiki)
- 🐛 [Report Issues](https://github.com/joao-pedro-rdo/scan-dockerfile/issues)
- 💭 [Discussions](https://github.com/joao-pedro-rdo/scan-dockerfile/discussions) -->

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/joao-pedro-rdo">João Pedro</a>
</p>
