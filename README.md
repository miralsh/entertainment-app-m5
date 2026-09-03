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
  

API Endpoints:
https://documenter.getpostman.com/view/18088497/2sB2x5GXpa



Screens:

Home
<img width="1920" height="913" alt="Screenshot 2026-09-03 at 20-07-02 Entertainment App" src="https://github.com/user-attachments/assets/9aedd440-e4db-43a4-892a-f3c2074d3ec9" />

Movies
<img width="1920" height="913" alt="Screenshot 2026-09-03 at 20-08-43 Entertainment App" src="https://github.com/user-attachments/assets/3d96eef4-4b3a-482b-8c4a-b344541e506b" />

Movie Detail
<img width="1920" height="913" alt="Screenshot 2026-09-03 at 20-09-58 Entertainment App" src="https://github.com/user-attachments/assets/f2a40533-d36d-4358-9210-98818332f1fd" />

Bookmark
<img width="1920" height="1297" alt="Screenshot 2026-09-03 at 20-11-15 Entertainment App" src="https://github.com/user-attachments/assets/7eb38db0-06df-4199-9f70-a233ab8d15db" />

Login/Sign up
<img width="1920" height="1517" alt="Screenshot 2026-09-03 at 20-11-53 Entertainment App" src="https://github.com/user-attachments/assets/19c73c54-ff9b-44c8-9a74-5e3968579b8e" />

Contact
For questions, feedback, or collaboration, feel free to reach out to Miral Harsora at miralharsora18@gmail.com

