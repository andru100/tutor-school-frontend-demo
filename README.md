# Tutoring App

Tutoring App is an online learning and tutoring platform built with React and TypeScript. It provides a user-friendly interface for students and teachers to interact, create, assign, edit and delete lessons, homework, and assessments. Each user also has a calendar which displays all related events.

It also allows user's to track student performance with a variety of charts and graphs which are displayed in the user's dashboard.

## Live Demo

A live demo of the application is available at tutor-school-frontend-demo.westeurope.azurecontainer.io. The demo has pre-seeded test data, including teacher and student accounts with the following credentials:

Email: teacher@example.com
Password: Password123!

There is also a student account assigned to the teacher account

Email: student@example.com
Password: Password123!

The seeded data includes simulated previous assessment results, allowing the charts and statistics to give a feel for how the app will appear whilst in use.

## Features
Users can do all of the usual account / authentication requirements including signup with email or Google SSO, passwword resets, updating account details. Each of these options requires MFA to maintain security.

Dependent on the user type selected during signup, users are displayed different dashboards. 

Students can see their past results in several charts and can access their upcoming and previous lessons, homework and assessments.

Teachers have a similar dashboard except they are able to view each student's results and stats by selecting from the dropdown list of their assigned students. The same applies when looking at their homework, lessons and assessments tabs. They are able to create, edit, delete and filter by selecting the student's name from the dropdown list or using the search bar.

Teachers can view a student's dashboard by clicking the 'students' panel in the dashboard then clicking the view / eye icon. This will allow the teacher to view the student's dashboard as the student would. Lessons, homework, and assessments can still be created by teachers whilst in the student dashboard view.

All users also have a calendar which includes all upcoming events.

I have included a GitHub Actions workflow for deploying to an Azure Container Instance.

## Installation

Clone the repository: git clone https://github.com/andru100/Tutoring-School-Frontend.git
Navigate to the project directory: cd tutoring-app
Install dependencies: yarn install
Create a .env file by copying the .env.example file and providing the required environment variables. If deploying with github actions make sure each env variable is added to the repo github secrets.
Start the development server: yarn run dev

## Development Environment Setup
I have included a `.devcontainer` folder so you can to set up your development environment quickly. 

## TODO

This is no where near finished so there's alot to do. :)
Priorties are creating the messaging and notification pages, unit tests, refactoring, ui improvements and general useabilty changes.
