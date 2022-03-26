import { useParams } from "react-router-dom";
import { useMovieDays } from "../adapters";
import { Link } from "react-router-dom";

export default () => {
    
    const {idFilme} = useParams();

    if(idFilme) {
        const [days] = useMovieDays(idFilme); 

        return (
            <main>
                <h3>Selecione o horário</h3>
                <ul>
                    {days?days.days.map(({weekday, date, showtimes, id}) => 
                        <li key={id}>
                            <header>{weekday} - {date}</header>
                            {showtimes?showtimes.map(({name, id: sessionId}) => 
                              <Link to={`/sessao/${sessionId}`}>{name}</Link>):''}
                        </li>
                    ):''}
                </ul>
            </main>
        );
    } else {
        return (
            <h1>Página inválida!</h1>
        );
    }
    
}