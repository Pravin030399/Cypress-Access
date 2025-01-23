// export {homepageUrl}
const homepageUrl = 'https://www.theaccessgroup.com/en-my/'


describe('Login Page', () => {
     it ('Login Page Test', () => {
        cy.Switch_responsive('desktop');
        cy.visit(homepageUrl);
        cy.get('#onetrust-banner-sdk').should('be.visible');
        cy.get('#onetrust-accept-btn-handler').should('be.visible').click();
        cy.get('[data-gtm_cta_text="Login"]').should('exist').eq(0).click();
        cy.origin('https://identity.access-workspace.com.au', () => {
            cy.wait(3000);
            cy.get('#Email').type('irpravin@gmail.com');
            cy.get('#Next').should('be.visible').and('not.be.disabled').click();
            cy.get('#Password').type('');
            cy.get('#SignIn').should('be.visible').click();
            cy.wait(3000);
        });
     })
})