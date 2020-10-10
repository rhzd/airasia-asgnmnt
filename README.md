# Intro

This repository contains an example API for AirAsia recruitment assignment.

## Preparation

- Clone this repository
- Make sure got yarn or npm installed (yarn is recommended)
- Run 'yarn' or 'npm install'
- Rename '.env.template' to '.env'

## How to use

- Create user
- Get user token
- Create hotel
- Create room for hotel (need hotel ID, can get from GET hotel API)
- Create order (need hotel and room ID, can get from GET hotel and room API)
- Check payment status
- Make payment is status is 'Open'

## API documentation

- Open openapi.yml file
- Copy and paste content to https://editor.swagger.io/
- Profit!

## Unit testing

- Run 'yarn test' or 'npm test'