import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListPage.css';

function ListPage() {
    const { id } = useParams();

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(response => response.json())
            .then(async (data) => {
                const arr = data.movies;
                const newArr = [];

                for (let id of arr) {
                    await fetch(`http://www.omdbapi.com/?i=${id}&apikey=20498255`)
                        .then(response => response.json())
                        .then(data => {
                            newArr.push(data);
                        })
                }
                setMovies(newArr);
            })
    }, [])


    return (
        <div className="list-page">
            <h1 className="list-page__title">My List</h1>
            <ul>
                {movies.map((item) => {
                    return (
                        <li style={{ marginBottom: '10px' }} key={item.imdbID}>
                            <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank">{item.Title} ({item.Year})</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ListPage