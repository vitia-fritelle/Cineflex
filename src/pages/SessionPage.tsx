import { useParams } from "react-router-dom";
import { useMovieSession } from "../adapters";

export default () => {
    
    const {idSessao} = useParams();
    
    if(idSessao) {
        const [session] = useMovieSession(idSessao);
    
        return (
            <main>
                <h3>Selecione o(s) assento(s)</h3>
                <ul>
                    {session?session.seats.map(({name, isAvailable, id}) => {
                        return (
                            <li key={id}>
                                {name}
                            </li>
                        );
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
        );
    } else {
        return <h1>Página inválida</h1>
    }
}