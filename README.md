# Finance Tracker
[![ISC License badge](https://img.shields.io/github/license/tharveyster/tech-blog?style=plastic)](https://opensource.org/licenses/ISC)

## Description
This project is a finance tracker that allows users to create user accounts, and create, update, and delete financial accounts. It currently handles mortgages, car loans, and credit cards. It does not keep track of account numbers, just various monetary values and percentages. It was created using HTML, CSS, JavaScript, Node.js, Express.js, Handlebars.js, MySQL, BCrypt, Sequelize, and Sequelize Session.

## Screenshots
|   |   |
| - | - |
| Landing page |   |
| [<img src="./public/images/finance-tracker-initial-view.png" alt="Langind page" width="600">](public/images/finance-tracker-initial-view.png) |   |
| Login page | Signup page |
| [<img src="./public/images/finance-tracker-login-page.png" alt="Login page" width="600">](public/images/finance-tracker-login-page.png) | [<img src="./public/images/finance-tracker-signup-page.png" alt="Signup page" width="600">](public/images/finance-tracker-signup-page.png) |
| Home page before accounts are added | Home page after accounts are added |
| [<img src="./public/images/finance-tracker-home-page-blank.png" alt="Home page before accounts are added" width="600">](public/images/finance-tracker-home-page-blank.png) | [<img src="./public/images/finance-tracker-home-page.png" alt="Home page after accounts are added" width="600">](public/images/finance-tracker-home-page.png) |

## Deployed

A test version of this application has been deployed to Heroku at [this link](https://finance-tracker-8691.herokuapp.com/)

## Installation
Clone this repository, go to the repository folder in the terminal, and then run the following command

```
npm i
```

You must have MySQL installed, log into the MySQL command line client, and run

```
source db/schema.sql;
```

In addition, a .env file must be created in the root of the project containing the following code:

```
DB_NAME='finance_db'
DB_USER='username'
DB_PASSWORD='password'
```

Change username and password to your MySQL username and password.

Start the app in the terminal using

```
npm start
```

and open a browser window and go to http://localhost:3001/

## Questions
If you have questions about this repo, open an issue or contact me directly at todd@theharveysplace.com. You can find more of my work at [tharveyster](https://github.com/tharveyster).

## License
ISC

Copyright 2021 Todd Harvey

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
