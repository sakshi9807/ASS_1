# Commenting System like Instagram - README

This project is a commenting system similar to Instagram, allowing users to post comments, like, and dislike comments, as well as post nested comments. The backend of the system is developed using Node.js.

## Features

1. **Likes and Dislikes**: The system allows users to like and dislike each comment. The number of likes and dislikes for each comment is stored.

2. **Signup and Login**: Users can create accounts and log in to the system through a simple signup and login page.

3. **Restrictions on Likes/Dislikes**: Users cannot like or dislike their own comments, and they cannot like or dislike a comment more than once.

4. **Nested Comments**: Users can post nested comments, i.e., they can reply to other comments, creating a threaded discussion.

5. **Likes and Dislikes on Nested Comments**: Nested comments can also be liked or disliked by other users.

6. **Pagination**: Users can view up to 10 comments per page to ensure smooth application loading.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **Database**: MongoDB (to store comments, users, and likes/dislikes)

## Setup

1. Clone the repository to your local machine.
2. Install Node.js and MongoDB if you haven't already.
3. Navigate to the project directory and run `npm install` to install the required dependencies.

