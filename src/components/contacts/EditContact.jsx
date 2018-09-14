import React, { Component } from "react";
import { Consumer } from "../Context";
import axios from "axios";
import TextInputGroup from "../layout/TextInputGroup";
class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // check errros
    if (name === "") {
      this.setState({
        errors: {
          name: "The name is required"
        }
      });
      return;
    }

    if (email === "") {
      this.setState({
        errors: {
          email: "The email is required"
        }
      });
      return;
    }

    if (phone === "") {
      this.setState({
        errors: {
          phone: "The phone is required"
        }
      });
      return;
    }
    const { id } = this.props.match.params;
    const upContact = {
      name,
      email,
      phone
    };
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, upContact);
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: ""
    });
    this.props.history.push("/");
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    className="form-control form-control-bg"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={this.onChange}
                    errors={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    className="form-control form-control-bg"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={this.onChange}
                    errors={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    className="form-control form-control-bg"
                    placeholder="Enter Phone..."
                    value={phone}
                    onChange={this.onChange}
                    errors={errors.phone}
                  />
                  <input type="submit" className="btn btn-primary btn-block" value="EDIT Contact" />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
