import React, { useState } from 'react';
import './Table.css';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Like</th>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
        <th>Edit</th>
        <th>Dislike</th>
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
  const [likeCounts, setLikeCounts] = useState({});

  const handleUpdate = (id, updatedLink) => {
    updateLink(id, updatedLink);
    setEditData({ id: null, name: '', url: '' });
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

  const handleLike = (id) => {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const handleDislike = (id) => {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) - 1,
    }));
  };

  const rows = filteredData.map((row, index) => {
    const { id, name, url } = editData;
    const isEditing = id === row.id;
    const likeCount = likeCounts[row.id] || 0;

    return (
      <tr key={index}>
        <td>
          <button className="like-button" onClick={() => handleLike(row.id)}>
            Like ({likeCount})
          </button>
        </td>
        <td className={isEditing ? 'editing' : ''}>
          {isEditing ? (
            <input type="text" name="name" value={name} onChange={handleInputChange} />
          ) : (
            row.name
          )}
        </td>
        <td className={isEditing ? 'editing' : ''}>
          {isEditing ? (
            <input type="text" name="url" value={url} onChange={handleInputChange} />
          ) : (
            <a href={row.url}>{row.url}</a>
          )}
        </td>
        <td>
          <button className="remove-button" onClick={() => removeLink(row.id)}>
            Delete
          </button>
        </td>
        <td>
          {isEditing ? (
            <button className="save-button" onClick={() => handleUpdate(row.id, { name, url })}>
              Save
            </button>
          ) : (
            <button className="edit-button" onClick={() => handleEdit(row.id, row.name, row.url)}>
              Edit
            </button>
          )}
        </td>
        <td>
          <button className="dislike-button" onClick={() => handleDislike(row.id)}>
            Dislike
          </button>
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
    <div className="table-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name or URL"
        className="search-input"
      />
      <table className="table">
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
