describe("Real authentication test on HEI Admin", () => {

  it("Check access for user STUDENT", () => {
    cy.visit("/login");
    cy.get("[data-testid='casdoor-login-btn']").click();
    cy.origin("https://numer.casdoor.com", {args: {email: Cypress.env("REACT_APP_TEST_STUDENT1_EMAIL"),password: Cypress.env("REACT_APP_TEST_STUDENT1_PASSWORD")}}, ({ email, password }) => {
      cy.get("input[placeholder='identifiant, adresse e-mail ou téléphone']").type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();
    });

    cy.get("[data-testid='AccountCircleIcon']").click();
    cy.get("[data-testid='main-content']").should("exist");
    cy.get("body").should("contain", "STD249999")
      .and("contain", "Tokimahery")
      .and("contain", "RAMAROZALA")
      .and("contain", "test+ryan@hei.school")
    cy.get("[data-testid='LogoutIcon']").click();
  });


  it("Check access for user TEACHER", () => {

    cy.visit("/login");
    cy.get("[data-testid='casdoor-login-btn']").click();
    cy.origin("https://numer.casdoor.com", {args: {email: Cypress.env("REACT_APP_TEST_TEACHER1_EMAIL"),password: Cypress.env("REACT_APP_TEST_TEACHER1_PASSWORD")}}, ({ email, password }) => {
      cy.get("input[placeholder='identifiant, adresse e-mail ou téléphone']").type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();
    });

    cy.get("[data-testid='AccountCircleIcon']").click();
    cy.get("[data-testid='main-content']").should("exist");
    cy.get("body").should("contain", "TCR25001")
      .and("contain", "Mentor")
      .and("contain", "Pedagogique")
      .and("contain", "test+teacher1@hei.school")
    cy.get("[data-testid='LogoutIcon']").click();
  });


  it("Check access for user MANAGER", () => {

    cy.visit("/login");
    cy.get("[data-testid='casdoor-login-btn']").click();
    cy.origin("https://numer.casdoor.com", {args: {email: Cypress.env("REACT_APP_TEST_MANAGER1_EMAIL"),password: Cypress.env("REACT_APP_TEST_MANAGER1_PASSWORD")}}, ({ email, password }) => {
      cy.get("input[placeholder='identifiant, adresse e-mail ou téléphone']").type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();
    });

    cy.get("[data-testid='AccountCircleIcon']").click();
    cy.get("[data-testid='main-content']").should("exist");
    cy.get("body").should("contain", "MGR22001")
      .and("contain", "Michou")
      .and("contain", "Rakotoarizafy")
      .and("contain", "test+manager1@hei.school")
      .and("contain", "0347962009");
    cy.get("[data-testid='LogoutIcon']").click();
  });


  it("Check access for user ADMIN", () => {

    cy.visit("/login");
    cy.get("[data-testid='casdoor-login-btn']").click();
    cy.origin("https://numer.casdoor.com", {args: {email: Cypress.env("REACT_APP_TEST_ADMIN1_EMAIL"),password: Cypress.env("REACT_APP_TEST_ADMIN1_PASSWORD")}}, ({ email, password }) => {
      cy.get("input[placeholder='identifiant, adresse e-mail ou téléphone']").type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();
    });

    cy.get("[data-testid='AccountCircleIcon']").click();
    cy.get("[data-testid='main-content']").should("exist");
    cy.get("body").should("contain", "MGR21003")
      .and("contain", "Valisoa")
      .and("contain", "Ramilison")
      .and("contain", "test+admin@hei.school")
      .and("contain", "+261 38 51 039 03");
    cy.get("[data-testid='LogoutIcon']").click();
  });


  it("Check that if the credentials are false the user has not accessed", () => {

    cy.visit("/login");
    cy.get("[data-testid='casdoor-login-btn']").click();
    cy.origin("https://numer.casdoor.com", { args: { email: "koto@mail.hei.com", password: "wrongpassword" }}, ({ email, password }) => {
      cy.get("input[placeholder='identifiant, adresse e-mail ou téléphone']").type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();

      cy.wait(2000);
      cy.get("span")
        .contains("Échec de la connexion")
        .should("be.visible");
      });
  });
});
