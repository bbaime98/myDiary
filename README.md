
[![Build Status](https://www.travis-ci.com/bbaime98/myDiary.svg?branch=develop)](https://www.travis-ci.com/bbaime98/myDiary)
[![Coverage Status](https://coveralls.io/repos/github/bbaime98/myDiary/badge.svg)](https://coveralls.io/github/bbaime98/myDiary)
[![Maintainability](https://api.codeclimate.com/v1/badges/96b06082c70299a2c5ce/maintainability)](https://codeclimate.com/github/bbaime98/myDiary/maintainability)

# MyDiary
## What is it?

MyDiary is an online journal where users can pen down their thoughts and feelings


## What does it do?

- Users can **sign up**
- Users can **sign in**
- Users can **view all entries** showing all created entries
- Users can **view any specific entry** showing one of the created entries
- Users can **create** an entry describing their thoughts
- Users can **modify** their entries
- Users can **delete** their entries

# UI TEMPLATE

## How to Find it

The UI template is hosted on gh-pages and can be found at https://bbaime98.github.io/myDiary/

## Usage

- After you've reached the link you get the homepage.
- Click on `Get started` to get to the Signing up page
- From there click `Register ` to get to the login page

- And from the login page, click `Log in` to get to the User dashboard page

- You can create an entry page by clicking on `New entry`

- You can modify an entry  by clicking on `edit`

- You can delete an entry  by clicking on `delete`



# API

## Tools:

- Server-side Framework: **Node/Express**
- Linting Library : **Eslint**
- Style Guide : **Airbnb**
- Testing Framework :**Mocha** with **chai**

---

## Other Tools:

- Travis CI for continous intergration
- Babel transpiler for javascript ES6
- nyc for test coverage

---

# Installation:

**Follow the step below:**

If you do not have node.js and git in your computer, install them first:

- download [node.js](https://nodejs.org/en/download/)

- download [git](https://git-scm.com/downloads)

Clone this project using:

```
$ git clone https://github.com/bbaime98/myDiary.git
```

to install all dependencies required for this project run the below command in your terminal:

```
npm install
```

to start the server run the below command in your terminal

```
npm start
```

or

```
npm dev-start
```

to run the tests for this project run the below command in your terminal

```
npm test
```

---

Below is a list of API Endpoints you will find:

- **POST/api/v1/auth/signup** : To sign up an user

- **POST/api/v1/auth/signin** : Log in an user

- **GET/api/v1/entries** : Get all entries order from latest

- **GET/api/v1/entries/:entryID** : Viewing a single entry

- **POST/api/v1/entries** : Creating a new entry

- **PATCH/api/v1/entries/:entryID** : Editing an entry

- **DELETE/api/v1/entries/:entryID** : Deleting an entry

---

USE **POSTMAN** or any other api client app to test requests other than the GET request.

If POSTMAN is not installed in your computer, DOWNLOAD it [here](https://www.getpostman.com/apps)

## Contribute

---

- To contribute to this project, clone and install the app as instructed above. Then create a new branch off the develop branch on which to make your changes.

- After you're done with the changes, push them upstream to my repo on that same branch and create a pull request and i will consider them.

## Instructions:

navigate to the MyDiary folder and in your terminal, type:

```
git checkout -b branchnameforyourchanges
```

then after making the changes, type:

```
git add .
```

then

```
git commit -m "your commit message"
```

and push like so

```
git push origin branchnameforyourchanges
```
# Documentation:

https://documenter.getpostman.com/view/8269007/SW12yx9M

# Author:

**Bien Aime**

[Bien-Aime](https://github.com/bbaime98/myDiary.git) - Github
