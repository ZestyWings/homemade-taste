import React, { useState, Fragment } from "react";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import "./MenuList.css";
import { gql } from "@apollo/client";
import { ME } from "../util/queries";

const App = () => {
  const { data } = gql(ME);
  const [dishes, setDishes] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullDish: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullDish: "",
  });

  const [editDishId, setEditDishId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldDish = event.target.getAttribute("Dish");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldDish] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldDish = event.target.getAttribute("Dish");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldDish] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDish = {
      fullDish: addFormData.fullDish,
    };

    const newDishes = [...dishes, newDish];
    setDishes(newDishes);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDish = {
      id: editDishId,
      fullDish: editFormData.fullDish,
    };

    const newDishes = [...dishes];

    const index = dishes.findIndex((dish) => dish.id === editDishId);

    newDishes[index] = editedDish;

    setDishes(newDishes);
    setEditDishId(null);
  };

  const handleEditClick = (event, dish) => {
    event.preventDefault();
    setEditDishId(dish.id);

    const formValues = {
      fullDish: dish.fullName,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDishId(null);
  };

  const handleDeleteClick = (dishId) => {
    const newDishes = [...dishes];

    const index = dishes.findIndex((dish) => dish.id === dishId);

    newDishes.splice(index, 1);

    setDishes(newDishes);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>dish</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <Fragment>
                {editDishId === dish.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    dish={dish}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Dish</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullDish"
          required="required"
          placeholder="Enter a dish..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
