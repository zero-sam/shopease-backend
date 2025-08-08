Project Overview
ShopEase is a modern e-commerce platform backend built with the MERN stack, designed to empower small businesses and local sellers with a scalable, secure, and user-friendly online shopping experience. The backend is responsible for managing users, authentication, product listings, and will later handle orders and payments.

What Has Been Implemented So Far
1. User Model with Role Support
Created a comprehensive /models/User.js schema with support for three user roles: buyer, seller, and admin.

Included secure password hashing with bcrypt middleware.

Defined sub-schemas for addresses and bank details, with seller verification fields.

2. User Authentication
Built registration and login routes/controllers in /routes/auth.js and /controllers/authController.js.

Separate registration endpoints for buyers and sellers with role distinction.

Implemented JWT token generation, securing routes and enabling user authentication.

Added middleware for JWT authentication and role-based access control (/middleware/auth.js and /middleware/roleAuth.js).

3. Profile Endpoint
Created /api/auth/me endpoint to get currently logged-in user information securely.

4. Product Management
Defined /models/Product.js with fields including name, description, price, category, images, inventory, and seller reference.

Developed product routes in /routes/products.js with endpoints for:

Seller-only creation, update, and deletion of products.

Buyers and sellers can list and view products.

Controllers for product CRUD with proper ownership and role validation.

5. Backend Setup and Connection with MongoDB Atlas
Successfully configured a MongoDB Atlas cluster for cloud-hosted database access.

Used environment variables (.env) for secure connection URI and JWT secret management.

Implemented connection logic with Mongoose with the modern serverApi options.

Applied .gitignore rules to exclude node_modules and sensitive files from source control.

6. GitHub Repository and Version Control
Set up a GitHub repository with clean commits excluding unnecessary files.

Used GitHub Desktop for version control, pushing only essential backend files.

How to Run Locally
Clone the GitHub repository to your local machine.

Run npm install in the backend directory to install dependencies.

Create a .env file with the following variables (sample):

text
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Start the backend server with:

text
npm run dev
Use Postman or any API client to test the endpoints:

Register/login users.

Create/list products.

Test protected routes with JWT tokens.


ScreenShots:

<img width="875" height="884" alt="image" src="https://github.com/user-attachments/assets/579d1941-4ab0-46f1-817e-9ab61f938847" />
