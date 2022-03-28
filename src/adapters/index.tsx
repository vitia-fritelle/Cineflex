import { useEffect, useState } from "react";
import { Movie, MovieDays, MovieSession } from "../types";

const axios = require('axios');

const myAxios = axios.create({
    baseURL: 'https://mock-api.driven.com.br/api/v5/cineflex/'
});

export const useMovies = () => {

    const [movies, setMovies] = useState<Array<Movie>>();

    useEffect(() => {
        
        (async () => {
            const {data}: {
                data: Array<Movie>
            } = await myAxios.get('movies');
            setMovies(data);
        })();
    },[]);

    return [movies];
};

export const useMovieDays = (movieId: string) => {
    
    const [days, setDays] = useState<MovieDays>();
    
    useEffect(() => {

        (async () => {
            const {data}: {
                data: MovieDays
            } = await myAxios.get(`movies/${movieId}/showtimes`);
            setDays(data);
        })();
    },[]);
    
    return [days];
};

export const useMovieSession = (sessionId: string) => {
    
    const [session, setSession] = useState<MovieSession>();

    useEffect(() => {
        (async () => {
            const {data}: {
                data: MovieSession
            } = await myAxios.get(`showtimes/${sessionId}/seats`);
            setSession(data);
        })();
    },[]);
    
    return [session];
}

export const reserveSeats = async (
    ids: Array<number>, name: string, cpf: string
): Promise<string> => {
    
    const objeto = {
        ids,
        name,
        cpf
    };

    const {data} = await myAxios.post('seats/book-many', objeto);

    return data;
}