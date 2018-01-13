import React, { Component } from "react"
import Link from "./Link"

class LinkList extends Component {
  render() {
    const linksToRender = [
      {
        id: "1",
        description: "The coolest GraphQL backend 😎",
        url: "https://www.graph.cool"
      },
      {
        id: "2",
        description: "The best GraphQL Client",
        url: "http://dev.apollodata.com/"
      }
    ]

    return (
      <div>{linksToRender.map(link => <Link key={link.id} link={link} />)}</div>
    )
  }
}

export default LinkList
