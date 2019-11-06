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

Repo name:
opensource-ny/opensource-ny 