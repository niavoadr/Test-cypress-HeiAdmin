const studentName = "Tokimahery";
const testFeeName = "fee-payement-health-test-G14";
const payementRef = "MP111111.2222.333339";

const createFeeAsManager = () => {
  cy.realCasdoorLogin(
    Cypress.env("REACT_APP_TEST_MANAGER1_EMAIL"),
    Cypress.env("REACT_APP_TEST_MANAGER1_PASSWORD")
  );
  cy.createTestFeeForStudent(studentName, testFeeName);
};

const deleteFeeAsManager = () => {
  cy.realCasdoorLogin(
    Cypress.env("REACT_APP_TEST_MANAGER1_EMAIL"),
    Cypress.env("REACT_APP_TEST_MANAGER1_PASSWORD")
  );
  cy.deleteTestFeeForStudent(studentName, testFeeName);
};

describe("Mobile payment by student", () => {
  before("Create the test fee", () => {
    cy.on("fail", (err) => {
      if (err.message.includes("Timed out retrying")) {
        cy.go("back");
        createFeeAsManager();
        return false;
      } else if (
        err.message.includes(
          "The command was expected to run against origin"
        ) &&
        err.message.includes("but the application is at origin")
      ) {
        cy.visit(Cypress.env("REACT_PREPROD_URL"));
        createFeeAsManager();
        return false;
      }
      throw err;
    });
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("Unknown user role")) {
        return false;
      }
    });

    createFeeAsManager();
  });

  beforeEach("Connect with student role", () => {
    cy.on("fail", (err) => {
      if (err.message.includes("Timed out retrying")) {
        cy.go("back");
        cy.realCasdoorLogin(
          Cypress.env("REACT_APP_TEST_STUDENT1_EMAIL"),
          Cypress.env("REACT_APP_TEST_STUDENT1_PASSWORD")
        );
        return false;
      } else if (
        err.message.includes(
          "The command was expected to run against origin"
        ) &&
        err.message.includes("but the application is at origin")
      ) {
        cy.visit(Cypress.env("REACT_PREPROD_URL"));
        cy.realCasdoorLogin(
          Cypress.env("REACT_APP_TEST_STUDENT1_EMAIL"),
          Cypress.env("REACT_APP_TEST_STUDENT1_PASSWORD")
        );
        return false;
      }
      throw err;
    });

    cy.realCasdoorLogin(
      Cypress.env("REACT_APP_TEST_STUDENT1_EMAIL"),
      Cypress.env("REACT_APP_TEST_STUDENT1_PASSWORD")
    );

    cy.getByTestid("AttachMoneyIcon").click();
  });

  it("Checks the icon button based on the existence of the mpbs in the fee", () => {
    cy.contains("td", testFeeName).should("exist");

    cy.contains("td", testFeeName)
      .parents("tr")
      .within(() => {
        cy.get("button").eq(0).should("exist");
        cy.get("button").eq(1).should("exist");
      });

    cy.getByTestid("LogoutIcon").click();
  });

  it("Can do mpbs", () => {
    cy.contains("td", testFeeName)
      .parents("tr")
      .within(() => {
        cy.get("button").eq(0).click();
      });

    cy.get("input#psp_id").type(payementRef);
    cy.get("button[aria-label=Enregistrer]").click();

    cy.contains("Frais créés avec succès");
    cy.get("[data-testid=PendingIcon]").should("exist");

    cy.getByTestid("LogoutIcon").click();
  });

  after("Delete fee after the test", () => {
    cy.on("fail", (err) => {
      if (err.message.includes("Timed out retrying")) {
        cy.go("back");
        deleteFeeAsManager();
        return false;
      } else if (
        err.message.includes(
          "The command was expected to run against origin"
        ) &&
        err.message.includes("but the application is at origin")
      ) {
        cy.visit(Cypress.env("REACT_PREPROD_URL") + "/login");
        deleteFeeAsManager();
        return false;
      }
      throw err;
    });

    deleteFeeAsManager();
  });
});
