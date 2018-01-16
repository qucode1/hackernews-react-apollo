## Problems in howtographql react-apollo Tutorial:


### Problem 1 (fixed)
<details><summary>Problem 1: graphcool deployment err (fixed)</summary>

![Network Error](https://image.ibb.co/efUhE6/Playground_Network_Error.png)

So I tried this (/hackernews-react-apollo/server):

- graphcool-framework deploy 
    - shared-eu-west-1 

And got this error:

`local  ▸    Could not find graphcool.yml`

- cd database/
- graphcool-framework deploy 
    - shared-eu-west-1 

Back to the validation Error without any error message:

`[ERROR] in /home/yannick/Projects/hackernews-react-apollo/server/database/graphcool.yml: Errors while validating graphcool.yml:`

At this point I noticed, that the graphcool.yml file looks like the ones of v1 so changed my version with:

- npm install -g graphcool@next

That still gives me the same graphcool.yml validation error but now I actually get an error message:

` ▸      data should NOT have additional properties`

Well, I don't see any data object in the graphcool.yml...

### Another approach:

Download the permissions example of v1.0 from the graphcool github repo (Wrong Link - should be raphcool-master/examples/1.0/permissions)

- curl https://codeload.github.com/graphcool/graphcool/tar.gz/master | tar -xz --strip=2 graphcool-master/examples/permissions
- cd 1.0/permissions/
- yarn
- yarn graphcool deploy

Yet another error (it's trying to deploy locally for some reason and does not give me a choice)

`yannick@yannick-desktop:~/Projects/1.0/permissions$ yarn graphcool deploy`

`$ /home/yannick/Projects/1.0/permissions/node_modules/.bin/graphcool deploy`

`Booting local development cluster !`

` ▸    Creating network "localdatabase_graphcool" with driver "bridge"`

` ▸    could not find an available, non-overlapping IPv4 address pool among the defaults to assign to the network`

</details>
<details><summary>Solution 1: remove cluster from graphcool.yml</summary>

### Solution 1: 

- remove `cluster: local` from graphcool.yml
- install graphcool 1.0 with `npm install -g graphcool@beta`

</details>

### Problem 2 (fixed):
<details><summary>Problem 2: invalid token (fixed)</summary>


- added the graphcool endpoint as httpLink uri in index.js
- added Link & LinkList Components

`GraphQL error: Your token is invalid. It might have expired or you might be using a token from a different project.`

</details>
<details><summary>Solution 2: change endpoint in index.js on server</summary>

### Solution 2:

- change endpoint in index.js on the server to hosted graphcool url 
- change httpLink uri in app index.js back to "http://localhost:4000"

</details>

### Problem 3 (fixed):
<details><summary>Problem 3: authentication err on post submission (fixed)</summary>


- added CreateLink Comp
- getting an 'not authenticated error' when trying to add a new Link (app & playground)

</details>
<details><summary>Solution 3: add authentication/ remove token verification on server, pass token in Login.js</summary>

### Solution 3:

- Continue until Auth Chapter
- then after login the error changes to

`JsonWebTokenError: jwt malformed`

- in Login.js user.id was passed to _saveUserData as the first arg instead of token

</details>

### Problem 4 (WIP):
<details><summary>Problem 4: store updates not working, feed not found on ROOT_QUERY</summary>


- store update query is not working, after completing ch.6
- voting for a post or submitting a post will result in the following error:

    `Error: Can't find field feed({}) on object (ROOT_QUERY) {`
    `  "feed({\"first\":null,\"skip\":null,\"orderBy\":null})": {`
    `    "type": "id",`
    `    "id": "$ROOT_QUERY.feed({\"first\":null,\"skip\":null,\"orderBy\":null})",`
    `    "generated": true`
    `  }`
    `}.`

- conneted to this issue? https://github.com/apollographql/apollo-client/issues/2051

</details>
<details><summary>Solution 4: ...</summary>

### Solution 4:

- add initial values to query variables to prevent NULL and thus the error according to the github issue

</details>

### Problem 5 (fixed):
<details><summary>Problem 5 (fixed): compilation error - subscriptions-transport-ws</summary>


- chapter 8: compilation error

    `./node_modules/apollo-link-ws/lib/webSocketLink.js`
    `Module not found: Can't resolve 'subscriptions-transport-ws' in '/home/yannick/Projects/hackernews-react-apollo/node_modules/apollo-link-ws/lib'`

</details>
<details><summary>Solution 5: intall subscriptions-transport-ws seperately and change wsLink</summary>

### Solution 5:

- https://www.apollographql.com/docs/link/links/ws.html
- yarn add subscriptions-transport-ws
- index.js: 
    - import { SubscriptionClient } from "subscriptions-transport-ws"
    - change wsLink from:
    ```javascript
    const wsLink = new WebSocketLink({
        uri: `ws://localhost:4000`,
        options: {
            reconnect: true,
            connectionParams: {
            authToken: localStorage.getItem(GC_AUTH_TOKEN),
            }
        }
    })
    ```
    - to:
    ```javascript
    const subClient = new SubscriptionClient("ws://localhost:4000", {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN)
        }
    })

    const wsLink = new WebSocketLink(subClient)
    ```

</details>

### Problem 6: 
<details><summary>Problem 6: SyntaxError on server, unexpected token in JSON</summary> 


- every once in a while there is a SyntaxError on the server, even the playground will give the same error then on the default FeedQuery
- possibly connected to problem 4, seems to be more frequent after getting that error
- weirdly seems to fix itself after a certan amount of time

    ```javascript
    [Network error]: SyntaxError: Unexpected token < in JSON at position 0
    Error: Unexpected token < in JSON at position 0
        at Object.checkResultAndHandleErrors (/home/yannick/Projects/hackernews-react-apollo/server/node_modules/graphql-tools/dist/stitching/errors.js:69:36)
        at Object.<anonymous> (/home/yannick/Projects/hackernews-react-apollo/server/node_modules/graphql-tools/dist/stitching/delegateToSchema.js:92:52)
        at step (/home/yannick/Projects/hackernews-react-apollo/server/node_modules/graphql-tools/dist/stitching/delegateToSchema.js:40:23)
        at Object.next (/home/yannick/Projects/hackernews-react-apollo/server/node_modules/graphql-tools/dist/stitching/delegateToSchema.js:21:53)
        at fulfilled (/home/yannick/Projects/hackernews-react-apollo/server/node_modules/graphql-tools/dist/stitching/delegateToSchema.js:12:58)
        at <anonymous>
        at process._tickCallback (internal/process/next_tick.js:160:7)

    ```

</details>
<details><summary>Solution 6: ...</summary>

### Solution 6:

</details>

### Problem 7: 
<details><summary>Problem 7: Subscriptions not working</summary>

- there is a websocket connection in the devtools' network tab

</details>
<details><summary>Solution 7: ...</summary>
</details>

### Typos:

- Chapter Mutations: awrite the mutation as a JSava riptconstant using the gql parser functiont the start:

    `write the mutation as a JSava riptconstant using the gql parser function`

### Additonal Notes:

- quiz at authentication chapter wrong answer?
- chapter 6: code for Link.js is all kinds of broken, it should be similar to this:
```javascript
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
```
- better error handling (e.g. already voted for a link or simply do not disply vote btn)
- 'new link resolver' server console.log whenever the LinkList is loaded (even when logged in) which leads to:

```javascript
(node:27807) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 remote-schema-link listeners added. Use emitter.setMaxListeners() to increase limit
```

- chapter 8: vote Subscription updateQuery broken? looking for votedLinkIndex, but not doing anyhing with it. No update with new newVote.