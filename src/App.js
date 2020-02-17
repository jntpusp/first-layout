import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    searchInput: ""
  };

  updateSearch(event) {
    this.setState({ searchInput: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let {searchInput} = this.state   
    let filtereduserList = this.state.users.filter(user => {
      return (
        user.id.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        user.name.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        user.address.city.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        user.company.name.toString().toLowerCase().includes(searchInput.toLowerCase()) ||
        user.phone
        .toString()
        .toLowerCase()
        .includes(searchInput.toLowerCase())
      );
    });
console.log(filtereduserList)
    const userList = filtereduserList.map(user => {
      return (
        <tr key={user.id}>
          <td  className="border px-4 py-2">
            {user.id}
          </td>
          <td  className="border px-4 py-2">
            {user.name}
          </td>
          <td  className="border px-4 py-2">
            {user.email}
          </td>
          <td  className="border px-4 py-2">
            {user.address.city}
          </td>
          <td  className="border px-4 py-2">
            {user.company.name}
          </td>
          <td  className="border px-4 py-2">
            {user.phone}
          </td>
        </tr>
      );
    });

    return (
      <div className="container mx-auto">
        <div className="">
        <form onSubmit={this.handleSubmit} className=" bg-gray-200 shadow px-8 py-2 m-8">
          Global Search
          <input
            id="search"
            // type="text"
            // as="search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
            placeholder=" Search..."
            className = "ml-8 rounded"
          />
        </form>
        </div>
       

        <table className="table-auto" id="user_table">
          <thead>
            <tr>
              <th className="w-1/10 px-4 py-2">Id</th>
              <th className="w-1/6 px-4 py-2">Name</th>
              <th className="w-1/4 px-4 py-2">Email</th>
              <th className="w-1/6 px-4 py-2">City</th>
              <th className="w-1/6 px-4 py-2">Company</th>
              <th className="w-1/4 px-4 py-2">Phone</th>
            </tr>
          </thead>

          <tbody>{userList}</tbody>
        </table>
      </div>
    );
  }
}

export default App;


