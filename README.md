## 1. Scripts
- Install dependencies: ```npm i```
- Start server: ```npm start```
- Build: ```npm run build```
- Test: ```npm run test```

## 2. Set up Database
### Create Databases
- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user 
    - `CREATE USER udacity_thuyct WITH PASSWORD '123456';`
- In psql run the following to create the database
    - `CREATE DATABASE udacity_project_2;`
### Migrate Database
Navigate to the root directory and run the command below to migrate the database:
``db-migrate up`` 

## 3. Enviromental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=udacity_project_2
POSTGRES_USER=udacity_thuyct
POSTGRES_PASSWORD=123456
TOKEN_SECRET=udacity_project_2

BCRYPT_PASSWORD=abcdefghiklmnopq
SALT_ROUNDS=10
```
## 4. Running Ports 
After start up, the server will start on port `3000` and the database on port `5432`

## 5. Endpoint Access
All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.
