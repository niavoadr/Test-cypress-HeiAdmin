
 import { faker } from '@faker-js/faker';

 describe("Importation d'étudiants", () => {
    it("Redirige vers Casdoor, se connecte avec un compte manager et arrive sur le dashboard", () => {
        const gender = faker.person.sexType();
        const firstName = faker.person.firstName(gender);
        const lastName = faker.person.lastName();
        const prefixes = ["034", "038", "033", "032", "037"];
        const prefix = faker.helpers.arrayElement(prefixes);
        const number = prefix + faker.string.numeric(7);
        const latitude = faker.location.latitude({ min: -25.6, max: -11.5 });
        const longitude = faker.location.longitude({ min: 43.2, max: 50.5 });
        const nic = faker.string.numeric(12)
        const birthPlace = faker.location.city();
        const birthDate = faker.date.between({
            from: new Date('1990-01-01'),
            to: new Date('2010-12-31')
        });
        const formattedBirthDate = birthDate.toISOString().split('T')[0];
        const address = faker.location.streetAddress() + ', ' + faker.location.city();
        const email = `${firstName}.${lastName}@gmail.com`;
        const entranceDate = faker.date.between({
            from: new Date('2021-01-01'),
            to: new Date('2024-12-31')
        });
        const formattedEntranceDate = entranceDate.toISOString().split('T')[0];
        const highSchoolOrigin =  faker.company.name()


        cy.visit("/login");

        cy.get('[data-testid="casdoor-login-btn"]').click();

        cy.origin(Cypress.env("REACT_APP_CASDOOR_SDK_SERVER_URL"), () => {
            cy.get(
                'input[placeholder="identifiant, adresse e-mail ou téléphone"]'
            ).type(Cypress.env("REACT_APP_TEST_MANAGER1_EMAIL"));
            cy.get('input[placeholder="Mot de passe"]').type(
                Cypress.env("REACT_APP_TEST_MANAGER1_PASSWORD")
            );
            cy.get('button[type="submit"]').click();
        });
        cy.get('svg[data-testid="SchoolIcon"]').click();
        cy.get('svg[data-testid="PeopleIcon"]').click();
        cy.get('svg[data-testid="AddIcon"]').click();
        cy.task("generateStudentRef").then((ref) => {
            const studentRef = ref as string;
            cy.log(`ID généré : ${studentRef}`);
            cy.get('input[id="ref"]').type(studentRef);
        });
        cy.get('input[id="first_name"]').type(firstName);
        cy.get('input[id="last_name"]').type(lastName);
        if (gender === 'female') {
            cy.get('input[id="sex_F"]').check({ force: true });
        } else {
            cy.get('input[id="sex_M"]').check({ force: true });
        }
        cy.get('input[id="phone"]').type(number);
        cy.get('input[id="coordinates.latitude"]').type(latitude.toString());
        cy.get('input[id="coordinates.longitude"]').type(longitude.toString());
        cy.get('input[id="nic"]').type(nic);
        cy.get('input[id="birth_place"]').type(birthPlace);
        cy.get('input[id="birth_date"]').type(formattedBirthDate);
        cy.get('textarea[id="address"]').type(address);
        cy.get('input[id="email"]').type(email);
        cy.get('input[id="entrance_datetime"]').type(formattedEntranceDate);
        cy.get('input[id="high_school_origin"]').type(highSchoolOrigin);
        cy.get('button[type="submit"]').click();
        cy.get('svg[data-testid="PeopleIcon"]').click();


    });
});
