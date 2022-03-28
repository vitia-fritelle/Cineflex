import { Link, useLocation } from "react-router-dom";
import { LocationState } from "../types";


export default () => {

    const {state} = useLocation();
    const {title, date, name, chairs, customer, cpf} = state as LocationState;
    return (
        <>
            <header>Pedido feito com sucesso!</header>
            <main>
                <div>
                    <h3>Filme e sessão</h3>
                    {title}
                    <br/>
                    {date} {name}
                </div>
                <div>
                    <h3>Ingressos</h3>
                    <ol>
                    {chairs.map(chair => 
                     <li key={chair}>Assento {chair}</li>)}
                    </ol>
                </div>
                <div>
                    <h3>Comprador</h3>
                    Nome: {customer}
                    <br/>
                    CPF: {cpf}
                </div>
            </main>
            <Link to='/'>
                <button>Voltar pra Home</button>
            </Link>
        </>
    );
}