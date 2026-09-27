
What it does
User registration with full name, email, phone, address, gender, and date of birth
Secure login using PHP sessions and password hashing
Restaurant listing with:
search by restaurant name or cuisine
sort by rating, time, or name
favorite toggle
selection of restaurants before ordering
Checkout flow that sends selected restaurant items to the server
Order records saved in a MySQL database
Tech stack
Front end: HTML, CSS, JavaScript
Back end: PHP
Database: MySQL
Local development setup: XAMPP / Apache + MySQL
Project structure
h1.html: login page
h2.html: signup page
h3.html: restaurant dashboard
login.php: login logic
signup.php: registration logic
order.php: order submission logic
logout.php: logout logic
db_connect.php: database connection
s1.css: login/sign-up styling
s2.css: dashboard styling
j1.js: restaurant filtering, sorting, selection, and order actions
Important observations
The code is a working prototype but not fully polished for production.
Some references are inconsistent:
h3.html sends users to h4.html, but there is no h4.html in the project.
login.php redirects to login.html, but the actual file in the project is h1.html.
order.php connects directly to MySQL instead of using db_connect.php.
The app relies on a database named shopurfood and expects tables named users and orders.
The project uses image references like img1.jpg and img2.png, which may need to be added to the repo.
README content for GitHub

Installation
Clone the repository:

Move the project folder into your local server directory:
For XAMPP: htdocs
For WAMP: C:\wamp64\www\
Start Apache and MySQL from XAMPP/WAMP.

Open the project in the browser:


Usage
Open the login page.
Create a new account by clicking Sign Up.
Log in using your credentials.
Browse restaurants and search/sort items.
Select restaurants and place an order.
The order is stored in the MySQL database.
Notes
This project is a student-level food ordering web application and is intended for learning and demonstration purposes. Some file names and redirects may need minor fixes before production deployment.

Future Improvements
Add admin panel
Add menu and item-level ordering
Add payment integration
Improve security and validation
Add proper error handling and user-friendly messages
Replace static restaurant data with database-driven records
License
This project is for educational purposes and can be modified and shared freely.

Author
Your Name / Student Project
