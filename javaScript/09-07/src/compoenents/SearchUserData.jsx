import React, { useRef, useState } from "react";

// Task 4: Search User
// Data
// const users = ["Ravi", "Priya", "Arun"];
// Requirements
// Input field
// Search button
// Get input value using useRef
// Store search result using useState
// Display matched user

export default function SearchUserData() {
  const users = ["Ravi", "Priya", "Arun"];

  const inputRef = useRef(null);
  const [searchResult, setSearchResult] = useState("");

  function handleSearch() {
    const inputValue = inputRef.current.value.trim();

    const user = users.find(
      (item) => item.toLowerCase() === inputValue.toLowerCase()
    );

    if (user) {
      setSearchResult(user);
    } else {
      setSearchResult("User not found");
    }
  }

  return (
    <div>
      <input type="text" placeholder="Search User" ref={inputRef} />
      <button onClick={handleSearch}>Search</button>

      <h3>{searchResult}</h3>
    </div>
  );
}