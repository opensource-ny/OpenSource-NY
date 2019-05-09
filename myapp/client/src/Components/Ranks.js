import React, {Component} from 'react'
import '../Styles/Ranks.css'
import RankElement from './RankElement.js'

/* the data type of the list that this class will be dealing with is 
 *      var rankCount = {
 *           name  : "",
 *           count : 0,
 *       };
*/

class Ranks extends Component{

    constructor(props){     //Assumes props to only contain a json formated PRPullData
        super(props);

        this.state = {
            githubPRsData: this.props.githubPRsData,
            scoreOption: this.props.option,
        }
    }

    /* parse an array of json objects describing PR from github based on a condition
    * returns an array of RankElement objects based on condition
    * returns empty array if none of the condition matches
    * if key is undefined or null or empty string, return the empty array
    */
    parseGithubPRJsonToScoreList( githubPRJsonSet, scoreOption ) {
        var formatScoreList = [];
        let PRJsonSetScratch = [];

        /* if( githubPRJsonSet === undefined || githubPRJsonSet === null || githubPRJsonSet.length === 0 ) {
            console.log("input array is undefined, null or size of 0");
            return formatScoreList;
        } */

        if( scoreOption === undefined || scoreOption === null || scoreOption === '' ) {
            console.log("no score condition");
            return formatScoreList;
        }

        if( scoreOption === 'mergedPR' ) {
            PRJsonSetScratch = githubPRJsonSet.filter( eachElement => (
                eachElement.merged_at !== null
            ));

            formatScoreList = this.removeDuplicateAndKeepCount(PRJsonSetScratch);
            
            if( formatScoreList === undefined || formatScoreList === null || formatScoreList.length === 0 ) {
                console.log("formatScoreList is undeifned, null or size 0");
                return formatScoreList;
            }

            formatScoreList.sort( (a,b) => {
                return b.count - a.count;
            });
        }

        console.log(formatScoreList);
        return formatScoreList;
    }

    /* 
    * given an array, return an array without duplicated value, plus a count of how many duplication there was
    */
    removeDuplicateAndKeepCount( PRdata ) {
        /* var rankCount = {
            name  : "",
            count : 0,
        }; */

        var uniqueData = [];
        var finalRankCount = [];
        
        PRdata.forEach( eachElement => {
            if( !uniqueData.includes(eachElement.user.login) ) {
                uniqueData.push(eachElement.user.login);
                finalRankCount.push( {  
                    name    : eachElement.user.login, 
                    count   : 1, 
                } );
            } else {
                var index = finalRankCount.findIndex( element => (element.name === eachElement.user.login) );
                if(index === -1) {
                    console.log("cannot find in finalRankCountArr");
                } else {
                    console.log("incremented count!");
                    ++finalRankCount[index].count;
                }
            }
        });
        console.log(finalRankCount);
        return finalRankCount;
    }

    /* 
    * reports a list of name and their score
    */
    reportScoreList( scoreList ) {
        if( scoreList === undefined ) {
            return(
                <div><h3>Array was undefined</h3></div>
            );
        }

        if( scoreList.length === 0 ) {
            return(
                <div><h3>Score list is empty</h3></div>
            );
        }

        return(
            scoreList.map( (eachElement, index) => (
                <RankElement rank={index} name={eachElement.name} score={eachElement.count} />
            ))
        );
    }

    /* 
     * based on the option specified in this.option, pick a scoring system
     */
    divScoreSystem() {
        var formatScoreList = this.parseGithubPRJsonToScoreList(this.props.githubPRsData, this.props.scoreOption);
        
        return( this.reportScoreList(formatScoreList) );
    }

    render() {
        let content = this.divScoreSystem();

        return(
            <div className="rankList">  
                Ranking Stats: 
                <hr></hr>
                {content}
            </div>
        );
    }
}

export default Ranks;