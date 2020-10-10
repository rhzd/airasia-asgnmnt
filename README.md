# Intro

This repository contains an example API for AirAsia recruitment assignment.

## For local access

- Clone this repository
- Make sure got yarn or npm installed (yarn is recommended)
- Make sure nodemon is installed
- Run 'yarn' or 'npm install'
- Run 'yarn dev' or 'npm run dev' 
- Consume API at localhost:3000/api

## For production can be directly accessed at https://airasia-asgnmnt.herokuapp.com/api

## API documentation

- Open openapi.yml file
- Copy and paste content to https://editor.swagger.io/

## How to use

- Create user
- Get user token
- Create hotel
- Create room for hotel (need hotel ID, can get from GET hotel API)
- Create order (need hotel and room ID, can get from GET hotel and room API)
- Check payment status
- Make payment is status is 'Open'

## Unit testing

- Run 'yarn test' or 'npm test'