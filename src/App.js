import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Highlighter from "react-highlight-words";

class App extends Component {
  state = {
    users: [],
    searchInput: "",
    flag: false
  };

  updateSearch(event) {
    console.log(`updateSearch value`);
    this.setState({ searchInput: event.target.value.substr(0, 20), flag: false }) ;
  }

  triggerSearch(event) {
    console.log(`triggerSearch value ${event.target.value}`);
    this.setState({ searchInput: this.state.searchInput.substr(0, 20), flag: true }) ;
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
    let {searchInput} = this.state;
    let filtereduserList;
    if(this.state.flag) {
        console.log('there');
        console.log(`there value ${this.state.flag}`);
        filtereduserList = this.state.users.filter(user => {
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
    } else {
        console.log('here');
        console.log(`here value ${this.state.flag}`);
        filtereduserList = this.state.users;
    }

console.log(filtereduserList)
    const userList = filtereduserList.map(user => {
      return (
        <tr key={user.id}>
          <td  className="border px-4 py-2">
            {user.id}
          </td>
          <td  className="border px-4 py-2">
              <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[this.state.searchInput]}
                  autoEscape={true}
                  textToHighlight= {user.name}
              />
          </td>
          <td  className="border px-4 py-2">
              <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[this.state.searchInput]}
                  autoEscape={false}
                  textToHighlight= {user.email}
              />
          </td>
          <td  className="border px-4 py-2">
              <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[this.state.searchInput]}
                  autoEscape={true}
                  textToHighlight= {user.city}
              />
          </td>
          <td  className="border px-4 py-2">
              <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[this.state.searchInput]}
                  autoEscape={true}
                  textToHighlight= {user.name}
              />
          </td>
          <td  className="border px-4 py-2">
              <Highlighter
                  highlightClassName="YourHighlightClass"
                  searchWords={[this.state.searchInput]}
                  autoEscape={true}
                  textToHighlight= {user.phone}
              />
          </td>
        </tr>
      );
    });

    return (
      <div className="container mx-auto">
        <div className="">
        <form onSubmit={this.handleSubmit} className=" bg-gray-200 shadow px-8 py-2 m-8">
            <div className="input-group col-lg-12">
                <label className="col-lg-4 text-right mt-2">Global Search</label>
                <input  type="text" className="form-control searchInput col-lg-4" placeholder="Search ..." value={this.state.search}  onChange={evt => this.updateSearch(evt)}/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button" onClick={evt => this.triggerSearch(evt)}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
            </div>
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
