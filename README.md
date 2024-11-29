# Image Gallery API with Role-Based Access Control

A robust Node.js backend API for managing image uploads By Washim with role-based authentication and Azure Blob storage integration.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Moderator, User)
  - Secure password hashing with bcrypt

- **Image Management** 
  - Upload images to Azure Blob Storage
  - Public/Private visibility toggle
  - Gallery view with user attribution
  - Secure deletion with proper authorization

- **User Management**
  - User registration and login
  - Role-based route protection
  - Page access control based on user roles

## 🛠️ Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- Azure Blob Storage
- JWT Authentication
- Multer for file handling

## 🔧 Environment Variables

Create a `.env` file in the project root with the following:

```env
PORT=6000
MONGO=mongodb_connection_string
JWT=your_jwt_secret
AZURE_STORAGE_CONNECTION_STRING=azure_connection_string
AZURE_CONTAINER_NAME=container_name
```


## 📂 Project Structure

```plaintext
backend/
├── src/
│   ├── config/
│   │   ├── DBConnection.js          # Database connection logic
│   │   └── AzureConnection.js       # Azure Blob Storage configuration
│   ├── controller/
│   │   ├── AuthController.js        # Handles authentication-related logic
│   │   └── ImageController.js       # Manages image uploads, deletion, visibility
│   ├── middleware/
│   │   ├── AuthMiddleware.js        # Verifies JWTs
│   │   ├── RoleBasedMiddleware.js   # Restricts access by roles
│   │   └── PageAccessMiddleware.js  # Ensures access to user-specific pages
│   ├── models/
│   │   ├── UserModel.js             # User schema
│   │   └── ImageModel.js            # Image schema
│   ├── routes/
│   │   ├── AuthRoutes.js            # Routes for user authentication
│   │   ├── ImageUploadRoutes.js     # Routes for image management
│   │   └── GalleryRoute.js          # Routes for gallery and visibility
│   └── app.js                       # Main application entry point
└── .env                             # Environment variables
```

## 🚦 API Endpoints

### 🔐 **Authentication**
- **POST** `/api/auth/register`  
  Register a new user.  

- **POST** `/api/auth/login`  
  Login as a user.  

### 🖼️ **Image Management**
- **POST** `/api/images/upload`  
  Upload an image.  

- **GET** `/api/images/user/:name`  
  Retrieve all images uploaded by a specific user.  

- **PUT** `/api/images/:name/:imageid/visibility`  
  Toggle image visibility between Public and Private.  

- **DELETE** `/api/images/:name/:imageid`  
  Delete an image by its ID, ensuring proper authorization.  

### 🔒 **Access Control**
- **GET** `/user/page/:name`  
  Access specific user pages.  

- **GET** `/api/data/admin`  
  Admin-only route for managing system-wide content.  

- **GET** `/api/data/moderator`  
  Moderator-only route for managing image visibility and moderation tasks.  

- **GET** `/api/data/user`  
  General user route for accessing personal content.  


## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository
Clone the repository to your local machine using Git:

```bash
git clone https://github.com/yourusername/image-gallery-api.git
```
### 2️⃣ Install Dependencies
Navigate to the project directory and install the required dependencies:
```bash
npm install

```

### 3️⃣ Set Up Environment Variables
Create a .env file in the project root ( Look up 👀  ⬆️ )

### 4️⃣ Start the Server
Run the following command to start the server:
```bash
npm start
```
The server will run on http://localhost:6000 by default, or on the port specified in your .env file.

## 🤝 Technology Learned

I learned the following libraries while working on the project:

- [Node.js](https://nodejs.org) - JavaScript runtime for building scalable network applications.
- [Express](https://expressjs.com) - Web framework for Node.js.
- [MongoDB](https://www.mongodb.com) - NoSQL database for managing application data.
- [Azure Blob Storage](https://azure.microsoft.com/en-us/services/storage/blobs/) - Cloud storage solution for image management.
- [Multer](https://github.com/expressjs/multer) - Middleware for handling `multipart/form-data`, primarily used for file uploads.






