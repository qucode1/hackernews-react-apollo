import React, { Component } from "react"
import Link from "./Link"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

class LinkList extends Component {
  componentDidMount() {
    this._subscribeToNewLinks()
    this._subscribeToNewVotes()
  }
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading...</div>
    }
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>{this.props.feedQuery.error.message}</div>
    }

    const linksToRender = this.props.feedQuery.feed.links

    return (
      <div>
        {linksToRender.map((link, index) => (
          <Link
            key={link.id}
            updateStoreAfterVote={this._updateCacheAfterVote}
            index={index}
            link={link}
          />
        ))}
      </div>
    )
  }
  _updateCacheAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({
      query: FEED_QUERY,
      variables: { first: 0, skip: 0, orderBy: "createdAt_ASC" }
    })

    const votedLink = data.feed.links.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    store.writeQuery({ query: FEED_QUERY, data })
  }
  _subscribeToNewLinks = () => {
    this.props.feedQuery.subscribeToMore({
      document: gql`
        subscription {
          newLink {
            node {
              id
              url
              description
              createdAt
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                }
              }
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllLinks = [
          subscriptionData.data.newLink.node,
          ...previous.feed.links
        ]
        const result = {
          ...previous,
          feed: {
            links: newAllLinks
          }
        }
        return result
      }
    })
  }
  _subscribeToNewVotes = () => {
    this.props.feedQuery.subscribeToMore({
      document: gql`
        subscription {
          newVote {
            node {
              id
              link {
                id
                url
                description
                createdAt
                postedBy {
                  id
                  name
                }
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
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        console.log(`NEW VOTE`)
        const votedLinkIndex = previous.feed.links.findIndex(
          link => link.id === subscriptionData.data.newVote.node.link.id
        )
        previous.feed.links[votedLinkIndex] =
          subscriptionData.data.newVote.node.link
        const result = {
          ...previous
        }
        return result
      }
    })
  }
}

export const FEED_QUERY = gql`
  query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy) {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`

export default graphql(FEED_QUERY, {
  name: "feedQuery",
  options: ownProps => {
    const first = ownProps.first || 0
    const skip = ownProps.skip || 0
    const orderBy = ownProps.orderBy || "createdAt_ASC"
    return {
      variables: { first, skip, orderBy }
    }
  }
})(LinkList)
