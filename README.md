
🏡 EstateHub

EstateHub is a full-stack MERN (MongoDB, Express, React, Node.js) real estate platform.
It allows users to browse, search, sell, rent, and manage property listings with a modern UI and real-time updates.

✨ Features

🔐 User Authentication – Sign up, log in, and sign in with Google

🏠 Property Management – Add, edit, and delete property listings

💬 Messaging System – Users can send messages to landlords

🔎 Search & Filters – Find properties by budget and filters

📚 Extra Services – User Guide, Community, Contact Agents, and Tutorials

🖼️ Profile & Media – Upload/remove profile picture with progress, property image uploads

🛠️ Tech Stack – Redux Toolkit for state management, Tailwind CSS for responsive UI, Node.js + Express backend, MongoDB Atlas database

🛠️ Tech Stack

Frontend: React.js, Redux Toolkit, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB Atlas

🚀 Getting Started
1. Clone this  repository : git clone https://github.com/ashish02003/EstateHub
                            cd EstateHub
2. Install dependencies
   In both frontend and backend folders:

   npm install

3. Setup environment variables

   Go to in  Profile.jsx
        CLOUDINARY_CLOUD_NAME = enter_your_cloud_name;
        CLOUDINARY_UPLOAD_PRESET = enter_your_cloudinary_upload_preset;

   Now after that Create a .env file in the backend root folder and add:
        MONGO_URI=your_online_mongoDB_atlas_URL
        JWT_SECRET=your_jwt_secret_key

4. Start development servers
    Frontend:

    npm run dev


   Backend:

   npm start

