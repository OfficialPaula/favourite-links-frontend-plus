import React, { useState } from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
        <th>Edit</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const { linkData, searchTerm, removeLink, updateLink } = props;

  let data = linkData ? linkData : [];
  const filteredData = data.filter((link) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseName = link.name.toLowerCase();
    const lowerCaseURL = link.url.toLowerCase();
    return lowerCaseName.includes(lowerCaseSearchTerm) || lowerCaseURL.includes(lowerCaseSearchTerm);
  });

  const [editData, setEditData] = useState({ id: null, name: '', url: '' });

  const handleUpdate = (id, updatedLink) => {
    // Call the updateLink prop function
    updateLink(id, updatedLink);
    setEditData({ id: null, name: '', url: '' }); // Reset the edit state after updating
  };

  const handleEdit = (id, name, url) => {
    setEditData({ id, name, url });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevEditData) => ({
      ...prevEditData,
      [name]: value,
    }));
  };

  const rows = filteredData.map((row, index) => {
    const { id, name, url } = editData;
    const isEditing = id === row.id;

    return (
      <tr key={index}>
        <td>{isEditing ? <input type="text" name="name" value={name} onChange={handleInputChange} /> : row.name}</td>
        <td>{isEditing ? <input type="text" name="url" value={url} onChange={handleInputChange} /> : <a href={row.url}>{row.url}</a>}</td>
        <td>
          <button onClick={() => removeLink(row.id)}>Delete</button>
        </td>
        <td>
          {isEditing ? (
            <button onClick={() => handleUpdate(row.id, { name, url })}>Save</button>
          ) : (
            <button onClick={() => handleEdit(row.id, row.name, row.url)}>Edit</button>
          )}
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        value={searchTerm} 
        onChange={handleSearchChange} 
        placeholder="Search by name or URL" 
      />
      <table>
        <TableHeader />
        <TableBody 
          linkData={props.linkData} 
          removeLink={props.removeLink} 
          updateLink={props.updateLink} 
          searchTerm={searchTerm} 
        />
      </table>
    </div>
  );
};

export default Table;
