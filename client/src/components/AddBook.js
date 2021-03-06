import React from 'react'
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries'

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }

    this.displayAuthors = this.displayAuthors.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault()
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery
    if(data.loading) {
      return (<option disabled>Loading authors...</option>)
    } else {
      return data.authors.map(author => {
        return(<option key={author.id} value={author.id}>{author.name}</option>)
      })
    }
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={
              (e) => this.setState({name: e.target.value})
            }
        />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={
              (e) => this.setState({genre: e.target.value})
            }
        />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={
            (e) => this.setState({authorId: e.target.value})
          }>
            <option>--Select Author--</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
