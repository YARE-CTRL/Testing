describe("crud de usuarios", () => {

    it("crear usuarios", () => {
        // Usar el fixture existente `curdUsuario.json`
        cy.fixture('curdUsuario.json').then((mockdat) => {
            // Simular estado de servidor en memoria para que GET devuelva lo creado
            const serverUsers = [];

            cy.intercept('GET', 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*', (req) => {
                req.reply({ statusCode: 200, body: serverUsers });
            }).as('listar');

            cy.intercept('POST', 'https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users', (req) => {
                // push the incoming body into our fake server state
                serverUsers.push(req.body);
                req.reply({ statusCode: 201, body: req.body });
            }).as('createUser');

            cy.visit('http://localhost:5173');

            // usar cy.wrap(...).each para mantener la cadena de comandos de Cypress
            cy.wrap(mockdat).each((user) => {
                cy.get("input[name='name']").clear().type(user.name);
                cy.get("input[name='email']").clear().type(user.email);
                cy.get("button[type='submit']").click();

                cy.wait('@createUser').then((int) => {
                    expect(int.request.body).to.deep.equal(user);
                    expect(int.response.statusCode).to.equal(201);
                });

                // la app emitirá 'user:created' y ListaUsuario hará un GET; el intercept de GET devuelve serverUsers
                cy.contains(user.name, { timeout: 5000 }).should('exist');
            });
        });
    });

    it("listar usuarios", () => {
        cy.fixture('CrudUsuariosListar.json').then((mock) => {

            cy.intercept(
                "GET",
                "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*",
                {
                    statusCode: 200,
                    body: mock,
                }
            ).as("listar");

            cy.visit("http://localhost:5173");

            cy.wait("@listar");

            cy.wrap(mock).each((usuario) => {
                cy.contains(usuario.name).should("exist");
                if (usuario.email) cy.contains(usuario.email).should("exist");
            });

        });
    });
     it("eliminar usuarios", () => {
        cy.fixture('CrudUsuariosListar.json').then((mock) => {
            cy.fixture("CrudUsuariosEliminar.json").then((mockEliminar)=>{
                cy.intercept(
                    "GET",
                    "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*",
                    {
                        statusCode: 200,
                        body: mock,
                    }
                ).as("listar");

                cy.intercept(
                    "DELETE",
                    "https://skojryaxbquqtwvuyhfv.supabase.co/rest/v1/users*",
                    {
                        statusCode: 204,
                        body: {},
                    }
                ).as("eliminar");

                cy.visit("http://localhost:5173");
                cy.wait("@listar");

                // seleccionar la fila y hacer click en el botón de eliminar de forma robusta
                cy.contains(mock[0].name).closest('tr').find('button').click();
                cy.wait("@eliminar");
            
             
            });

        });
    });

});