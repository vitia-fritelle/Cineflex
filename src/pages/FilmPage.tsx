import { useParams } from "react-router-dom";
import { useMovieDays } from "../adapters";

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
                            {showtimes?showtimes.map(({name}) => name):''}
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