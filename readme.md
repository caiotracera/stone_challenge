<h1 align="center">
  <img src="https://vagas.byintera.com/wp-content/uploads/2019/05/stoneverde.png" width="200px" style="border-right: 1px solid #fff; padding-right: 50px">
  <img src="https://i1.wp.com/2.bp.blogspot.com/_slzL0vHRjtY/TDzPlqM1aSI/AAAAAAAAFLk/ARv2Ke_9gXY/s1600/marvel-logo.jpg" width="200px" style="padding-left: 50px">
</h1>

<h4 align="center">A Next.js and Node.js application </h4>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/caiotracera/stone_challenge?color=22b24c">

  <img src="https://img.shields.io/github/languages/count/caiotracera/stone_challenge?color=22b24c">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/caiotracera/stone_challenge?color=22b24c">

  <a href="https://www.linkedin.com/in/caiotracera/">
    <img alt="Made by caiotracera" src="https://img.shields.io/badge/made%20by-caiotracera-%230172B3?color=22b24c">
  </a>

  <a href="https://github.com/caiotracera/stone_challenge/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/caiotracera/stone_challenge?color=22b24c">
  </a>

  <a href="https://github.com/caiotracera/stone_challenge/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/caiotracera/stone_challenge?color=22b24c">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=22b24c"/>
</p>

<blockquote align="center">
“Every day is a new beginning, take a deep breath and start again.”
</blockquote>

<p align="center">
  <a href="#rocket-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#man_technologist-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#pencil2-todo">Todo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<!-- <div align="center">
  <img src="src/assets/images/banner.svg"/>
</div> -->

# :rocket: About the project
This project was developed to solve the challenge proposed by Stone for the junior fullstack developer position.

* <b><a href="#">Demo</a></b> (coming soon)

# :man_technologist: Technologies

* Next.js
* Node.js
* Typescript

# :wrench: Getting started

In order to run this project, you must have installed <a href="https://nodejs.org/en/">Node.js</a> and <a href="https://git-scm.com/">Git SCM</a>. If you met all the requirements, follow the instructions:

<b>Clone the project</b>

```shell
$ git clone https://github.com/caiotracera/stone_challenge
$ cd stone_challenge
```

<b>Start the server</b><br />
You must be running a Postgres and Redis docker and edit the `ormconfig.js` to connect to your database.

```shell
$ cd server
$ yarn # or npm install
$ yarn typeorm:migration run # or npm run typeorm:migration run
$ yarn dev:server # or npm run dev:server
```


<b>Start the web</b><br />

```shell
$ cd web
$ yarn # or npm install
$ yarn dev # or npm run dev
```

# :pencil2: Todo
 - [ ] <b>Backend</b>
   - [x] Users
     - [x] Create migrations
       - [x] User
       - [x] UserToken
     - [x] Create entity
       - [x] User
       - [x] UserToken
     - [x] Create repositories
       - [x] User
       - [x] UserToken
     - [x] Create services
       - [x] Authenticate user sevice
       - [x] Create user service
       - [x] Reset password service
       - [x] Send forgot password email service
       - [x] Show profile service
       - [x] Update profile service
       - [x] Update user avatar service
     - [x] Create tests
       - [x] Authenticate user sevice
       - [x] Create user service
       - [x] Reset password service
       - [x] Send forgot password email service
       - [x] Show profile service
       - [x] Update profile service
       - [x] Update user avatar service
   - [ ] Deploy
<br /><br />
 - [ ] <b>Frontend</b>
   - [x] Design
   - [ ] Implementations:
     - [x] Sign up
     - [x] Sign in
     - [x] Forgot password
     - [x] Reset password
     - [ ] Log out
     - [ ] Edit profile
     - [ ] List comics
     - [ ] Fav/unfav comics
     - [ ] List characters
     - [ ] Fav/unfav characters
     - [ ] List fav comics/characters

# :memo: License

Made with :sparkling_heart: by Caio.
<br />
:coffee: Can we have a coffe? <a href="https://www.linkedin.com/in/caiotracera/">Get in touch!</a>
