import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
const url = "http://localhost:3000/item/";

class ShoppingList extends Component {
  state = {
    items: [],
    error: null,
  };

  buildData = (response) => {
    this.setState({ items: response });
  };

  componentDidMount() {
    console.log("Shopping List - Mount");
    fetch(url)
      .then((response) => response.json())
      .then(this.buildData)
      .catch((error) => this.setState({ error }));
  }
  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => this.handleInsertItem()}
        >
          Add Item
        </Button>
        <ListGroup>
          {items.length === 0 && <li> Sorry No Data Available!</li>}
          {items.length > 0 &&
            items.map(({ _id, name }) => (
              <ListGroupItem key={_id}>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => this.handleDelete(_id)}
                >
                  Remove
                </Button>
                {name}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Container>
    );
  }

  handleDelete = (id) => {
    console.log("delete is clicked", id);
    let deleteUrl = url + id;
    fetch(deleteUrl, {
      method: "Delete",
    })
      .then((response) => response.json())
      .then(({ success }) => {
        if (success) {
          const items = this.state.items.filter((item) => item._id !== id);
          this.setState({ items });
        }
      });
  };

  handleInsertItem = () => {
    const name = prompt("Enter Item");
    if (name) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      })
        .then((response) => response.json())
        .then((item) => {
          this.setState((state) => ({
            items: [...state.items, item],
          }));
        });
    }
  };
}

export default ShoppingList;
