import React, { useState } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favourites from '../../components/Favourites/Favourites';

function MainPage() {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);

    return (
        <div className="main-page">
            <Header />
            <main className="main-page__content">
                <section className="main-page__main-section">
                    <div className="main-page__search-box">
                        <SearchBox setMovies={setMovies} />
                    </div>
                    <div className="main-page__movies">
                        <Movies movies={movies} favourites={favourites} setFavourites={setFavourites} />
                    </div>
                </section>
                <aside className="main-page__favourites">
                    <Favourites favourites={favourites} setFavourites={setFavourites} />
                </aside>
            </main>
        </div>
    );
}

export default MainPage