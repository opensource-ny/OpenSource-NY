# Stack information
  * Backend:
    - Express JS
    - PostgressQL
  * Frontend:
    - React JS

# Workflow
  Please use the standard git work flow. 

  1. Create a fork.
  2. Clone that fork to your local computer.
  3. Add an upstream tracking https://github.com/yizongk/OpenSource-NY.git
  4. Update your local repo from upstream by doing a pull.
  5. Create feature-branch in your fork.
  6. Edit and test feature-branch in your fork.
  7. Do a pull from upstream tracker to resolve any merge conflict.
  8. Push to remote feature branch (in your fork!)
  9. Make a PR to this repo with that feature-branch from your fork.
  10. After PR is successful, delete the feature branch, and update your fork remote repo.
  11. Repeat step 4 to 11.

  Here is an example workflow with commands
  
  Step 1-3
  
  ```shell
  ...On github make a fork of this repo...
  git clone https://github.com/YOUR_GITHUB_NAME/OpenSource-NY.git
  git remote add upstream https://github.com/yizongk/OpenSource-NY.git
  ```

  Step 4-10 (Assumes origin is tracking your fork and upstream is tracking main repo)
  ```shell
  git pull -p upstream master
  git branch feature-branch
  git checkout feature-branch
  ...do your edits and test...
  git pull upstream feature-branch
  git push origin feature-branch
  ...make your Pull Request from your fork remote feature branch. Then after your PR is successful...
  git checkout master
  git branch -d feature-branch
  git pull -p upstream master
  git push origin master
  ```

# Test cases
  For each feature, if possible, list test cases and expected outcome. Or some automated test.