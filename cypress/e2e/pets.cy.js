describe("Зоомагазин. Животные", () => {
  it('Добавление и удаление животного', () => {
    const petId = Math.round(Math.random() * 1000000);

    // добавление животного
    cy.request("POST", "https://petstore.swagger.io/v2/pet", {
      "id": petId,
      "name": "Собака",
      "photoUrls": []
    }).then((response) => {
      expect(response.status).eql(200);
      expect(response.body).be.eql(
        {
        "id": petId,
        "name": "Собака",
        "photoUrls": [],
        "tags": []
      });

      // проверка ответа
      cy.request(`https://petstore.swagger.io/v2/pet/${response.body.id}`)
      .then((response) => {
        expect(response.status).eql(200);
        expect(response.body).be.eql(
          {
          "id": petId,
          "name": "Собака",
          "photoUrls": [],
          "tags": []
          });
      });

      // удаление животного
      cy.request({
        "method": "DELETE",
        "url": `https://petstore.swagger.io/v2/pet/${response.body.id}`,
      })
      .then((response) => {
        expect(response.status).be.eql(200);
        cy.request({
          "method":"DELETE", 
          "url": `https://petstore.swagger.io/v2/pet/${petId}`,
        failOnStatusCode: false
      })
        .then((response) => {
          expect(response.status).be.eql(404);
        });
      });
    });
  });
});