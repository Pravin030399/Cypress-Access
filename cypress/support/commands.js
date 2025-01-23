// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const homepageUrl = 'https://www.theaccessgroup.com/en-my/';

const socialLinks = {
    twitter: 'https://x.com/theaccessgroup',
    linkedin: 'https://www.linkedin.com/company/accessgroup',
    facebook: 'https://www.facebook.com/TheAccessGroup/',
    youtube: 'https://www.youtube.com/user/theaccessgrouptv',
  };

const footerLinks = {
    PrivacyLegal: '/en-my/privacy-and-legal/',
    TermOfUse: '/en-my/privacy-and-legal/website-terms-of-use/',
    TermsCondition: 'https://pages.theaccessgroup.com/Access-Terms-and-Conditions.html',
    ContactUs: '/en-my/form/contact-us/',
    ComapnyNews: '/en-my/about/our-management-team/',
    OurManagementTeam: '/en-my/about/our-management-team/',
    Blog: '/en-my/blog/',
    OurLocation: '/en-my/about/our-offices/',
}

Cypress.Commands.add('check_header' , () => {

    cy.get('#onetrust-banner-sdk').should('be.visible');
    cy.get('#onetrust-accept-btn-handler').should('be.visible').click();
    cy.get('a.logo.hidden.flex--lg').should('have.attr', 'href', '/en-my/');
    cy.get('a[aria-label="Logo link"]').should('exist');
    cy.get('ul.main-nav__top') 
        .find('.js-navItemTrigger.nav-item__trigger.nav-item-selector') 
        .contains(' Products ') 
        .should('exist');
    cy.contains('a', 'Access Workspace').should('be.visible');
    cy.get('button').contains('Services').should('exist');
    cy.get('[data-gtm_cta_text="Partners"]').should('be.visible');
    cy.get('.nav-item-selector').contains('About').should('be.visible');
    cy.get('[data-gtm_cta_text="Careers"]').should('be.visible');
    cy.get('.nav-item-selector').contains('Support').should('exist');

})

Cypress.Commands.add ('check_footer', ()=> {
    cy.get('.footer').should('be.visible').scrollIntoView();
    cy.get('button').contains('Company Statements').should('exist')
    cy.get('button').contains('About Access').should('exist')
    cy.get('button').contains('Contact').should('exist')
    cy.xpath('//div[contains(@class, "footer__section footer__section--contact")]').should('be.visible')
    cy.get('[data-click_text="x-twitter"]').should('be.visible')
    cy.get('[data-click_text="linkedin"]').should('be.visible')
    cy.get('[data-click_text="facebook"]').should('be.visible')
    cy.get('[data-click_text="youtube"]').should('be.visible')
    cy.Check_social_link('twitter', '[data-click_text="x-twitter"]');
    cy.Check_social_link('linkedin', '[data-click_text="linkedin"]');
    cy.Check_social_link('facebook', '[data-click_text="facebook"]');
    cy.Check_social_link('youtube', '[data-click_text="youtube"]');
    cy.Check_redirection_link('PrivacyLegal', '[data-gtm_cta_text="Privacy and Legal"]');
    cy.Check_redirection_link('TermOfUse', '[data-gtm_cta_text="Website Terms of Use"]');
    
})

Cypress.Commands.add("Check_social_link", (social,selector) => {
    const expectedUrl = socialLinks[social];
    cy.get(selector)
      .should('have.attr', 'href')
      .and('eq', expectedUrl);
})

Cypress.Commands.add("Check_redirection_link", (redirection,selector) => {
    const expectedUrl = footerLinks[redirection];
    cy.get(selector)
      .should('have.attr', 'href')
      .and('eq', expectedUrl);
})


Cypress.Commands.add("Switch_responsive", (device) => {
    if (device === 'mobile') {
        cy.viewport(375, 667); 
    } else if (device === 'desktop') {
        cy.viewport(1280, 720); 
    } else {
        throw new Error('Invalid device type. Use "mobile" or "desktop".');
    }
})