import React from "react"
import ReactDOM from "react-dom"
import { HttpLink } from "apollo-link-http"
import { ApolloClient } from "apollo-client"
import { ApolloProvider } from "react-apollo"
import { WebSocketLink } from "apollo-link-ws"
import { BrowserRouter } from "react-router-dom"
import { getMainDefinition } from "apollo-utilities"
import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloLink, split } from "apollo-client-preset"

import "./styles/index.css"
import registerServiceWorker from "./registerServiceWorker"
import { AUTH_TOKEN } from "./constants"

import App from "./components/App"

const httpLink = new HttpLink({
  uri: "http://localhost:4000"
})

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

// const subClient = new SubscriptionClient("ws://localhost:4000", {
//   reconnect: true,
//   connectionParams: {
//     authToken: localStorage.getItem(AUTH_TOKEN)
//   }
// })

// const wsLink = new WebSocketLink(subClient)

// const link = split(
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === "OperationDefinition" && operation === "subscription"
//   },
//   wsLink,
//   httpLinkWithAuthToken
// )

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache()
// })

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN)
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === "OperationDefinition" && operation === "subscription"
  },
  wsLink,
  httpLinkWithAuthToken
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
registerServiceWorker()
