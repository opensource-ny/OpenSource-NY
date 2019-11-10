import React, { Component } from 'react';
import PullRequest from './PullRequest';
import '../Styles/PRdisplay.css';
import loadingmodal from '../Images/loading.red.gif';

class PRdisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            repoName: '', // Expects this form: 'Github_user_name/repo_name' without the quotes
            githubUserName: '',
            error: null,
            loading: this.props.loading,
            content: []
        };

        this._handleRepoSubmit = this._handleRepoSubmit.bind(this);
        this._handleRepoNameChange = this._handleRepoNameChange.bind(this);
        this._handleGithubUserName = this._handleGithubUserName.bind(this);
    }

    _handleRepoSubmit(e) {
        e.preventDefault();
        // strips white space, but should really remove leading and trailing white spaces
        const repoName = this.state.repoName.replace(/ /g, '');

        this.setState({
            loading: true,
            firstTime: false,
            data: null
        });

        this.props.updateScoreBoard([]);

        fetch(`http://localhost:5000/api/pullrequest/?repo=${repoName}`)
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    this.setState({
                        error: result.error.message,
                        loading: false
                    });
                    return;
                }
                this.setState({
                    error: null,
                    loading: false
                });
                this.props.updateScoreBoard(result);
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                });
            });
    }

    _handleRepoNameChange(e) {
        const value = e.target.value;
        //check if repo name is valid, change to regex
        let error = null;
        if (value && !value.includes('/')) error = 'Not valid repo name';
        this.setState({ repoName: value, error });
    }

    _handleGithubUserName(e) {
        const value = e.target.value;
        this.setState({ githubUserName: value, error: null });
    }

    /* parse an array of json objects describing PR from github based on a condition
     * returns an array of json objects based on condition
     * returns the exact array as original if none of the condition matches
     * if key is undefined or null or empty string, return the original array as it is
     */
    parseGithubPRJson(githubPRJsonSet = this.githubPRsData, condition, key) {
        if (!key || condition === 'byAll') {
            return githubPRJsonSet;
        }

        if (condition === 'byName') {
            return githubPRJsonSet.filter(
                eachElement => eachElement.user.login === key
            );
        }

        if (condition === 'byMergeStatus' && key === 'merged') {
            return githubPRJsonSet.filter(
                eachElement => eachElement.merged_at !== null
            );
        }
    }

    /*
     * reports a list of PR base on the input array of github PR json objects
     */
    reportPRList(dataPR) {
        if (dataPR === undefined) {
            return (
                <div>
                    <h3>Array was undefined</h3>
                </div>
            );
        }

        if (dataPR.length === 0) {
            return (
                <div>
                    <h3>Found no data</h3>
                </div>
            );
        }

        return dataPR.map(eachElement => (
            <PullRequest key={eachElement.id} content={eachElement} />
        ));
    }

    /*
     * @arg eachElement should be a json object.
     * meant to be used by reportPRListDetailed's returning html stuff
     */
    reportMergeStatue(eachElement) {
        if (eachElement.state === 'open') {
            return 'Open';
        }

        if (eachElement.merged_at === null) {
            return 'Rejected...';
        } else {
            return 'Merged!';
        }
    }

    /*
     * reports a list of PR and their merge status base on the input array of github PR json objects
     */
    reportPRListDetailed(dataPR) {
        if (dataPR === undefined) {
            return (
                <div>
                    <h3>Array was undefined</h3>
                </div>
            );
        }

        if (dataPR.length === 0) {
            return (
                <div>
                    <h3>Found no data</h3>
                </div>
            );
        }

        return dataPR.map(eachElement => (
            <PullRequest key={eachElement.id} content={eachElement} />
        ));
    }

    render() {
        return (
            <div className="PRs">
                <div className="PullContainer">
                    <div className="inputBox">
                        <form onSubmit={this._handleRepoSubmit}>
                            <input
                                className={
                                    this.state.error ? 'warning' : 'good'
                                }
                                name="repoName"
                                type="text"
                                placeholder="Enter Github repository name here"
                                value={this.state.repoName}
                                onChange={this._handleRepoNameChange}
                            ></input>
                            <input
                                className={
                                    this.state.error ? 'warning' : 'good'
                                }
                                name="githubUserName"
                                type="text"
                                placeholder="Enter Github username here"
                                value={this.state.githubUserName}
                                onChange={this._handleGithubUserName}
                            ></input>
                            <input
                                className="submitBtn"
                                type="submit"
                                value="Search"
                            ></input>
                        </form>
                    </div>
                    <hr />
                    {/* In the future, should only update output when submit button is hit or enter key is hit on input field. As of right now it constantly updates, which may not be good for us. */}
                    <div>
                        {this.state.error ? <h2>{this.state.error}</h2> : null}
                    </div>

                    <div className="pullRequestContainer">
                        {this.state.loading ? (
                            <img src={loadingmodal}></img>
                        ) : (
                            this.reportPRListDetailed(
                                this.parseGithubPRJson(
                                    this.props.githubPRsData,
                                    'byName',
                                    this.state.githubUserName
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default PRdisplay;
