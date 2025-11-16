"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 2,
    reporter: 'html',
    timeout: 60 * 1000,
    expect: { timeout: 30 * 1000 },
    webServer: {
        command: 'node scripts/start-dev-and-check.mjs',
        url: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        stdout: 'pipe',
        stderr: 'pipe',
        timeout: 120 * 1000,
    },
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
        trace: 'on-first-retry',
        navigationTimeout: 30 * 1000,
    },
    projects: [
        {
            name: 'chromium',
            use: __assign({}, test_1.devices['Desktop Chrome']),
        },
        {
            name: 'firefox',
            use: __assign({}, test_1.devices['Desktop Firefox']),
        },
        {
            name: 'webkit',
            use: __assign({}, test_1.devices['Desktop Safari']),
        },
        {
            name: 'Mobile Chrome',
            use: __assign({}, test_1.devices['Pixel 5']),
        },
        {
            name: 'Mobile Safari',
            use: __assign({}, test_1.devices['iPhone 14 Pro']),
        },
    ],
});
