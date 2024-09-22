describe("Тестирование логина", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("Пустое поле логина", () => {
    cy.contains("Log in").click();
    cy.login(null, "test");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Пустое поле пароля", () => {
    cy.contains("Log in").click();
    cy.login("test@test.com", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });

  it("Успешный вход в ЛК", () => {
    cy.contains("Log in").click();
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать").should("be.visible", true);
  });

  describe("Тестирование добавления в избранное", () => {
    beforeEach(() => {
      cy.visit("localhost:3000");
      cy.contains("Log in").click();
      cy.login("test@test.com", "test");
    });

    it("Добавление любимой книги", () => {
      cy.addBook(
        "Что такое тестирование. Курс молодого бойца",
        "Книга для новичков",
        "Ольга Назина"
      );
      cy.contains("Ольга Назина").should("be.visible");
    });

    it("Добавление книги в любимое из списка", () => {
      cy.addBookWithFavourite(
        "Что такое тестирование. Курс молодого бойца",
        "Книга для новичков",
        "Ольга Назина"
      );
      cy.get("h4").click();
      cy.contains("Что такое тестирование. Курс молодого бойца").should(
        "be.visible"
      );
    });

    it("Удаление книги из любимых", () => {
      cy.addBookWithFavourite(
        "Что такое тестирование. Курс молодого бойца",
        "Книга для новичков",
        "Ольга Назина"
      );
      cy.get("h4").click();
      cy.deleteBookFromFavourite("Что такое тестирование. Курс молодого бойца");
      cy.contains("Что такое тестирование. Курс молодого бойца").should(
        "not.exist"
      );
    });
  });
});
