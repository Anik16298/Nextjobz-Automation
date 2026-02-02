const config = {
    credentials: {
        phone: '01831422264',
        password: '@Abc1234'
    },
    timeout: 30000,
    baseUrl: 'https://nextjobz.com.bd/',
    selectors: {
        signInXPath: "//button[normalize-space()='Sign In']",
        phoneInputSelector: 'input[type="tel"]',
        passwordInputSelector: 'input[type="password"]'
    }
};

export default config;
