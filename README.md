# 🚀 Nextjobz UI Automation Framework

<div align="center">
  <img src="https://playwright.dev/img/playwright-logo.svg" width="100" height="100" alt="Playwright Logo">
  <h3>End-to-End Enterprise Testing Solution</h3>

  [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=Playwright&logoColor=white)](https://playwright.dev/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![Allure](https://img.shields.io/badge/Allure-Report-ff69b4?style=for-the-badge&logo=allure)](https://docs.qameta.io/allure/)
  [![Playwright Report](https://img.shields.io/badge/Playwright-HTML%20Report-blue?style=for-the-badge&logo=playwright)](https://github.com/Anik16298/Nextjobz-Automation/tree/main/playwright-report)
  [![Status](https://img.shields.io/badge/Status-Success-brightgreen?style=for-the-badge)](./TEST_COVERAGE_REPORT.md)
</div>

---

## 📖 Overview

A state-of-the-art **automated testing framework** designed for the Nextjobz platform. Built on **Playwright**, this framework ensures seamless user experiences across the entire job-seeking and employer journey. It employs the **Page Object Model (POM)** pattern for maximum scalability and maintainability.

---

## ✨ Key Capabilities

- 🏗️ **Robust Architecture**: Strict Page Object Model (POM) implementation.
- 🔄 **Smart Synchronization**: Custom handling for global loaders and dynamic content.
- 🎯 **Advanced Selectors**: Uses Playwright's best practices (`getByRole`, `getByText`) for resilient locators.
- 📊 **Dual Reporting System**: Interactive **Allure Reports** + Standard **Playwright HTML Reports**.
- 📸 **Visual Evidence**: Automatic screenshots and video recordings on test failures.
- 🛡️ **Full Coverage**: Comprehensive testing for Auth, Profile, Job Search, and Site Navigation.

---

## 📂 Project Structure

```bash
├── 📁 pages/               # Page Objects (The "Brains")
│   ├── 📄 index.js         # Unified entry point for all pages
│   ├── 📄 BasePage.js      # Global utilities (Loaders, Nav, Helpers)
│   └── 📄 ...              # Feature-specific page classes
├── 📁 tests/               # Test Suites (The "Specs")
│   ├── 🧪 navigation_hierarchy.test.js  # Full site structural tour
│   ├── 🧪 profile.test.js               # Dashboard & User journey
│   └── 🧪 search_functionality.test.js  # Robust search logic
├── 📁 utils/               # Infrastructure (The "Settings")
│   └── 📄 ConfigProvider.js # Credentials & Env management
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

| Task | Command |
| :--- | :--- |
| **Run All Tests** | `npm test` |
| **Run Structural Tour** | `npx playwright test tests/navigation_hierarchy.test.js` |
| **Debug (Headed)** | `npx playwright test --headed` |
| **Open Playwright Report** | `npx playwright show-report` |
| **Generate Allure Report** | `npx allure generate allure-results --clean -o allure-report` |
| **Open Allure Report** | `npx allure open allure-report` |

---

## 📈 Quality Metrics

We currently maintain **100% test pass rate** across all critical paths:

- ✅ **Authentication**: Secure Login & Registration.
- ✅ **Profile Management**: Dashboard, Saved Jobs, Applied Jobs & Settings.
- ✅ **Navigation**: Verified hierarchy for all 16+ main site sections.
- ✅ **Search**: Robust search with automatic fallback mechanisms.

---

<div align="center">
  <sub><b>Nextjobz Automation Framework</b></sub>
  <br>
  <sub><i>"Empowering Digital Excellence through Strategic Quality Innovation"</i></sub>
  <br>
  <sub>Architected by <a href="https://github.com/Anik16298">Anik</a></sub>
</div>
