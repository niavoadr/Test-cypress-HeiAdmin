/// <reference types="cypress" />

Cypress.Commands.add("getByTestid", <Subject = any>(id: string) => {
  return cy.get<Subject>(`[data-testid='${id}']`);
});

Cypress.Commands.add("realCasdoorLogin", (email: string, password: string) => {
  cy.visit("/login");
  cy.getByTestid("casdoor-login-btn").click();
  cy.origin(
    Cypress.env("REACT_APP_CASDOOR_SDK_SERVER_URL"),
    { args: { email, password } },
    ({ email, password }) => {
      cy.get(
        "input[placeholder='identifiant, adresse e-mail ou téléphone']"
      ).type(email);
      cy.get("input[placeholder='Mot de passe']").type(password);
      cy.get("button[type='submit']").click();
    }
  );
});

Cypress.Commands.add(
  "createTestFeeForStudent",
  (name: string, testFeeName: string) => {
    cy.getByTestid("SchoolIcon").click();
    cy.getByTestid("PeopleIcon").click();
    cy.getByTestid("main-search-filter").type(name);
    cy.contains("td", name).click();
    cy.getByTestid("fees-tab").click();
    cy.getByTestid("MoreVertIcon").click();
    cy.getByTestid("create-button").click();
    cy.get("div#predefinedType").click();
    cy.contains(testFeeName).click();
    cy.get("button[aria-label=Enregistrer]").click();
    cy.getByTestid("LogoutIcon").click();
  }
);

Cypress.Commands.add(
  "deleteTestFeeForStudent",
  (name: string, testFeeName: string) => {
    const deleteAll = (target: string, studentName: string) => {
      cy.on("fail", () => {
        return false;
      });

      cy.getByTestid("fees-tab").click();
      cy.reload();

      if (cy.contains("td", target).should("not.exist"))
        cy.contains("td", target).then(($cell) => {
          if ($cell.length > 0) {
            cy.get("table")
              .find("td")
              .filter(`:contains(${target})`)

              .each(($td) => {
                cy.getByTestid("fees-tab").click();
                cy.wrap($td)
                  .parents("tr")
                  .within(() => {
                    cy.getByTestid("DeleteIcon").click();
                  });
                cy.get("div[aria-labelledby=alert-dialog-title]").within(() => {
                  cy.getByTestid("DeleteIcon").click();
                });
              });

            deleteAll(target, studentName);
          }
        });
    };
    
    const target = "fee-payement-health-test-G14";

    cy.on("fail", () => {
      return false;
    });

    cy.getByTestid("SchoolIcon").click();
    cy.getByTestid("PeopleIcon").click();
    cy.getByTestid("main-search-filter").type(name);
    cy.contains("td", name).click();
    cy.getByTestid("fees-tab").click();

    cy.contains("td", testFeeName)
      .parents("tr")
      .within(() => {
        cy.get("button").eq(0).click();
      });
    cy.get("div[aria-labelledby=alert-dialog-title]").within(() => {
      cy.get("button").eq(1).click();
    });

    deleteAll(target, testFeeName);
  }
);
