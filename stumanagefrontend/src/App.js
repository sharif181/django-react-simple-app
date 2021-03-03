import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      infos: [],
      first_name: "",
      last_name: "",
      phone_no: "",
      age: 0,
      address: "",
      isSubmit: true,
      updateId: null,
      img: null,
    };
  }

  componentDidMount(e) {
    let data;
    axios
      .get("http://localhost:8000/api/")
      .then((res) => {
        data = res.data;
        this.setState({
          infos: data,
        });
      })
      .catch((err) => {});
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFile = (e) => {
    this.setState({
      img: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    let form_data = new FormData();
    form_data.append("first_name", this.state.first_name);
    form_data.append("last_name", this.state.last_name);
    form_data.append("phone_no", this.state.phone_no);
    form_data.append("age", this.state.age);
    form_data.append("address", this.state.address);
    form_data.append("img", this.state.img, this.state.img.name);
    axios
      .post("http://localhost:8000/api/", form_data)
      .then((res) => {
        this.setState({
          first_name: "",
          last_name: "",
          phone_no: "",
          age: 0,
          address: "",
          img: null,
        });
      })
      .catch((e) => console.log(e));
  };

  handleDelete = (e) => {
    let data;
    axios.delete(`http://localhost:8000/api/${e.target.value}`).then(() => {
      axios
        .get("http://localhost:8000/api/")
        .then((res) => {
          data = res.data;
          this.setState({
            infos: data,
          });
        })
        .catch((err) => {});
    });
  };

  handlesearch = (e) => {
    let data;
    axios
      .get("http://localhost:8000/api/")
      .then((res) => {
        data = res.data;

        var data1 = data.filter(function (hero) {
          return hero.first_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
        console.log(data1);

        this.setState({
          infos: data1,
        });
      })
      .catch((err) => {});
  };

  handleUpdate = (e) => {
    let data;
    axios.get(`http://localhost:8000/api/${e.target.value}`).then((res) => {
      data = res.data;
      this.setState({
        first_name: data.first_name,
        last_name: data.last_name,
        phone_no: data.phone_no,
        age: data.age,
        address: data.address,
        updateId: e.target.value,
      });
    });
    this.setState({
      isSubmit: false,
    });
  };

  handleUpdated = (e) => {
    axios
      .put(`http://localhost:8000/api/${this.state.updateId}`, {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_no: this.state.phone_no,
        age: this.state.age,
        address: this.state.address,
      })
      .then((res) => {
        console.log("success");
      });
  };

  render() {
    const isSubmit = this.state.isSubmit;
    let button;
    let fun = this.handleSubmit;
    if (isSubmit) {
      button = (
        <button type="submit" className="btn btn-primary form-control">
          Submit
        </button>
      );
    } else {
      button = (
        <button type="submit" className="btn btn-secondary form-control">
          Update
        </button>
      );
      fun = this.handleUpdated;
    }
    return (
      <div>
        <div className="container">
          <h1 className="h1 text-danger">Student Information management</h1>
          <form onSubmit={fun}>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter first name"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInput}
              />

              <label>Last Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter last name"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInput}
              />

              <label>Phone no</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Phone no"
                name="phone_no"
                value={this.state.phone_no}
                onChange={this.handleInput}
              />

              <label>Age</label>
              <input
                className="form-control"
                type="number"
                placeholder="Enter age"
                name="age"
                value={this.state.age}
                onChange={this.handleInput}
              />

              <label>Address</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Address"
                name="address"
                value={this.state.address}
                onChange={this.handleInput}
              />

              <label>Image</label>
              <input
                className="custom-file"
                accept="image/png, image/jpg"
                type="file"
                onChange={this.handleFile}
                name="img"
              />
              {button}
            </div>
          </form>
        </div>
        <br /> <hr />
        <div className="container">
          <form>
            <input
              className="form-control"
              placeholder="Search by First Name"
              onChange={this.handlesearch}
            />
          </form>
        </div>
        <div className="container">
          <h2 className="h2 text-secondary"> Students info: </h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th> Frist name</th>
                <th> Last name</th>
                <th> Phone No</th>
                <th> Age </th>
                <th> Address </th>
                <th> Image </th>
                <th></th>
              </tr>
            </thead>

            {this.state.infos.map((info) => (
              <tbody key={info.id}>
                <tr>
                  <td> {info.first_name} </td>
                  <td> {info.last_name} </td>
                  <td> {info.phone_no} </td>
                  <td> {info.age} </td>
                  <td> {info.address} </td>
                  <td>
                    {" "}
                    <img
                      src={`http://localhost:8000${info.img}`}
                      className="img-circle"
                      alt="Not available"
                      width="75"
                      height="75"
                    />{" "}
                  </td>
                  <td data-value={info.id}>
                    <button
                      className="btn btn-secondary mr-2"
                      value={info.id}
                      onClick={this.handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      type="reset"
                      value={info.id}
                      onClick={this.handleDelete}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
