import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LocationState } from "../types";


export default () => {

    const {state} = useLocation();
    const {title, date, name, chairs, customer, cpf} = state as LocationState;
    return (
        <>
            <Header>Pedido feito com sucesso!</Header>
            <Main>
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
            </Main>
            <Div>
                <Link to='/'>
                    <button>Voltar pra Home</button>
                </Link>
            </Div>
        </>
    );
}

const Header = styled.header`
    margin-top: 67px;
    height: 110px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    font-family: 'Roboto';
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #247A6B;
`;

const Main = styled.main`
    padding: 0 29px;

    div {
        margin-bottom: 20px;

        h3 {
            margin-bottom: 5px;
            font-family: 'Roboto';
            font-weight: 700;
            font-size: 24px;
            line-height: 28px;
            display: flex;
            align-items: center;
            letter-spacing: 0.04em;

            color: #293845;
        }
    }
`;

const Div = styled.div`
    margin-top: 62px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
        cursor: pointer;

        width: 225px;
        height: 42px;

        border: none;
        background-color: #E8833A;
        border-radius: 3px;

        font-family: 'Roboto';
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04em;

        color: #FFFFFF;
    }
`;