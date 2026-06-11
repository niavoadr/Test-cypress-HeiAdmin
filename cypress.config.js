import { defineConfig } from "cypress";
import dotenv from "dotenv";
import { generateStudentRef } from "./cypress/support/tasks.js";

dotenv.config();

export default defineConfig({
  projectId: 'ytj8pw',
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        generateStudentRef
      });
      return config;
    },
    defaultCommandTimeout: 20000,
    supportFile: "cypress/support/e2e.ts",
    baseUrl: process.env.REACT_PREPROD_URL,
    experimentalOriginDependencies: true
  },
  env: {
    REACT_APP_TEST_STUDENT1_PASSWORD: process.env.REACT_APP_TEST_STUDENT1_PASSWORD,
    REACT_APP_TEST_STUDENT1_EMAIL: process.env.REACT_APP_TEST_STUDENT1_EMAIL,
    REACT_APP_TEST_TEACHER1_PASSWORD: process.env.REACT_APP_TEST_TEACHER1_PASSWORD,
    REACT_APP_TEST_TEACHER1_EMAIL: process.env.REACT_APP_TEST_TEACHER1_EMAIL,
    REACT_APP_TEST_MANAGER1_PASSWORD: process.env.REACT_APP_TEST_MANAGER1_PASSWORD,
    REACT_APP_TEST_MANAGER1_EMAIL: process.env.REACT_APP_TEST_MANAGER1_EMAIL,
    REACT_APP_TEST_MONITOR1_PASSWORD: process.env.REACT_APP_TEST_MONITOR1_PASSWORD,
    REACT_APP_TEST_ADMIN1_PASSWORD: process.env.REACT_APP_TEST_ADMIN1_PASSWORD,
    REACT_APP_TEST_ADMIN1_EMAIL: process.env.REACT_APP_TEST_ADMIN1_EMAIL,
    REACT_APP_TEST_STAFF1_PASSWORD: process.env.REACT_APP_TEST_STAFF1_PASSWORD,
    REACT_APP_TEST_ORGANIZER1_PASSWORD: process.env.REACT_APP_TEST_ORGANIZER1_PASSWORD,
    REACT_PREPROD_URL: process.env.REACT_PREPROD_URL,
    codeCoverage: {
      exclude: ["cypress/**/*.*", "src/**/*.cy", "src/providers/**/*.*"],
    },
    REACT_APP_CASDOOR_SDK_SERVER_URL: process.env.REACT_APP_CASDOOR_SDK_SERVER_URL,
    REACT_APP_TEST_MONITOR1_EMAIL: process.env.REACT_APP_TEST_MONITOR1_EMAIL,
    INSTATUS_WEBHOOK_URL: process.env.INSTATUS_WEBHOOK_URL,
    INSTATUS_API_KEY: process.env.INSTATUS_API_KEY,
    CALENDAR_URL: process.env.CALENDAR_URL
  },
});
