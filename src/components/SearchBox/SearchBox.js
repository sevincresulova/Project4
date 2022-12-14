import React, { Component, useState } from 'react';
import './SearchBox.css';

function SearchBox(props) {
    const [searchLine, setSearchLine] = useState('');

    const searchLineChangeHandler = (e) => {
        setSearchLine(e.target.value);
    }
    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();

        fetch(`http://www.omdbapi.com/?s=${searchLine}&apikey=20498255`)
            .then(response => response.json())
            .then(data => {
                if (!data.Search) {
                    alert('Film is not found!');
                    return;
                }
                const arr = data.Search;
                props.setMovies(arr);
            })
    }

    return (
        <div className="search-box">
            <form className="search-box__form" onSubmit={searchBoxSubmitHandler}>
                <label className="search-box__form-label">
                    Искать фильм по названию:
                    <input
                        value={searchLine}
                        type="text"
                        className="search-box__form-input"
                        placeholder="Например, Shawshank Redemption"
                        onChange={searchLineChangeHandler}
                    />
                </label>
                <button
                    type="submit"
                    className="search-box__form-submit"
                    disabled={!searchLine}
                >
                    Искать
                </button>
            </form>
        </div>
    );
}

export default SearchBox