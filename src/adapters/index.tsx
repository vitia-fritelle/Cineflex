import { Movie, MovieDays, MovieSession } from "../types";

const axios = require('axios');

const myAxios = axios.create({
    baseURL: 'https://mock-api.driven.com.br/api/v5/cineflex/'
});

export const getMoviesList = async () => {
    
    const {data: movies}: {data: Array<Movie>} = await myAxios.get('movies');
    return movies;
};

export const getMovieDays = async (movieId: number): Promise<MovieDays> => {
    
    const {data: days}: {data: MovieDays} = myAxios.get(`movies/${movieId}/showtimes`);
    return days;
}

export const getMovieSession = async (sessionId: number): Promise<MovieSession> => {
    
    const {data: session}: {data: MovieSession} = myAxios.get(`showtimes/${sessionId}/seats`);
    return session;
}

export const reserveSeats = async (
    ids: Array<number>, name: string, cpf: string) => {
    
    const objeto = {
        ids,
        name,
        cpf
    }
    const {data} = await axios.post('seats/book-many', objeto);
    return data
}