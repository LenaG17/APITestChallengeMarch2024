import { data } from 'cypress/types/jquery';
let productData;
describe('Product API Tests', () => {
  const productId = 1;
  const limitV = 10;
  const category = 'smartphones';
  let receivedId;

  it('GET - all products', () => {
    cy.request('https://dummyjson.com/products').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.products).to.not.be.null;
      console.log(response.body.products);
    });
  });
  it('GET - single product', () => {
    cy.request(`https://dummyjson.com/products/${productId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.products).to.not.be.null;
      console.log(response.body.products);
    });
  });
  it('should retrieve products related to the search query "phone"', () => {
    cy.request('https://dummyjson.com/products/search?q=phone').then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body.products);
      const firstProduct = response.body.products[0];
      expect(firstProduct).to.have.all.keys('id', 'title', 'description', 'price', 'discountPercentage', 'rating', 'stock', 'brand', 'category', 'thumbnail', 'images');
      expect(firstProduct.brand).to.eq('Apple');
    });
  });
  it('should retrieve products with "limit" and "skip" params', () => {
    cy.request(`https://dummyjson.com/products?limit=${limitV}&skip=10&select=title,price`).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body.products);
      const firstProduct = response.body.products[0];
      expect(firstProduct.id).to.eq(limitV + 1);
    });
  });
  it('Get all products categories', () => {
    cy.request('https://dummyjson.com/products/categories').then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body);
    });
  });

  it('Get products of a category', () => {
    cy.request(`https://dummyjson.com/products/category/${category}`).then((response) => {
      expect(response.status).to.eq(200);
      console.log(response.body.products);
    });
  });

  it('POST - add new product', () => {
    cy.addNewProduct(productData);
  });

  it('PUT - update a product', () => {
    cy.updateProductById(productId);
  });
  it('DELETE - product', () => {
    cy.deleteProductById(productId);
  });
});
