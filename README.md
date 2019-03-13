# What is OpenSource NY?
  OpenSourceNY App(OSNY) is a tool that tracks contributions made by a participant, and then rank the participants using a leaderboard-esque ranking system. Specifically, it is a tool designed to track participation in Open Source NYC's open source contribution challenge held over the summer in which participants are tasked to contribute, such as opening a pull request or issue, to open source projects in any way.

  In other terms, the tool should let participants register to join the challenge or send an email of interest, record activity metrics, and rank participants using a leaderboard.


  For any users that opts in, given a GitHub repo and GitHub username, the software will keep track of stats for that users in relation to the GitHub repo.

# Features (including stats that we will keep track of)
  - WIP

# Dependency
* npm 3.5.2 (might need to install node.js as well, someone please check! And open an issue if node.js is needed)

  For Ubuntu 18.04.2 LTS bionic:
```shell
sudo apt-get update --yes
sudo apt-get install npm --yes
sudo apt-get install postgresql postgresql-contrib
```


# How to run
  In one terminal, run this to get the server running:
  ```bash
  cd src/myapp/server
  npm install   
  npm start
  ```
  In a second terminal, run this to get the front end running:
  ```bash
  cd src/myapp/client
  npm install
  npm start
  ```

  Now go to your browser and open http://localhost:3000/

# How to contribute
  PLEASE FORK, and follow a proper git work flow
  when you have a feature done, do a PR
  PLEASE DO NOT MAKE DIRECT EDITS TO THIS REPO

  If you see any bugs, on documentations, codes, etc please open an issue describing the bug. Thanks!

  Refer to [CONTRIBUTE.md](./CONTRIBUTE.md)


# For start(this section is for initial development of this project, will be removed from this README.md once we have a base to build on top of)
  Here are the 4 features that we would like to have as a base to work off on:

  * User opt in feature
    - Sign up form on the front end
    - connect to back end and fill in to data base
      - GitHub username
  * Base on a project-repo and GitHub username, will keep track of stats
    - Numbers of PR
    - Numbers of merged PR
  * Responsive Website
    - For Mobile
    - For Desktop
  * Data visualizaition of the stats that we will keep track of
  * Any other features
    - MUST ASK Jessie Contour for feedback at contour.j@gmail.com
<h2>OpenSourceNY App</h2>

