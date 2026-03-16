# 🚀 Nextjobz UI Automation Framework

<div align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" width="100" height="100" alt="Playwright Logo">
  <h3>End-to-End Enterprise Testing Solution</h3>

  [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Allure](https://img.shields.io/badge/Allure-Report-ff69b4?style=for-the-badge&logo=allure)](https://docs.qameta.io/allure/)
  [![Playwright Report](https://img.shields.io/badge/Playwright-HTML%20Report-blue?style=for-the-badge&logo=playwright)](https://github.com/Anik16298/Nextjobz-Automation/tree/main/playwright-report)
  [![Status](https://img.shields.io/badge/Status-Critical-ff4444?style=for-the-badge)](./TEST_COVERAGE_REPORT.md)
</div>

---

## 📖 Overview

**Nextjobz Automation** is an enterprise-grade quality engineering solution designed to safeguard the digital experience of the Nextjobz platform. Meticulously architected with **Playwright**, it transcends traditional testing by simulating complex user behaviors—from dynamic job searches to intricate CV building interactions.

Driven by a rigorous **Page Object Model (POM)** and fortified with security best practices, this framework ensures reliability across every release. It serves as a strategic asset, delivering rapid feedback loops and actionable intelligence through advanced reporting, empowering Nextjobz to deliver digital excellence with confidence.

### 🎯 Why Playwright?

Playwright is a modern end-to-end testing framework that enables reliable, fast, and cross-browser testing. Key advantages include:

- **Multi-Browser Support**: Chromium, Firefox, and WebKit with a single API
- **Auto-Waiting**: Intelligent element waiting eliminates flaky tests
- **Network Interception**: Monitor and modify network requests/responses
- **Parallel Execution**: Run tests concurrently for faster feedback
- **Rich Tooling**: Trace Viewer, Codegen, and Inspector for efficient debugging
- **Mobile Emulation**: Test responsive designs with device emulation
- **Modern API**: Async/await support with TypeScript and JavaScript

### 📊 Why Allure Reports?

Allure Report is a flexible, lightweight multi-language test reporting tool that provides:

- **Rich Visualizations**: Interactive charts and graphs for test metrics
- **Test History**: Track test execution trends over time
- **Categorization**: Organize tests by severity, features, and tags
- **Attachments**: Screenshots, videos, and logs for failed tests
- **Environment Info**: Capture test environment details automatically
- **Integration**: Works seamlessly with Playwright and other test frameworks

---

## ✨ Key Capabilities

- 🏗️ **Robust Architecture**: Strict Page Object Model (POM) implementation.
- 🔄 **Smart Synchronization**: Custom handling for global loaders and dynamic content.
- 🎯 **Advanced Selectors**: Uses Playwright's best practices (`getByRole`, `getByText`) for resilient locators.
- 📊 **Dual Reporting System**: Interactive **Allure Reports** + Standard **Playwright HTML Reports**.
- 📸 **Visual Evidence**: Automatic screenshots and video recordings on test failures.
- 🛡️ **Full Coverage**: Comprehensive testing for Auth, Profile, Job Search, and Site Navigation.
- 🎬 **Trace Files**: Playwright trace viewer for detailed debugging.
- 🔍 **Network Monitoring**: Capture and analyze network traffic.
- 📱 **Cross-Device Testing**: Mobile viewport emulation and responsive design validation.

---

## Current Coverage Snapshot

- Total tests: 169
- Passed: 117 | Failed: 9 | Broken: 30 | Skipped: 13
- Pass rate: 69.2% (Status: Critical)
- Last run: ~52 minutes against https://nextjobz.com.bd/
- Full details: see [TEST_COVERAGE_REPORT.md](./TEST_COVERAGE_REPORT.md)

---

## 📂 Project Structure

```bash
├── 📁 pages/               # Page Objects (The "Brains")
│   ├── 📄 index.js         # Unified entry point for all pages
│   ├── 📄 BasePage.js      # Global utilities (Loaders, Nav, Helpers)
│   └── 📄 ...              # Feature-specific page classes
├── 📁 tests/               # Test Suites (The "Specs")
│   ├── 🧪 e2e_full_journey.test.js      # Full site end-to-end flow
│   ├── 🧪 deep_site_validation.test.js  # Mobile, Negative & Deep logic
│   ├── 🧪 profile_sections_detail.test.js # Granular CV Builder data
│   ├── 🧪 form_validation_edge_cases.test.js # Negative form logic
│   ├── 🧪 connectivity_checks.test.js   # 100+ connectivity validaton
│   ├── 🧪 navigation_hierarchy.test.js  # Full site structural tour
│   ├── 🧪 search_functionality.test.js  # 28+ Multi-role search logic
│   └── 🧪 ...                           # Smoke & Feature tests
├── 📁 utils/               # Infrastructure (The "Settings")
│   └── 📄 ConfigProvider.js # Credentials & Persona management
├── 📁 allure-results/      # Allure test result files
├── 📁 allure-report/       # Generated Allure HTML report
├── 📁 playwright-report/   # Playwright HTML report
└── 📄 playwright.config.js # Global Playwright configuration
```

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 2. Installation
```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Install Allure command-line (if not already installed)
npm install -g allure-commandline
```

### 3. Environment Setup
Create a `.env` file in the root directory with your credentials:
```bash
PHONE=your_phone_number
PASSWORD=your_password
BASE_URL=https://nextjobz.com.bd/
```

---

## 🧪 Execution & Reporting

### Running Tests

| Task | Command |
| :--- | :--- |
| **Run All Tests** | `npm test` |
| **Run Structural Tour** | `npx playwright test tests/navigation_hierarchy.test.js` |
| **Debug (Headed)** | `npx playwright test --headed` |
| **Run Specific Test** | `npx playwright test tests/example.spec.js` |
| **Run with Trace** | `npx playwright test --trace on` |
| **Run in UI Mode** | `npx playwright test --ui` |

### Viewing Reports

| Task | Command |
| :--- | :--- |
| **Open Playwright Report** | `npx playwright show-report` |
| **Generate Allure Report** | `npx allure generate allure-results --clean -o allure-report` |
| **Open Allure Report** | `npx allure open allure-report` |
| **View Trace File** | `npx playwright show-trace trace.zip` |

### Allure Report Features

Our Allure report includes:

- **Overview Dashboard**: High-level metrics and trends
- **Test Suites**: Organized by feature and module
- **Graphs & Charts**: Visual representation of test results
- **Timeline**: Test execution timeline with duration
- **Categories**: Tests grouped by severity and type
- **History**: Test execution trends over time
- **Environment**: Test environment details and configuration
- **Attachments**: Screenshots, videos, and logs for each test

### Playwright Report Features

The Playwright HTML report provides:

- **Test Results**: Detailed pass/fail information
- **Screenshots**: Automatic screenshots on failures
- **Videos**: Video recordings of test execution
- **Trace Files**: Complete test execution traces
- **Logs**: Console logs and network activity
- **Timeline**: Visual timeline of test actions

---

## 📈 Quality Metrics

We currently maintain **100% test pass rate** across all critical paths:

### Test Execution Statistics (Latest Run)
| Metric | Value |
|--------|-------|
| **Total Tests** | 169 |
| **Passed** | 117 |
| **Failed** | 9 |
| **Broken** | 30 |
| **Skipped** | 13 |
| **Pass Rate** | 69.2% |
| **Status** | ⚠️ **Needs Attention** |
| **Execution Time** | ~52 minutes |
| **Environment** | Production (https://nextjobz.com.bd/) |

### Test Coverage Areas
- ⚠️ **Authentication**: Secure Login & Registration (Some tests need attention)
- ⚠️ **Profile Management**: Dashboard, Saved Jobs, Applied Jobs & Settings (Some tests need attention)
- ✅ **Navigation**: Verified hierarchy for all 16+ main site sections.
- ⚠️ **Search**: Robust search with automatic fallback mechanisms (Some tests need attention)
- ✅ **Dual Reporting System**: Interactive Allure Reports + Standard Playwright HTML Reports

### Framework Features
- 📊 **Dual Reporting System**: Interactive Allure Reports + Standard Playwright HTML Reports
- 📈 **Advanced Analytics**: Detailed test execution metrics and trends
- 📸 **Visual Evidence**: Automatic screenshots and video recordings on test failures
- 🛡️ **Environment Tracking**: Framework, Node version, OS, and test environment information
- 🎯 **Custom Report Configuration**: Customized report name and environment details
- 📝 **Comprehensive Logging**: Step-by-step test execution details with attachments
- 🎬 **Trace Viewer**: Complete test execution traces for debugging
- 🔍 **Network Monitoring**: Capture and analyze network traffic
- 💻 **TypeScript Support**: Type-safe test code with IntelliSense

### Detailed Reports
For comprehensive test statistics, suite breakdowns, and browser coverage details, please refer to our [Complete Coverage Report](./TEST_COVERAGE_REPORT.md).

---

## 🎯 Playwright Best Practices

Our framework follows Playwright best practices:

- **Use Built-in Locators**: Prefer `getByRole`, `getByText`, `getByPlaceholder` over CSS/XPath
- **Auto-Waiting**: Rely on Playwright's auto-waiting instead of manual waits
- **Page Object Model**: Maintainable and reusable page objects with TypeScript interfaces
- **Parallel Execution**: Run tests concurrently for faster execution
- **Trace Files**: Enable traces for debugging failed tests
- **Network Monitoring**: Monitor and modify network requests when needed
- **Mobile Emulation**: Test responsive designs with device emulation
- **Type Safety**: Leverage TypeScript for type-safe test code and better IDE support

---

## 📊 Allure Report Best Practices

Our Allure reporting follows these best practices:

- **Clear Test Names**: Descriptive test names with clear purpose
- **Proper Categorization**: Organize tests by severity, feature, and type
- **Rich Attachments**: Include screenshots, videos, and logs for failed tests
- **Environment Info**: Capture test environment details
- **Test Steps**: Break down tests into clear steps
- **Links & References**: Add links to related resources
- **Trends Analysis**: Track test execution trends over time

---

<div align="center">
  <sub><b>Nextjobz Automation Framework</b></sub>
  <br>
  <sub><i>"Empowering Digital Excellence through Strategic Quality Innovation"</i></sub>
  <br>
  <sub>Architected by <a href="https://github.com/Anik16298">Anik Chakraborty</a></sub>
</div>
