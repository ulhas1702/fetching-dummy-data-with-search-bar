import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      isDataLoaded: false,
      searchQuery: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        this.setState({ data, filteredData: data, isDataLoaded: true });
      })
      .catch(error => {
        console.error(error);
      });
  }

  Search = event => {
    const searchQuery = event.target.value;
    const { data } = this.state;

    const filteredData = data.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    this.setState({ searchQuery, filteredData });
  };

  render() {
    return (
      <div>
        <input
          type="text" placeholder="Search"
          value={this.state.searchQuery}
          onChange={this.Search}
        />
        <div>
          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
              </tr>
            </thead>
            <tbody>
              {this.state.isDataLoaded &&
                this.state.filteredData.map(item => (
                  <tr key={item.id}>
                    <td>{item.userId}</td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Button;
