# title

https://www.howtographql.com/react-apollo/1-getting-started/

```js
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;

          const linksToRender = data.feed.links;

          return (
            <div>
              {linksToRender.map(link => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
```

## 突变：创建链接

- 使用解析器函数将变异写为 JavaScript 常量 gql
- 使用传递 GraphQL 变异的<Mutation />组件和变量（如果需要）作为道具
- 使用注入组件的变异函数 render prop function

```js
import { Mutation } from "react-apollo";
import React, { Component } from "react";
import gql from "graphql-tag";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };

  render() {
    const { description, url } = this.state;
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ description, url }}
          onCompleted={() => this.props.history.push("/")}
        >
          {postMutation => <button onClick={postMutation}>Submit</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateLink;
```

## 路由

```js
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
```

## 认证

```js
const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

<div className="flex mt3">
  <Mutation
    mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
    variables={{ email, password, name }}
    onCompleted={data => this._confirm(data)}
  >
    {mutation => (
      <div className="pointer mr2 button" onClick={mutation}>
        {login ? 'login' : 'create account'}
      </div>
    )}
  </Mutation>
  <div
    className="pointer button"
    onClick={() => this.setState({ login: !login })}
  >
    {login ? 'need to create an account?' : 'already have an account?'}
  </div>
</div>
```

### 使用身份验证令牌配置 Apollo

yarn add apollo-link-context

index.js

```js
import { setContext } from "apollo-link-context";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
```

```js
function timeDifference(current, previous) {
  const milliSecondsPerMinute = 60 * 1000;
  const milliSecondsPerHour = milliSecondsPerMinute * 60;
  const milliSecondsPerDay = milliSecondsPerHour * 24;
  const milliSecondsPerMonth = milliSecondsPerDay * 30;
  const milliSecondsPerYear = milliSecondsPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return "just now";
  }

  if (elapsed < milliSecondsPerMinute) {
    return "less than 1 min ago";
  } else if (elapsed < milliSecondsPerHour) {
    return Math.round(elapsed / milliSecondsPerMinute) + " min ago";
  } else if (elapsed < milliSecondsPerDay) {
    return Math.round(elapsed / milliSecondsPerHour) + " h ago";
  } else if (elapsed < milliSecondsPerMonth) {
    return Math.round(elapsed / milliSecondsPerDay) + " days ago";
  } else if (elapsed < milliSecondsPerYear) {
    return Math.round(elapsed / milliSecondsPerMonth) + " mo ago";
  } else {
    return Math.round(elapsed / milliSecondsPerYear) + " years ago";
  }
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  const updated = new Date(date).getTime();
  return timeDifference(now, updated);
}
```

```js
<Mutation
  mutation={VOTE_MUTATION}
  variables={{ linkId: this.props.link.id }}
  update={(store, { data: { vote } }) =>
    this.props.updateStoreAfterVote(store, vote, this.props.link.id)
  }
>
  {voteMutation => (
    <div className="ml1 gray f11" onClick={voteMutation}>
      ▲
    </div>
  )}
</Mutation>

_updateCacheAfterVote = (store, createVote, linkId) => {
  const data = store.readQuery({ query: FEED_QUERY })

  const votedLink = data.feed.links.find(link => link.id === linkId)
  votedLink.votes = createVote.link.votes

  store.writeQuery({ query: FEED_QUERY, data })
}

<Link
  key={link.id}
  link={link}
  index={index}
  updateStoreAfterVote={this._updateCacheAfterVote}
/>
```
