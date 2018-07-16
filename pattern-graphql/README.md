## Use Apollo with Enact and GitHub GraphqQL API

A sample application that demonstrates how to use GraphqQL with Enact components. It uses [Apollo Client](https://github.com/apollographql/apollo-client), (GraphqQL client.)

Run `npm install` then `npm run serve` to have the app running on [http://localhost:8080](http://localhost:8080), where you can view it in your browser.

#### Enact Components Used
- `moonstone/Panels/ActivityPanels`
- `moonstone/Panels/Panel`
- `moonstone/Panels/Header`
- `moonstone/Button`
- `moonstone/VirtualList`
- `moonstone/Item`
- `moonstone/Divider`
- `moonstone/Image`
- `moonstone/Input`
- `ui/Layout/Column`
- `ui/Layout/Cell`
- `ui/resolution/scale`

## Setup and use
1. Get a personal access token for the [GitHub API](https://github.com/settings/tokens/new).
  - Assign a name to the token and select the "read:org" scope.
2. Replace the dummy token in [src/config.json](src/config.json) with the token generated above.
3. Install npm modules.

```bash
npm install
```
4. Serve.

```bash
npm run serve
```

5. Open [localhost](http://localhost:8080/).
6. Search for a GitHub id, selecting which information you wish to retrieve.


### How Apollo is used.

In **App.js**, a new `ApolloClient` is created with GitHub URI and request setup:

[src/App/App.js]
```javascript
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	request: operation => {
		operation.setContext({
			headers: {
				authorization: `Bearer ${config.token}`
			}
		});
	}
});
```

Next, the `client` prop is passed to the `ApolloProvider` component, which wraps the components that need the queried data:
[src/App/App.js](src/App/App.js)
```javascript
import { ApolloProvider } from "react-apollo";

<ApolloProvider client={client}>
  ...
</ApolloProvider>
```

Finally, a GraphQL query (`GET_USER`) is created using `gql` and is passed as the `query` prop to the `Query` component:

[src/views/Detail.js](src/views/Detail.js)
```javascript
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_USER = gql`
  query($login: String!) {
    user(login: $login) {
      name
      avatarUrl
      organizations(first: 10) {
        nodes {
          name
        }
      }
      repositories(first: 10) {
        nodes {
          name
          url
        }
      }
      followers(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;

<Query query={GET_USER} variables={{login: userId}}>
  {({loading, data}) => {
    ...
  }}
</Query>
```
