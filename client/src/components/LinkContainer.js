import React, { useState, useEffect } from 'react'
import Table from './Table';
import Form from './Form'

const LinkContainer = (props) => {
  const [favLinks, setFavLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => { 
    const data = await fetch('/links')
    const json = await data.json()
    setFavLinks(json)
    }
    getLinks()
    .catch(console.err)
  }, [favLinks])

  const handleRemove = async (id) => {
    await fetch(`/links/${id}`, 
    { method: 'DELETE' })  
  }

  const handleSubmit = async (form) => {
    await fetch(`/links`, { method: 'POST', 
    headers: {
       'Content-Type': 'application/json' },body: 
       JSON.stringify({name:form.name,url:form.url})})
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new url with a name and link to the table.</p>
      <Table linkData={favLinks} removeLink={handleRemove} />
      <br />
      <h3>Add New</h3>
      <Form handleSubmit={handleSubmit} />
    </div>
  );
};

export default LinkContainer;