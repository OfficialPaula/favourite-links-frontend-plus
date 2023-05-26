import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import './LinkContainer.css';
import ProfileCircle from './ProfileCircle';
import InfiniteScroll from './InfiniteScroll';
import Clock from './Clock';

const LinkContainer = (props) => {
  const [favLinks, setFavLinks] = useState([]);
  const [bookmarkedLinks, setBookmarkedLinks] = useState([]);

  useEffect(() => {
    const getLinks = async () => {
      try {
        const data = await fetch('/links');
        const json = await data.json();
        setFavLinks(json);
        const storedBookmarks = localStorage.getItem('bookmarkedLinks');
        if (storedBookmarks) {
          setBookmarkedLinks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLinks();
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedLinks', JSON.stringify(bookmarkedLinks));
  }, [bookmarkedLinks]);

  const handleRemove = async (id) => {
    try {
      await fetch(`/links/${id}`, {
        method: 'DELETE',
      });

      setFavLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
      setBookmarkedLinks((prevBookmarks) => prevBookmarks.filter((link) => link.id !== id));
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

  const handleBookmark = (id) => {
    if (bookmarkedLinks.some((link) => link.id === id)) {
      setBookmarkedLinks((prevBookmarks) => prevBookmarks.filter((link) => link.id !== id));
    } else {
      const linkToBookmark = favLinks.find((link) => link.id === id);
      if (linkToBookmark) {
        setBookmarkedLinks((prevBookmarks) => [...prevBookmarks, linkToBookmark]);
      }
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

  const handleCopyTable = () => {
    const tableData = favLinks.map((link) => `${link.name} - ${link.url}`).join('\n');
    navigator.clipboard.writeText(tableData);
  };

  return (
    <div className="link-container">
      <Clock />
      <h1 className="link-container__title">My Favorite Links</h1>
      <p className="link-container__subtitle">
        Add a new URL with a name and link to the table.
      </p>
      <br />
      <p className="emoji__label">
        (Select an EMOJI to be enlarged as your profile)
        <br />
      </p>
      <ProfileCircle />
      <button className="link-container__copy-button" onClick={handleCopyTable}>
        Copy Table
      </button>
      <Table
        linkData={favLinks}
        bookmarkedLinks={bookmarkedLinks}
        removeLink={handleRemove}
        updateLink={handleUpdate}
        toggleBookmark={handleBookmark}
      />
      <br />
      <h3 className="link-container__form-title">Add New</h3>
      <Form handleSubmit={handleSubmit} />
      <InfiniteScroll />
    </div>
  );
};

export default LinkContainer;