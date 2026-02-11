import React, { useState } from "react";

import "./Form.css";
import type { Product } from "../Product";

interface FormProps {
  addRow: (product: Product) => any;
}

const defaultState = {
  description: "",
  price: "",
  weight: "",
  serving: "100",
  calories: "",
  protein: "",
};

export const Form = ({ addRow }: FormProps) => {
  const [formState, setFormState] = useState(defaultState);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      description: e.target.value
    });
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      price: e.target.value
    });
  }

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      weight: e.target.value
    });
  }

  const handleServingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      serving: e.target.value
    });
  }

  const handleCaloriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      calories: e.target.value
    });
  }

  const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      protein: e.target.value
    });
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRow: Product = {
      description: formState.description,
      price: Number(formState.price),
      weight: Number(formState.weight),
      serving: Number(formState.serving),
      kcal: Number(formState.calories),
      protein: Number(formState.protein)
    };
    addRow(newRow);
    setFormState(defaultState);
    e.currentTarget.reset();
  }

  return <>
    <form className="protein-form"
      onSubmit={handleSubmit}
    >
      {/* Disables auto submit */}
      <button type="submit" disabled style={{ display: "none" }} aria-hidden="true"></button>

      <div className="form-grid">
        <h3 className="form-column-span">Product</h3>
        <label htmlFor='description'>Description</label>
        <input
          id='description'
          value={formState.description}
          onChange={handleDescriptionChange}
          required
          style={{ width: "250px" }} />
        <label htmlFor='price' >Price</label>
        <input
          id='price'
          value={formState.price}
          onChange={handlePriceChange}
          required
          inputMode="numeric"
          type="number"
          step="0.01"
          min="0"
          style={{ width: "75px" }} />
        <label htmlFor='weight'>Weight (g)</label>
        <input
          id='weight'
          value={formState.weight}
          onChange={handleWeightChange}
          required
          inputMode="numeric"
          type="number"
          step="0.01"
          min="0"
          style={{ width: "75px" }} />
      </div>
      <div className="form-grid">
        <h3 className="form-column-span">Nutrition</h3>
        <label htmlFor='serving'>Serving size (g)</label>
        <input
          id='serving'
          value={formState.serving}
          onChange={handleServingChange}
          required
          inputMode="numeric"
          type="number"
          step="0.01"
          min="1"
          style={{ width: "75px" }}
        />
        <label htmlFor='calories'>Calories</label>
        <input
          id="calories"
          value={formState.calories}
          onChange={handleCaloriesChange}
          required
          inputMode="numeric"
          type="number"
          step="0.01"
          style={{ width: "75px" }}
        />
        <label htmlFor='protein'>Protein (g)</label>
        <input
          id="protein"
          value={formState.protein}
          onChange={handleProteinChange}
          required
          inputMode="numeric"
          type="number"
          step="0.01"
          style={{ width: "75px" }}

        ></input>
      </div>
      <div className="form-column-span">
        <button className="btn" type='submit'>Add</button>
      </div>
    </form>
  </>
}