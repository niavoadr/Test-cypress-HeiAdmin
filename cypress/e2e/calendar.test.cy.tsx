describe("Calendar view by student", () => {
  beforeEach("Connect as student", () => {
    cy.realCasdoorLogin(
      Cypress.env("REACT_APP_TEST_STUDENT1_EMAIL"),
      Cypress.env("REACT_APP_TEST_STUDENT1_PASSWORD")
    );
    cy.get(`a[href='${Cypress.env("CALENDAR_URL")}']`).invoke("removeAttr", "target").click();
  });

  it("url should contains /calendar", () => {
    cy.url().should("contain", "/calendar");
  });

  it("should contains the actual month in the title", () => {
    cy.contains(
      new Date().toLocaleString("en-US", { month: "long" })
    ).should("exist");
  });

  it("should show all buttons", () => {
    cy.contains("Aujourd'hui").should("exist");
    cy.contains("Précédent").should("exist");
    cy.contains("Suivant").should("exist");
    cy.contains("Mois").should("exist");
    cy.contains("Semaine").should("exist");
    cy.contains("Jour").should("exist");
  });
});
