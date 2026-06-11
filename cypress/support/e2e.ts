import "./global.ts";    
import "./commands.ts";

Cypress.on("uncaught:exception", () => {
  return false;
});
