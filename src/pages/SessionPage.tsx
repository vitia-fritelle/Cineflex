import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { reserveSeats, useMovieSession } from "../adapters";
import { MovieSession } from "../types";

export default () => {
    
    const {idSessao} = useParams();
    const [chairs, setChairs] = useState<Array<number>>([]);
    const [disabledChairs, setDisabledChairs] = useState<Array<number>>([]);
    const [customer, setCustomer] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const browse = useNavigate();

    if(idSessao) {
        const [session] = useMovieSession(idSessao);

        const enviarDados = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
            e.preventDefault();
            const response = await reserveSeats(chairs, customer, cpf);
            if(response === 'OK!' && session){
                const {name} = session;
                const {date} = session.day;
                const {title} = session.movie;
                setDisabledChairs([...disabledChairs,...chairs]);
                browse('/sucesso',{
                    state: {
                        chairs,
                        customer,
                        cpf,
                        name,
                        date,
                        title
                    },
                    replace: false
                });
            } else {
                alert('Deu algo errado :(');
            }
        }

        return (
            <>
                <Main>
                    <h3>Selecione o(s) assento(s)</h3>
                    <ul className="cadeiras">
                        {session?session.seats.map(({name, isAvailable, id}) => {
                            return <Seat key={id} 
                            name={name} 
                            id={id} 
                            disabled={disabledChairs.includes(id)}
                            setChairs={setChairs}
                            chairs={chairs}/>;
                            
                        }):''}
                    </ul>
                    <ul className="opcoes">
                        <li><div className="selected"></div>Selecionado</li>
                        <li><div className="available"></div>Disponível</li>
                        <li><div className="disabled"></div>Indisponível</li>
                    </ul>

                    <form onSubmit={enviarDados} 
                          method="post">
                        Nome do comprador:
                        <input type="text" 
                               onChange={(e) => setCustomer(e.target.value)} 
                               value={customer} 
                               placeholder="Digite seu nome..." required/>
                        CPF do comprador:
                        <input type="text" 
                               onChange={(e) => setCpf(e.target.value)} 
                               value={cpf} 
                               placeholder="Digite seu CPF..." required/>
                        
                            <button type="submit">Reservar assento(s)</button>
                        
                    </form>
                </Main>
                {session?<Footer session={session}/>:''}
            </>
        );
    } else {
        return <h1>Página inválida</h1>
    }
};

const Seat = ({name, id, disabled, chairs, setChairs}: {
    name: string, 
    id: number, 
    disabled: boolean,
    chairs: Array<number>, 
    setChairs: (chair: Array<number>) => void
}) => {

    const [selected, setSelected] = useState<boolean>(false);

    const HandleChairs = () => {
        if(selected) {
            setChairs(chairs.filter(chair => chair !== id));
        } else{
            setChairs([...chairs,id]);
        }
        setSelected(!selected);
    }

    if(!disabled) {
        return (
            <li className={selected?"selected":"available"}
                onClick={HandleChairs}>
                {name}
            </li>
        );
    } else {
        return (
            <li className='disabled'
                onClick={() => alert('Esse assento não está disponível')}>
                {name}
            </li>
        );
    }
    
};

const Footer = ({session}: {session: MovieSession}) => {

    const {name} = session;
    const {weekday} = session.day;
    const {posterURL, overview, title} = session.movie;
    
    return (
        <Rodape>
            <figure>
                <img src={posterURL} alt={overview}/>
                <figcaption>
                    <h4>{title}</h4>
                    {weekday} - {name}
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
            align-items: flex-start;
            flex-flow: column nowrap;

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

    padding: 0 24px;

    .selected {
        background: #8DD7CF;
        border: 1px solid #1AAE9E;
    }

    .available {
        background: #C3CFD9;
        border: 1px solid #7B8B99;
    }

    .disabled {
        background: #FBE192;
        border: 1px solid #F7C52B;
    }

    h3 {
        height: 110px;

        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .cadeiras {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;

        li {
            cursor: pointer;

            width: 26px;
            height: 26px;

            box-sizing: border-box;
            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;

            font-family: 'Roboto';
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: 0.04em;

            color: #000000;

            margin-right: 7px;
            margin-bottom: 18px;
        }
    }

    .opcoes {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        margin-bottom: 41px;

        li {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column nowrap;

            div {
                width: 25px;
                height: 25px;
    
                box-sizing: border-box;
                border-radius: 50%;
            }
        }
    }

    form {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: center;
        
        input {
            width: 100%;
            height: 51px;

            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            box-sizing: border-box;
            border-radius: 3px;

            margin-bottom: 7px;
        }

        button {
            margin-top: 50px;
            margin-left: auto;
            margin-right: auto;

            cursor: pointer;

            width: 225px;
            height: 42px;

            background: #E8833A;
            border-radius: 3px;

            border: none;

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
    }
`;