# GraphQL Server
## How to start the server (after cloning app)

# Clone the repository
git clone https://github.com/yourusername/yourproject.git

# Create Database
1. psql -U postgres
2. CREATE DATABASE my_new_database;
3. CREATE USER my_new_user WITH PASSWORD 'my_password';
4. GRANT ALL PRIVILEGES ON DATABASE my_new_database TO my_new_user;
5. \q

# Configure Sequelize
1. cd /graphql_server
2. run ```npm install ```
3. Open config.js in any IDE you prefer
4. Replace the database credentials with the one you just created
5. run ```npx sequelize-cli db:migrate```
6. run ```npx sequelize-cli db:seed:all```

# Create ENV file
create a .env file in your root folder
add ```TOKEN_KEY=anythingyouwanttoaddasyourjwtsecrettoken```

# Start Server
run ```npm start```