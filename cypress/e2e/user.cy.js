// import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker";

const user = {
  id: faker.number.int(100000),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  phone: faker.phone.number(),
  userStatus: 0
};
const urlUserName = `/user/${user.username}`;

describe('API tests petstore.swager.io/user', () => {
  it('Test: Create user', () => {
    cy.createUser(user)
      .then(response => {
        expect(response.status).eql(200);
        expect(response.body.message).eql(String(user.id));
      })
  });

  it('Test: Updated user object', () => {
    cy.createUser(user)
      .then(() => {
        cy.request({
          method: 'PUT',
          url: urlUserName,
          body: { "username": "New User" }
        }).then(response => {
          expect(response.status).eql(200);
        })
      })
  });

  it('Test: Delete user', () => {
    cy.createUser(user);
    cy.request({
      method: 'DELETE',
      url: urlUserName,
    })
      .then(response => {
        expect(response.status).be.eql(200);
      })
  });

  it('Test:  Get user by user name', () => {
    cy.createUser(user)
    cy.request({
      method: 'GET',
      url: urlUserName
    })
      .then(response => {
        expect(response.status).eql(200);
        expect(response.body).eql(user)
      })
  });
})
