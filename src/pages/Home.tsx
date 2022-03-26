import { Link } from "react-router-dom";
import { useMovies } from "../adapters";

export default () => {
    const [movies] = useMovies();

    return (
        <main>
            <h3>Selecione o filme</h3>
            {movies.map(({posterURL,title, id}) => 
                <Link to={String(id)}>
                    <img key={id} src={posterURL} alt={title}/>
                </Link>
            )}
        </main>
    );
    
};