### Header.js 
This file contains the navbar of the client page. This is what it looks like:
![Navbar](https://github.com/darrenzhang2000/images/blob/master/Screenshot%20from%202019-11-02%2012-28-58.png)

The left side of the navbar contains the app name (OSNY APP) followed by its logo. 

The right side of the navbar contains two buttons, About and GitHub.
Clicking the GitHub button redirects the user to the project home page, which can be found [here](https://github.com/opensource-ny/OpenSource-NY).
Clicking the About button redirects the user to the project ReadMe, which can be found [here](https://github.com/opensource-ny/OpenSource-NY/blob/master/README.md).

### RankElement.js
This file contains the RankElement component. RankElement has three states: 
1. rank
	* The rank of the the contributer determines how much the contributer has contributed to the project relative to the other contributers, where rank 1 means most contributions. 
2. name
	* GitHub username of the contributer.
3. score
	* Issue: Currently not implemented into the project

The render() function returns the html that the website displays when the class is called. 

The styles associated with className "rankElement", "ranks", and "score" can be found [here](https://github.com/opensource-ny/OpenSource-NY/blob/master/myapp/client/src/Styles/RankElement.css).

### Ranks.js
The Ranks component has a render() function that returns the html containing the Ranking Stats. The styling of this html can be found [here](https://github.com/opensource-ny/OpenSource-NY/blob/master/myapp/client/src/Styles/Ranks.css). 

The contents of this html depends on the divScoreSystem() method, which chooses one of the options in this.option to base the rankings off of. 

The reportScoreList( scoreList) function returns the html for the Score List. 

The options themselves are implemented in parseGithubPRJsonToScoreList( githubPRJsonSet, scoreOption ), which returns a formatted list of scores that is sorted by descending order.

The removeDuplicateAndKeepCount( PRdata ) function takes in pull request data and returns an array finalRankCount containing objects named rankCount which has two members, name (to keep track of the GitHub username) and count (for the number of duplicates). 

### ScoreBoard.js
The ScoreBoard component has a render function that displays the ranks data. There is also a "loading" feature that tells the user when the scoreboard is loading. The styling of the scoreboard can be found [here](https://github.com/opensource-ny/OpenSource-NY/blob/master/myapp/client/src/Styles/ScoreBoard.css).

### PullRequest.js
The PullRequest component has the following states:  
	1. PRnumber: This is the unique id number that distinguishes pull requests from one another  
	2. PRtitle: This is title of the pull request.  
	3. PRlink: This is the GitHub link to the pull request.  
	4. PRState: This is the state of the pull request (open, rejected, or  merged).  
	5. PRmerge: This is tells the user whether the pull request is merged or not.  
	6. PRauthor: This is the GitHub username of whoever made the pull request.  

The PullRequest component has a render function that returns the merge_status (PRState), a url to the pull request, the author of the post request and the title of the pull request.

The styling can be found [here](https://github.com/opensource-ny/OpenSource-NY/blob/master/myapp/client/src/Styles/PullRequest.css).

### Home.js
This file contains the Home component, which has shows the PRdisplay and Scoreboard components (mentioned above).

Repo name:
opensource-ny/opensource-ny 
