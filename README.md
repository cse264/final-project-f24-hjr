# Final Project

## Due Last day of Class
## First report due Monday Oct 28, 2024

### Build a web app in a team of 4-5

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

### Description of the Project
Name of Application
HockeyBuilder 
Roles of Team Members
Hannah - API Integration
Jack - Backend/Database functionality
Ryan - Frontend/UI
Functionality
User Accounts - 
Admin will be able to create teams.
Users can adjust their teams.
Database - 
	Our database will hold the teams that users create. 
	It will also hold a table full of all existing players
Interactive UI - 
	Users will be able to select the action they want to perform 
		Draft team, view team, play game
	Drafting
		Users will have a set salary cap, and each player will be ranked by points
		Users will be able to search players, or choose from the given list
		They cannot exceed the salary cap 
	Viewing
		Will show the user’s team in a traditional team-viewing manner
		Forwards on top, then defensemen, then goalies
	Play Games
		Users will be able to play games against other users’ teams
		Record tracked 
Library/Framework - 
	Tailwind CSS to create a visually pleasing UI.
REST API - 
	https://puckpedia.com/tools/data 
User Story
Our user can go on the application and build a hockey team with their favorite players. They will then get a score based on how well they made their team. Only admins will be able to create new teams, which will be assigned to a user, and the user populates that team build.
Technical Design
Backend - Node.js
Frontend - React
API Integration - NHL API platform
Database - PostgreSQL
