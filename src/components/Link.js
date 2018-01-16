import React, { Component } from "react"
import { AUTH_TOKEN } from "../constants"
import { timeDifferenceForDate } from "../utils"
import graphql from "react-apollo/graphql"
import gql from "graphql-tag"

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div>
        <div>
          <span className="gray">
            {this.props.index + 1}.{" "}
            {authToken && (
              <span className="f11 voteBtn" onClick={this._voteForLink}>
                {" "}
                ▲{" "}
              </span>
            )}
          </span>
          <span className="">
            {this.props.link.description}{" "}
            <span className="f11">({this.props.link.url})</span>
          </span>
        </div>
        <div className="gray f11">
          {this.props.link.votes.length} votes | by{" "}
          {this.props.link.postedBy ? this.props.link.postedBy.name : "Unknown"}{" "}
          {timeDifferenceForDate(this.props.link.createdAt)}
        </div>
      </div>
    )
  }
  _voteForLink = async () => {
    const linkId = this.props.link.id
    await this.props.voteMutation({
      variables: {
        linkId
      },
      update: (store, { data: { vote } }) => {
        this.props.updateStoreAfterVote(store, vote, linkId)
      }
    })
  }
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export default graphql(VOTE_MUTATION, {
  name: "voteMutation"
})(Link)
