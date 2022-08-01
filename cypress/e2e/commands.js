import { faker } from "@faker-js/faker";

const URL = "http://localhost:5000";
Cypress.Commands.add("deleteAllRecommendations", () => {
  cy.request("DELETE", URL + "/recommendations", {}).then(res => {
			cy.log(res);
    });
});

Cypress.Commands.add("createRecommendation", () => {
  const recommendation = {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=EqRt64kkNi4"
  };
  // cy.request("POST", URL + "/recommendations", recommendation).then(res => {
  //   cy.log(res);
  // });
  cy.visit("http://localhost:3000");
  cy.get("#name").type(recommendation.name);
  cy.get("#youtubeLink").type(recommendation.youtubeLink);
  
  cy.intercept("POST", "/recommendations").as("create");
  cy.get("#addRecommendation").click();
  cy.wait("@create");
});