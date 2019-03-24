import React from "react"
import '../App.css'

function Opening(){
    return(
        <div>
            <p className="instructions">
                To check the information of all the Pull Requests in a given repository,
                <br />
                please enter the information in the following format:
                <br /> 
                <strong>'github_user_name/repo_name'</strong> without the quotes.
            </p>

            <hr />

            <p className="instructions"><strong>CASE SENSITIVE</strong>
                <br />
                <strong>Example:</strong> opensource-ny/OpenSource-NY
            </p>

            <p className="instructions">
                Optional: Enter a Github username for Pull Requests maded by the specified username
                if username doesn't exists, the outputs will be as if the username wasn't entered.
            </p>

        </div>
    )
}

export default Opening