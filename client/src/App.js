import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// conponents
import BookList from './components/BookList'
import AddBook from './components/AddBook'

// apollo client setup
const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql'
})

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
