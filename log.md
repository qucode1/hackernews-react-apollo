## Steps in Tutorial:

### Frontend

- create-react-app hackernews-react-apollo
    - cd hackernews-react-apollo
    - some styling stuff
- yarn add apollo-client-preset react-apollo graphql-tag graphql
- configuration of ApolloClient

### Backend

- curl https://codeload.github.com/howtographql/graphql-js/tar.gz/master | tar -xz graphql-js-master
- mv graphql-js-master server
- cd server
- yarn install
- yarn start
- create Link elements in Graphcool database

### Problem: 

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
