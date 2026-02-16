import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
    credentials: {
        phone: process.env.PHONE || '01831422264',
        password: process.env.PASSWORD || '@Abc1234',
        displayName: process.env.DISPLAY_NAME || 'Nusrat Jahan',
        email: process.env.EMAIL || 'arunabhoanik@gmail.com',
        profileData: {
            company: 'Akij iBOS Limited',
            designation: 'Junior SQA Engineer',
            skill: 'Manual Testing'
        }
    },
    timeout: 30000,
    baseUrl: process.env.BASE_URL || 'https://nextjobz.com.bd/',
    selectors: {
        signInXPath: "//button[normalize-space()='Sign In']",
        phoneInputSelector: 'input[type="tel"]',
        passwordInputSelector: 'input[type="password"]'
    }
};

export default config;
