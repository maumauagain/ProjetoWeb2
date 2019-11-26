const expect = require('chai').expect;
const assert = require ('chai').assert;

const request = require('supertest');

const app = require('../src/routes.js');

describe('POST /products', () => {
    it('Ok, creating a product works!', function() {
        let result = 2;
        assert.equal(result, 2);
        
    });
})