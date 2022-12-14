import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favourites.css';

function Favourites(props) {
    const [name, setName] = useState('');
    const [list, setList] = useState('');

    const handleClick = (index) => {
        const arr = [...props.favourites];

        arr.splice(index, 1);

        props.setFavourites(arr);
    }

    const handleSave = () => {

        const arr = [...props.favourites];

        const newArr = arr.map(item => item.imdbID);;

        const data = {
            "title": name,
            "movies": newArr
        }

        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                setList(data.id);
            });
    }

    return (
        <div className="favourites">
            <input value={name} onChange={(e) => setName(e.target.value)} className="favourites__name" />
            <ul className="favourites__list">
                {props.favourites.map((item, index) => {
                    return (
                        <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }} key={item.imdbID}>
                            <span>{item.Title} ({item.Year})</span>
                            <button onClick={() => handleClick(index)}>x</button>
                        </li>
                    );
                })}
            </ul>
            {
                list ?
                    <Link to={`/list/${list}`}>Перейти к списку</Link>
                    :
                    <button onClick={handleSave} type="button" className="favourites__save" disabled={!name.trim()}>
                        Сохранить список
                    </button>
            }
        </div>
    );
}

export default Favourites