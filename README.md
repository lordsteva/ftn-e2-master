# SEP - Team 21
## Tools needed
- Node.js & npm
- Docker & docker-compose
## How to run?

- run `npm i lerna yarn hasura-cli -g`
- run `lerna bootstrap` anywhere inside the project
- go to ***./apps/paypal-provider*** and run `yarn start`
- go to ***./apps/psp*** run `docker-compose up` (if you have an M1 chip add `-f docker-compose-M1.yaml` flag)
- go to ***./apps/psp*** run `yarn start` 
- after containers are up, go to ***./apps/psp/hasura*** and run:
    - `hasura migrate apply --admin-secret admin-secret --all-databases`
    - `hasura metadata apply --admin-secret admin-secret`
    - `hasura console --admin-secret=admin-secret --api-port 6789 --console-port 6798` (run if you need Hasura conosle, use any 2 free ports)
- go to ***./apps/web-shop-back/actions*** and run `yarn start`
- go to ***./apps/web-shop-front*** and run `yarn start`
- go to ***./apps/web-shop-back*** and run `docker-compose up` (if you have an M1 chip add `-f docker-compose-M1.yaml` flag) 
- after containers are up, go to ***./apps/web-shop-back/hasura*** and run:
    - `hasura migrate apply --admin-secret admin-secret --all-databases`
    - `hasura metadata apply --admin-secret admin-secret`
    - `hasura console --admin-secret=admin-secret --api-port 3333 --console-port 3334` (run if you need Hasura console, use any 2 free ports)
    ---
  PSP is available at http://locahlost:3000, webshop is at http://localhost:3001

  ### Authors
- Jelena Budiša E2 47-2021
- Stevan Rašković E2 54-2021
- Stefan Jokić E2 57-2021
 