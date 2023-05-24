import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import './LinkContainer.css';

const LinkContainer = (props) => {
  const [favLinks, setFavLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const data = await fetch('/links');
        const json = await data.json();
        setFavLinks(json);
      } catch (error) {
        console.error(error);
      }
    };

    getLinks();
  }, []);

  const handleRemove = async (id) => {
    try {
      await fetch(`/links/${id}`, {
        method: 'DELETE',
      });

      setFavLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, updatedLink) => {
    try {
      await fetch(`/links/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLink),
      });

      setFavLinks((prevLinks) =>
        prevLinks.map((link) => (link.id === id ? { ...link, ...updatedLink } : link))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (form) => {
    try {
      await fetch('/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: form.name, url: form.url }),
      });

      setFavLinks((prevLinks) => [...prevLinks, { name: form.name, url: form.url }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="link-container">
      <h1 className="link-container__title">My Favorite Links</h1>
      <p className="link-container__subtitle">
        Add a new URL with a name and link to the table.
      </p>
      <Table linkData={favLinks} removeLink={handleRemove} updateLink={handleUpdate} />
      <br />
      <h3 className="link-container__form-title">Add New</h3>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
};

export default LinkContainer;