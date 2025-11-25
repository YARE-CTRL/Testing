describe("crud de usuarios",()=>{
    let mockData;

    before(() => {
        cy.fixture('crudUsuario').then((data) => {
            mockData = data;
        });
    });

    it("crear usuarios",()=>{
        cy.visit("http://localhost:5174/")

        mockData.forEach((usuario, index) => {
            cy.intercept('POST',
                'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users',
                {
                    statusCode: 201,
                    body: usuario               
                }
            ).as(`createUser${index}`);

            cy.get('input').eq(0).clear().type(usuario.name);
            cy.get('input').eq(1).clear().type(usuario.email);
            cy.get('button[type="submit"]').click();

            cy.wait(`@createUser${index}`).then((interception) => {
                expect(interception.request.body).to.deep.equal(usuario);
                expect(interception.response.statusCode).to.equal(201);
            });
            cy.wait("@listar");
        });
    })



    it("listar usuarios",()=>{
        cy.fixture('curdUsuario.json').then((mocklist) => { 
            cy.intercept('GET',
                 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*',{

                     status:200,
                     body: mocklist
                 }
            ).as('listar'); 
            cy.visit("http://localhost:5174")
            mocklist.forEach((usuario) =>  {
                cy.contains(usuario.name).should("exist");
                cy.contains(usuario.email).should("exist");
            });
            })

    })

});