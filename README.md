# express-nodejs-basics


### User Authentication
- Users Model & Schema
- Post/Register a new user rest api
- Hashing the user  password before storing it in the database 
- Get user and list of users excluding password
- Update user data with/without password
- Protecting the api - authentication jwt for example only admin will be able to create and delete products 
- Login a user rest api and creating a token 
- Authentication error handling
- Add more secret user information to token: diffenciate the information between user and admin
- Get user count rest api

### Resources and terms that i have followed

MVC pattern
Route groups
Service pattern
Repository pattern
User roles
Working with files
Rate limiting
Relational Databases
OAuth
Resources: https://dev.to/rhuzaifa/top-5-node-express-boilerplates-for-building-restful-api-s-1ehl


<!-- Commit Message -->
<!-- Adding roles for users to distinguish it from general users and admin -->


### Notes
schema should be inside models folder, router entry point should be inside routers folder, all the logic should in the files that are inside services folder. we can use helpers folder for some helper functions like error handling, authentication handling which could be replace by config folder for more meaningful folder name and business logic.
