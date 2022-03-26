import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieSession } from "../adapters";
import { MovieSession } from "../types";

export default () => {
    
    const {idSessao} = useParams();
    
    if(idSessao) {
        const [session] = useMovieSession(idSessao);

        return (
            <>
                <main>
                    <h3>Selecione o(s) assento(s)</h3>
                    <ul>
                        {session?session.seats.map(({name, isAvailable, id}) => {
                            return <Seat key={id} name={name}/>;
                        }):''}
                    </ul>
                    <ul>
                        <li>Selecionado</li>
                        <li>Disponível</li>
                        <li>Indisponível</li>
                    </ul>

                    <form action="/success" method="post">
                        Nome do comprador:
                        <input type="text" name="" id="" placeholder="Digite seu nome..."/>
                        CPF do comprador:
                        <input type="text" name="" id="" placeholder="Digite seu CPF..."/>
                        <button>Reservar assento(s)</button>
                    </form>
                </main>
                {session?<Footer session={session}/>:''}
            </>
        );
    } else {
        return <h1>Página inválida</h1>
    }
};

const Seat = ({name}: {name: string}) => {

    const [selected, setSelected] = useState<Boolean>(false);

    return (
        <li className={`${selected?"selected":"available"}`}
            onClick={() => null}>
            {name}
        </li>
    );
};

const Footer = ({session}: {session: MovieSession}) => {

    const {name} = session;
    const {weekday} = session.day;
    const {posterURL, overview, title} = session.movie;
    
    return (
        <footer>
            <figure>
                <img src={posterURL} alt={overview}/>
                <figcaption>
                        <h4>{title}</h4>
                        {weekday} - {name}
                </figcaption>
            </figure>
        </footer>
    );
};