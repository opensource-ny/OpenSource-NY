# Stack information
  * Backend:
    - Express JS
    - MongoDB
  * Frontend:
    - React JS

# Getting started 
(The following are only suggestions, you can do anything anyway you like, but will need to make sense to be merged)
  * Express lives in src/myapp/server/src/server.js 
    - Code your API in this file, such as log in, get data, etc.
  * React lives in src/myapp/client/src/App.js
    - This js script will edit what you see on the main page of front end (http://localhost:3000/).
  
# Submitting an Issue
  Please feel free to submit any sort of issue that you think should be fixed, even if you are not sure, post it, we will have discuss it. Also submit Issue base on one problem, please do not group problems together and submit it as one Issue. We want to keep things organized and managable.

  But please submit in this format:

  ```
  ### Context

    Some words on the context of the problem, such as when it might happen, why you think it's a bad thing

  ### Optional: Ideas on a Fix

    Some words on what you might think could be a fix, this is for new comer to get a head start on trying to fix the issue. Again, these ideas may not necessarly be the correct way to go about fixing it, we will discuss.
  ```

# Submitting a Pull Request
  Before submiting a Pull Request, please submit the issue first if the issue doesn't already exist. A Pull Request is only considered after an issue request has been verified by a maintainer to be an actual issue.

  Please submit in this format:

  ```
  ### Referneces

    Link reference to issue, try to keep refernces to only one issue, so we can unit test the Pull Request on that one issue. We want to keep things organized and managable

  ### Context

    Some words on the context of the problem, such as when it might happen, why you think it's a bad thing. As well as an overview on what you have done to fix it. 

  ### The Fix

    A detailed explanation of what you did, as well as why you did it.
  ```


# Workflow
  Please use the standard git work flow. 

  1. Create a fork.
  2. Clone that fork to your local computer.
  3. Add an upstream tracking https://github.com/opensource-ny/OpenSource-NY
  4. Update your local repo from upstream by doing a pull.
  5. Create feature-branch in your fork.
  6. Edit and test feature-branch in your fork.
  7. Stage and commit all changes. 
  8. Do a pull from upstream tracker to resolve any merge conflict.
  9. Push to remote feature branch (in your fork!)
  10. Make a PR to this repo with that feature-branch from your fork.
  11. After PR is successful, delete the feature branch, and update your fork remote repo.
  12. Repeat step 4 to 11.

  Here is an example workflow with commands
  
  Step 1-3
  
  ```shell
  ...On github make a fork of this repo...
  git clone https://github.com/YOUR_GITHUB_NAME/OpenSource-NY.git
  git remote add upstream https://github.com/opensource-ny/OpenSource-NY
  ```

  Step 4-10 (Assumes origin is tracking your fork and upstream is tracking main repo)
  
  ```shell
  git pull -p upstream master
  git branch feature-branch
  git checkout feature-branch
  
  ...do your edits and test...
 ...Stage and Commit changes...
  
  
  git checkout master
  git pull upstream master
  git push origin master
  git checkout feature-branch
  git merge master
  git push origin feature-branch
  
  ...make your Pull Request from your fork remote feature branch. Then after your PR is successful...
  
  git checkout master
  git pull upstream master
  git branch -d feature-branch
  git push -d origin feature-branch
  git push origin master
  ```

# Testing

  * Tools
    - Jest (Unit testing)
    - SuperTest in conjunction with Jest(Integration testing, or end-to-end test that tests the whole application)

  The following command will run *test.js in src/myapp/test/src/
   
  In src/myapp/test run:
  ```shell
  npm test
  ```
 
## Jest

  To learn how to use Jest, refer to [jest-github-doc](https://jest-bot.github.io/jest/docs/getting-started.html)

  But the gist of it is that:
  * In your package.json under "scripts", add "test": "jest". This will allow jest to parse the json file and find the 'jest' keyword. [More info](https://jestjs.io/docs/en/configuration#bail-number-boolean)
  * Then write some test cases for some piece of code you wrote. Refer to [node-js-testing-pt2](https://codeburst.io/revisiting-node-js-testing-part-2-14f50f8ddab5) and [jest-github-doc](https://jest-bot.github.io/jest/docs/getting-started.html)

  For each feature, if possible, write some test using to be used by Jest.


[Good -Read-On-Testing-medium](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)