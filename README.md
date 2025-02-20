# express-nodejs-basics


### User Authentication System
This is a simple authentication system that allows users to register, log in, and manage their profiles. It also includes role-based access, ensuring that only admins can perform certain actions, like adding or deleting products.

### Features
User registration
User login with JWT
Password hashing
Admin-only access to certain routes (e.g., adding products)
Profile management (view and update)
Get user count API


### Conclusion
This system allows for user registration and login using JWT tokens. Admin users can perform special actions, while regular users have access to basic functionality. The system is simple and secure for managing user authentication and role-based access.

<!-- ### Resources and terms that i have followed

MVC pattern
Route groups
Service pattern
Repository pattern
User roles
Working with files
Rate limiting
Relational Databases
OAuth
Resources: https://dev.to/rhuzaifa/top-5-node-express-boilerplates-for-building-restful-api-s-1ehl -->


<!-- Commit Message -->
<!-- Adding roles for users to distinguish it from general users and admin -->


<!-- ### Notes -->
<!-- schema should be inside models folder, router entry point should be inside routers folder, all the logic should in the files that are inside services folder. we can use helpers folder for some helper functions like error handling, authentication handling which could be replace by config folder for more meaningful folder name and business logic. -->
