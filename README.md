# Tutoring App

Tutoring App is an online learning and tutoring platform built with React and TypeScript. It provides a user-friendly interface for students and teachers to interact, create and assign lessons, homework, and assessments, and track student performance.

## Live Demo
A live demo of the application is available at tutor-school-frontend-demo.westeurope.azurecontainer.io. The demo has pre-seeded test data, including a teacher account with the following credentials:

Email: teacher@example.com
Password: Password123!
There is also a student account assigned to the teacher account

Email: student@example.com
Password: Password123!
The seeded data includes previous assessment results, allowing the charts and statistics to display properly.

## Features
User authentication with Google or email sign-up (confirmation email sent for email sign-up and password reset)
Separate dashboards for teachers and students
Interactive charts and statistics for student assessment performance (overall and by topic)
Dropdown menu to switch between different chart types
Teacher dashboard displays information about all assigned students
Teachers can view a student's dashboard by clicking the students panel in the dashboard the clicking the view / eye icon. This will allow the teacher to view the students view.
Lesson, homework, and assessment can be created for teachers
Any event that is created will have an accompanying calendar even
There is edit and delete functionality for scheduled events
I have included a GitHub Actions workflow for deploying to an Azure Container Instance
when a student logs in and is shown Student dashboard there is a billing panel for students to sign up for a paid service with a personal tutor or use the platform for practice exams and identifying weaknesses by sub-topics

## Installation
Clone the repository: git clone https://github.com/andru100/Tutoring-School-Frontend.git
Navigate to the project directory: cd tutoring-app
Install dependencies: yarn install
Create a .env file by copying the .env.example file and providing the required environment variables. If deploying with github actions make sure each env variable is added to the repo github secrets
Start the development server: yarn run dev

## TODO

This is no where near finished so theres alot to do. :)
Priorties are unit tests, refactoring, ui improvements and general useabilty changes.

