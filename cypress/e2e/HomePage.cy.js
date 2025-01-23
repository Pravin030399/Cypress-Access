// export {homepageUrl}
const homepageUrl = 'https://www.theaccessgroup.com/en-my/'

// Define in the same cy.file
// Cypress.Commands.add('visit_homepage' , () => {
//     cy.visit('https://www.theaccessgroup.com/en-my/');
//     cy.wait(5000);
// });

describe ('homepage test' ,() => {
    it('Visit homepage', () => {
        cy.Switch_responsive('desktop');
        cy.visit(homepageUrl)
        cy.url().should('include', 'theaccessgroup')
        cy.contains('Your trusted partner for business software').should('be.visible')
        cy.get('.main-banner__title').should('exist')
        cy.check_header();
        cy.check_footer();
        
    }) 
    
})