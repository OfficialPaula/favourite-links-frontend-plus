import React, { useState } from 'react';

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
    <form onSubmit={submitForm}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
      <br />
      <label htmlFor="url">URL:</label>
      <input type="text" id="url" name="url" value={formData.url} onChange={handleChange} />
      <br />
      <button type="submit" onClick={submitForm}>Submit</button>
    </form>
  );
};

export default Form;

