# Final Project

## Due Last day of Class
## First report due Monday Oct 28, 2024

### Build a web app in a team of 4-5

### Video: https://drive.google.com/file/d/1lqXWgMt3rmvEk8hKcRAAg-7jAjoVxIxn/view?usp=sharing

### Description of the Project
* Name of Application
	* HockeyBuilder 
* Roles of Team Members
	* Hannah Kaufman, hfk225@lehigh.edu  - API Integration
	* Jack Mishkin, jsm225@lehigh.edu  - Backend/Database functionality
	* Ryan Mock, rtm225@lehigh.edu - Frontend/UI
* Functionality
	* User Accounts - 
		* Admin can view all teams and delete teams
		* Users can create teams and play game
	* Database - 
		* Supabase, Postgres
		* Our database will hold the teams that users create. 
	* Interactive UI - 
		* Drafting
			* Users will be able to search players, or choose from the given list
			* Can filter by position
			* Chooses a center, left wind, right wing, and 2 defensemen
		* Viewing
			* Shows all of the teams in a table format
			* Button to delete teams
		* Play Games
			* Users can select two teams to go head to head and winning team is displayed
	* Extra Library/Framework - 
		* Tailwind CSS to create a visually pleasing UI.
	* REST API - 
		* https://puckpedia.com/tools/data, fed the information into Supabase (approved by Professor Onimus)
		* Player information
* User Story
	* Our user can go on the application and build a hockey team with their favorite players. They will then be able to select two teams to faceoff and see which team wins! Only admins will be able to view teams and delete them.
* Technical Design
	* Backend - Node.js
	* Frontend - React, Express
	* API Integration - Moneypuck
	* Database - PostgreSQL, Supabase

### How to Run the code:
* First open a terminal and cd into the backend. once in the backend, run 'node server.js' to run it on port 3000.
* Next, open a seperate terminal and cd into the frontend. once in the frontend, run 'npm run start' to start the react app on port 3001. Then, you can interact with the app in the localhost. 
* For loggin in, one admin login is 'jack' and '123'. a user login is 'ryan' and '456'. each are the username and password respectively. 
* create a .env file in backend and paste this in
	* SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2a2Zyc3NocXV6cmFybGV5YWtvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjU2ODQ0NiwiZXhwIjoyMDQ4MTQ0NDQ2fQ.2cd2QZ9k-Qe-lRlCycR9H_OMKQWXwRKeQcdAvf536V8'


### Requirements:
* Must have user accounts and different user roles (like user/Admin, free/paid, etc)
* Must use a database (you choose)
* Must have interactive UI (of any kind)
* Must use a library or framework not discussed/used in class
* Must use an outside REST API in some way (Outside as in external, like the Reddit API, etc)

* Feel free to build off other projects and frameworks. For example [https://github.com/sahat/hackathon-starter] is a great starter project that you can build on top of. 

### Instructions
Build your team and write a document describing your application to me by Monday Oct 28, 2024. Email this document to me and the TA for this course (Xinhui Chen xic721@lehigh.edu)  I will approve your web application idea. In your paper, include:
* the name of your application
* Name and roles of all your team members
* its functionality (how does it meet each of the requirements listed above - list each requirement along with your will fulfill it)
* user story/use case (what happens when a user visits your application, what can they do, etc)
* technical design (what is your tech stack)


### Final deliverable due end of the semester:
* Codebase in Github Repo
* README describing your project, with all the information outlined above (team members, application name, description, etc). You will also include detailed instructions of how to install and run your application, and what API keys, databases, etc are needed to run your application.
* Final Presentation and Demo
  * You will prepare a 5 minute presentation and demo of your application in class during the last week of classes

