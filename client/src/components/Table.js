import React, { useState } from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const { linkData, searchTerm } = props;

  let data = linkData ? linkData : [];
  const filteredData = data.filter((link) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseName = link.name.toLowerCase();
    const lowerCaseURL = link.url.toLowerCase();
    return lowerCaseName.includes(lowerCaseSearchTerm) || lowerCaseURL.includes(lowerCaseSearchTerm);
  });

  const rows = filteredData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>
          <a href={row.url}>{row.url}</a>
        </td>
        <td>
          <button onClick={() => props.removeLink(row.id)}>Delete</button>
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
          searchTerm={searchTerm} 
        />
      </table>
    </div>
  );
};

export default Table;
