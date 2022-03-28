export class Movie {

    constructor(
        public id: number, 
        public title: string,
        public posterURL: string, 
        public overview: string,
        public releaseDate: string) {

    }

}

export class Session {
    constructor(
        public name: string,
        public id: number){

    }
}

export class Day {
    constructor(
        public id: number,
        public weekday: string,
        public date: string,
        public showtimes?: Array<Session>){

    }
}

export class MovieDays extends Movie{

    constructor(
        id: number, 
        title: string,
        posterURL: string, 
        overview: string,
        releaseDate: string,
        public days: Array<Day>) {
        
        super(id,title,posterURL,overview,releaseDate);
    }
}

export type Seat = {
    id: number,
    name: string,
    isAvailable: boolean
}

export class MovieSession extends Session {
    constructor(
        id: number,
        name: string,
        public day: Day,
        public movie: Movie,
        public seats: Array<Seat>){
        
        super(name, id);
    }
}

export type MovieState = [
    Array<Movie>, 
    (movies: Array<Movie>) => void
];

export type LocationState = {
    chairs: Array<number>,
    customer: string,
    cpf: string,
    name: string,
    date: string,
    title: string
}