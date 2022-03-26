import { Link } from "react-router-dom";
import { useMovies } from "../adapters";

export default () => {
    const [movies] = useMovies();

    return (
        <main>
            <h3>Selecione o filme</h3>
            {movies?movies.map(({posterURL,title, id}) => 
                <Link key={id} to={`/filme/${id}`}>
                    <img  src={posterURL} alt={title}/>
                </Link>
            ):''}
        </main>
    );
    
};