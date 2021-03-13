'use srict'
require('@code-fellows/supergoose')
const supertest = require('supertest')
const server = require('../src/server.js')
const base64= require('base-64')
// const express = require('express');
const request = supertest(server.server);




describe('testing server for signup', () =>{
  test('should create a user account', async () => {
    const response = await request.post('/signup').send({
      username: 'nassir',
      password: '4298'
    });
    expect(response.status).toEqual(201);
    expect(response.body.password).toBeDefined();
    expect(response.body.username).toEqual('nassir')
  });
});

describe('testing server for signup assertion requirement', () =>{
  it('should throw error for missing username', async () => {
    const response = await request.post('/signup').send({
      username: '',
      password: '4298'
    });
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('Need username');
  });
});

describe('testing server for signup assertion requirement', () =>{
  it ('should throw error for missing password', async () => {
    const response = await request.post('/signup').send({
      username: 'nassir',
      password: ''
    });
    expect(response.status).toEqual(500);
    expect(response.text).toEqual('Need password');
  });
});


xdescribe('testing server for signin', () =>{
  it('should sign in to a user account', async () => {

  //   let user = base64.encode('nassir:4298')
  //   const response = await request.post('/signin').set('authorization', `Basic ${user}`)

  //   expect(response.status).toEqual(200);
  //  expect(response.body.username).toEqual('nassir')
    
   await request.post('/signup').send({
      username: 'nassir',
      password: '42981'
    }).then(async (data) => {
        let encodedString = base64.encode(`${data.request._data.username}:${data.request._data.password}`)
        const response = await request.post('/signin').set(
          'Authorization', `Basic ${encodedString}`
         
        );
        expect(response.status).toEqual(200);
        expect(response.body.password).toBeDefined();
        expect(response.body.username).toEqual('nassir')
    });
  });
});

xdescribe('testing middleware and requirement assertion', () =>{
  it ('Middleware basic Authentication ', async () => {

    const response = await request.post('/signin').set(
      'authorization', 
    );
    expect(response.status).toEqual(500);
    expect(response.text.includes('invalid')).toBeTruthy();
  });
});

