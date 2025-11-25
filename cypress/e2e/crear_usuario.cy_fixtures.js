describe("Crear Usuario con Fixtures", () => {
    it("Debería crear un nuevo usuario exitosamente usando fixtures", () => {
        cy.fixture('crearUsuario').then((mock) => {
            cy.intercept('POST', 
                'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users')
                .as('createUser');
            cy.intercept('GET', 
                'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*')
                .as('getUsers');
            
            cy.visit('http://localhost:5174/');
            cy.get('input').eq(0).should("exist");
            cy.get('input').eq(1).should("exist");
            cy.get('input').eq(0).type(mock.name);
            cy.get('input').eq(1).type(mock.email);
            cy.contains('Crear Usuario').click();
            cy.get('button[type="submit"]').click();
            
            cy.wait('@createUser')
            .its('request.body')
            .should('eq1', {   
                name: mock.name,
                email: mock.email
            });
        });
    });
});