# entertainment-app-m5

Entertainment App is a fully responsive web application built using ReactJS + Vite. It provides the latest updates on upcoming and trending movies and TV series. The app manages essential functionalities such as trending content, recommendations, movie and TV series listings, and user-specific bookmarks.

Features
✅ Responsive Design: Mobile-first approach ensuring optimal user experience on all devices.
✅ Trending List: Display list of trending movies and tv series retrieved from TMDB API.
✅ Recommendations: Display list of recommended movies and tv series retrieved from TMDB API.
✅ Movies: Display paginated list of movies retrieved from TMDB API.
✅ Tv-series: Display paginated list of TV series retrieved from TMDB API.
✅ Bookmark: Display list of bookmarked movies and tv shows for a particular user.
✅ Search :Search trending,recommended, all movies,tv series and bookmarked shows.
✅ User Authentication: Secure login and registration system. 
✅ React Router: Provides smooth navigation with dynamic routing.
Tech Stack
•	Frontend: ReactJS, Tailwind CSS
•	State Management: Redux toolkit
•	Routing: React Router
• Backend: Node.js, expressjs
• Database: MongoDB

Installation
1.	Clone the Repository:
2.	git clone (https://github.com/miralsh/entertainment-app-m5.git)
3.	cd Backend
4.	npm start
5.	cd Client
6.	Install Dependencies:
7.	npm install
8.	Run the Development Server:
9.	npm run dev
10.	Build for Production:
11.	npm run build





Folder Structure
Client/src
  |-- assets          # Images, icons, etc.
  |-- components      # Reusable UI components
  |--helper           # regex for input validation
  |-- pages           # Main application pages (Movies,Home,TV series,Bookmark,Login,Signup)
  |-- redux           # redux toolkit
    |--slice          # slices for storing all the reducer and actions
    |--thunks         # middleware to interact with redux store 
    |--store          # redux store
  |-- App.jsx         # Root component
  |-- main.jsx        # Entry point
  .env                # api_key

  Backend/
  |--server.js       # Entry point
  |--models          # Define Database schema
  |--routes          # routes and functions
  |--middleware      # token validation
  |--config          # mongo db connection
  .env               # mongodburl, port, access_token_secret
  

Screens:

Home

![Screenshot 2025-06-13 191415](https://github.com/user-attachments/assets/40725f44-8e7b-4257-9912-65a559561f32)

Movies
![Screenshot 2025-06-13 191425](https://github.com/user-attachments/assets/0f720e2c-3f0b-4c8a-83fa-d5958fa5f9fa)

Movie Detail
![Screenshot 2025-06-13 191713](https://github.com/user-attachments/assets/56183cb6-1798-4634-bc0e-923a9e3d619b)

Tv-series

![Screenshot 2025-06-13 191432](https://github.com/user-attachments/assets/e8726c65-933e-4b47-b2ba-28fcccf342ba)

TV series Detail

![Screenshot 2025-06-13 191724](https://github.com/user-attachments/assets/95d34bb8-e97d-439f-9e5e-780a4c4a4864)

Bookmark


![Screenshot 2025-06-13 191703](https://github.com/user-attachments/assets/8c5cef10-84c6-4825-85f5-6cb2d459fab9)



Login/Sign up

![Screenshot 2025-06-13 191448](https://github.com/user-attachments/assets/1478b7dd-88e8-4a1e-bb49-1fe1b6d6c715)


![Screenshot 2025-06-13 191454](https://github.com/user-attachments/assets/20b1c9bc-67fd-4d7c-ab3a-330540dbec17)




Contact
For questions, feedback, or collaboration, feel free to reach out to Miral Harsora at miralharsora18@gmail.com

