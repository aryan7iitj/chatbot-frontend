import React, { useState } from "react";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // State for search input
  const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
  const [response, setResponse] = useState(""); // State for response text
  const [showResponse, setShowResponse] = useState(false); // State to show response box

  const dropdownOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Inner Option",
    "Interesting Option",
    "Another Option",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setDropdownVisible(true); // Show dropdown when search value changes
  };

  const handleOptionClick = (option) => {
    setInputValue(option); // Set the input value to the selected option
    setSearchValue(option);
    setDropdownVisible(false); // Hide the dropdown after selecting an option
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, user: true };
    const botResponse = {
      text: editIndex >= 0 ? "New bot response" : "Bot response",
      user: false,
    };

    if (editIndex >= 0) {
      const updatedMessages = [...messages, userMessage, botResponse];
      setMessages(updatedMessages);
      setEditIndex(-1);
    } else {
      setMessages([...messages, userMessage, botResponse]);
    }

    setInputValue("");
    setShowResponse(true); // Show response box after save
    setResponse(botResponse.text); // Set response text
  };

  const openEditForm = (index) => {
    setEditIndex(index);
    setInputValue(messages[index].text);
    setIsEditing(true);
    setDropdownVisible(false); // Close the dropdown menu
    setShowResponse(false);
  };

  const clearForm = () => {
    setInputValue("");
    setSearchValue(""); // Clear search value
    setDropdownVisible(false); // Hide the dropdown when cleared
  };

  const filteredOptions = dropdownOptions.filter((option) =>
    option.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  return (
    <div className="app">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.user ? "user" : "bot"}`}
            >
              <div className="message-text">
                {message.text}
                {message.user && (
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => openEditForm(index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="input-field"
          />
          <button type="submit" className="send-button">
            {editIndex >= 0 ? "Save" : "Send"}
          </button>
        </form>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsEditing(false)}>
              &times;
            </span>
            <h2>Edit Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="modal-controls">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search options..."
                  className="modal-search-input"
                  onFocus={() => setDropdownVisible(true)} // Show the dropdown when focused
                />
                {dropdownVisible && filteredOptions.length > 0 && (
                  <ul className="dropdown-list">
                    {filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        className="dropdown-item"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                <button type="submit" className="modal-button">
                  Save
                </button>
                <button
                  type="button"
                  className="modal-button"
                  onClick={clearForm}
                >
                  Clear
                </button>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Edit your message..."
                className="modal-input-field"
              />
              {showResponse && (
                <div className="response-box">
                  <h3>Response:</h3>
                  <p>{response}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
