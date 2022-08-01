/// <reference types="cypress" />
import "./commands";
import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";

beforeEach(() => {
  cy.deleteAllRecommendations();
});

describe("create new recommendation", () => {

  it("Should create recommendation", () => {
    const recommendation = {
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=EqRt64kkNi4"
    };

    cy.visit(`${URL}`);
    cy.get("#name").type(recommendation.name);
    cy.get("#youtubeLink").type(recommendation.youtubeLink);
    
    cy.intercept("POST", "/recommendations").as("create");
    cy.get("#addRecommendation").click();
    cy.wait("@create");

    cy.get(".recommendation > div").should("contain", recommendation.name);
  });

});
describe("upvote recommendation", () => {

  it("Should upvote a recommendation", () => {
    cy.createRecommendation();
    //cy.intercept("POST", "/recommendations*").as("upvote");
    cy.get(".upvote").click();
    //cy.wait("@upvote");
    cy.get(".score").should("contain", "1");
  });
});

describe("downvote recommendation", () => {

  it("Should downvote a recommendation", () => {
    cy.createRecommendation();
    cy.get(".downvote").click();
    cy.get(".score").should("contain", "-1");
  });

  it("Should remove a recommendation", () => {
    cy.createRecommendation();
    cy.get(".downvote").click();
    cy.get(".downvote").click();
    cy.get(".downvote").click();
    cy.get(".downvote").click();
    cy.get(".downvote").click();
    cy.get(".downvote").click();
    cy.get("#noRecommendationsYet").should("contain", "No recommendations yet! Create your own");
  });
});

describe("top recommendatios", () => {

  it("should show top recommendation first", () => {
    //cy.intercept("POST", "http://localhost:5000/recommendatios/test", {});
    cy.request("POST", "http://localhost:5000/recommendations/test").then(res => {
			cy.visit(URL + "/top");
      cy.get(".score").should("contain", "3");
    });
  });

});