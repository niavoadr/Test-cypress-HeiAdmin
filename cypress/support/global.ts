declare global {
  namespace Cypress {
    interface Chainable {
      getByTestid<Subject>(testid: string): Chainable<Subject>;
      realCasdoorLogin(email: string, password: string): void;
      createTestFeeForStudent(name: string, testFeeName: string): void;
      deleteTestFeeForStudent(name: string, testFeeName: string): void;
    }
  }
}

export {};
