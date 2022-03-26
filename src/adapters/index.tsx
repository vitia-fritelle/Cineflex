import { useEffect, useState } from "react";
import { Movie, MovieDays, MovieSession } from "../types";

const axios = require('axios');

const myAxios = axios.create({
    baseURL: 'https://mock-api.driven.com.br/api/v5/cineflex/'
});

export const useMovies = (): [
    Array<Movie>, (movies: Array<Movie>) => void
] => {
    const [movies, setMovies]: [
        Array<Movie>, (movies: Array<Movie>) => void
    ] = useState(Array(0));
    useEffect(() => {
        (async () => setMovies((await myAxios.get('movies')).data))();
    })

    return [movies, setMovies];
};

export const useMovieDays = (movieId: number): [
    MovieDays, (days: MovieDays) => void
] => {
    
    const [days, setDays]: [
        MovieDays, (days: MovieDays) => void
    ] = useState(Object());
    
    useEffect(() => {
        (async () => {
            setDays((await myAxios.get(`movies/${movieId}/showtimes`)).data);
        })();
    });

    return [days, setDays];
}

export const useMovieSession = (sessionId: number): [
    MovieSession, (session: MovieSession) => void
] => {
    
    const [session, setSession]: [
        MovieSession, (session: MovieSession) => void
    ] = useState(Object());

    useEffect(() => {
        (async () => {
            setSession((await myAxios.get(`showtimes/${sessionId}/seats`)).data);
        })();
    });
    
    return [session, setSession];
}

export const reserveSeats = async (
    ids: Array<number>, name: string, cpf: string
) => {
    
    const objeto = {
        ids,
        name,
        cpf
    };

    const {data} = await axios.post('seats/book-many', objeto);

    return data
}