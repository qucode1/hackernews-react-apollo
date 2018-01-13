import React, { Component } from "react"
import Link from "./Link"
import { graphql } from "react-apollo"
import gql from "graphql-tag"

class LinkList extends Component {
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading...</div>
    }
    if (this.props.feedQuery && this.props.feedQuery.error) {
      console.log(this.props.feedQuery.error.message)
      return <div>Error</div>
    }

    const linksToRender = this.props.feedQuery.feed.links
    //   {
    //     id: "1",
    //     description: "The coolest GraphQL backend 😎",
    //     url: "https://www.graph.cool"
    //   },
    //   {
    //     id: "2",
    //     description: "The best GraphQL Client",
    //     url: "http://dev.apollodata.com/"
    //   }

    return (
      <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
    )
  }
}

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`

export default graphql(FEED_QUERY, { name: "feedQuery" })(LinkList)
