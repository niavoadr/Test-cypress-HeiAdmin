describe("test displaying announcement on HEI Admin", () => {

  it("Test on the display of announcements created by ADMIN on HEI Admin with the user STUDENT", () => {
    cy.visit("/login");
    cy.get("[data-testid='casdoor-login-btn']").click();
    cy.origin("https://numer.casdoor.com", {args: {email: Cypress.env("REACT_APP_TEST_STUDENT1_EMAIL"),password: Cypress.env("REACT_APP_TEST_STUDENT1_PASSWORD")}}, ({ email, password }) => {
      cy.get("input[placeholder='identifiant, adresse e-mail ou téléphone']").type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();
    });


    cy.get("[data-testid='NewspaperIcon']").click();
    cy.contains('h6', 'Candidature président BDE')
      .should('exist')
      .click()
    cy.get('.toastui-editor-contents')
      .should('exist')
      .invoke('text')
      .should('not.be.empty');
  });
})
