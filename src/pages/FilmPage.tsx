import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useMovieDays } from "../adapters";
import { Link } from "react-router-dom";
import { MovieDays } from "../types";


export default () => {
    
    const {idFilme} = useParams();

    if(idFilme) {
        const [days] = useMovieDays(idFilme); 

        return (
            <>
                <Main>
                    <h3>Selecione o horário</h3>
                    <ul>
                        {days?days.days.map(({weekday, date, showtimes, id}) => 
                            <li key={id}>
                                <header>{weekday} - {date}</header>
                                <div>
                                    {showtimes
                                    ?showtimes.map(({name, id: sessionId}) => 
                                    <Link key={sessionId} to={`/sessao/${sessionId}`}>{name}</Link>)
                                    :''}
                                </div>
                            </li>
                        ):''}
                    </ul>
                </Main>
                {days?<Footer movie={days}/>:''}
            </>
        );
    } else {
        return (
            <h1>Página inválida!</h1>
        );
    }
};

const Footer = (props: {movie: MovieDays}) => {
    
    const {posterURL, overview, title} = props.movie;

    return (
        <Rodape>
            <figure>
                <img src={posterURL} alt={overview}/>
                <figcaption>
                    {title}
                </figcaption>
            </figure>
        </Rodape>
    );
};

const Rodape = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 14px 10px;

    background-color: #DFE6ED;
    border: 1px solid #9EADBA;

    figure {
        display: flex;
        flex-flow: row nowrap;
        align-item: center;
        justify-content: flex-start;

        img {
            width: 48px;
            height: 72px;
        }

        figcaption {
            display: flex;
            align-items: center;

            font-family: 'Roboto';
            font-weight: 400;
            font-size: 26px;
            line-height: 30px;

            margin-left: 14px;
        }
    }
`;


const Main = styled.main`
    margin-top: 67px;
    margin-bottom: 117px;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    flex-flow: column nowrap;
    letter-spacing: 0.04em;

    color: #293845;

    padding: 0 24px;

    h3 {
        height: 110px;

        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    ul {
        font-family: 'Roboto';
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.02em;

        display: flex;
        align-items: flex-start;
        text-align: center;
        justify-content: center;
        flex-flow: column nowrap;

        width: 100%;

        li {
            width: 100%;
            display: flex;
            align-items: flex-start;
            text-align: center;
            justify-content: center;
            flex-flow: column nowrap;

            header {
                margin-bottom: 22px;
                font-family: 'Roboto';
                font-weight: 400;
                font-size: 20px;
                line-height: 23px;
                display: flex;
                align-items: center;
                letter-spacing: 0.02em;
            }

            div {
                margin-bottom: 23px;
                a {
                    cursor: pointer;

                    padding: 5px;
                    background-color: #E8833A;
                    border-radius: 3px;
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 18px;
                    line-height: 21px;
                    letter-spacing: 0.02em;
    
                    color: #FFFFFF;

                    &:nth-child(odd) {
                        margin-right: 10px;
                    }

                    &:nth-child(even) {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
`;