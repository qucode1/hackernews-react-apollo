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

