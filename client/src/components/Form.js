import React, { useState } from 'react';
import './Form.css';

const Form = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({ name: '', url: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    setFormData({ name: '', url: '' });
  };

  return (
    <form className="form-container" onSubmit={submitForm}>
      <label htmlFor="name" className="form-container__label">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="form-container__input"
      />
      <br />
      <label htmlFor="url" className="form-container__label">URL:</label>
      <input
        type="text"
        id="url"
        name="url"
        value={formData.url}
        onChange={handleChange}
        className="form-container__input"
      />
      <br />
      <button type="submit" className="form-container__button" onClick={submitForm}>
        Submit
      </button>
    </form>
  );
};

export default Form;
