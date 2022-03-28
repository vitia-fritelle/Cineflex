import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
                setDisabledChairs([...disabledChairs,...chairs]);
                setChairs([]);
                setCustomer('');
                setCpf('');
            } else {
                alert('Deu algo errado :(');
            }
        }

        return (
            <>
                <main>
                    <h3>Selecione o(s) assento(s)</h3>
                    <ul>
                        {session?session.seats.map(({name, isAvailable, id}) => {
                            return <Seat key={id} 
                            name={name} 
                            id={id} 
                            disabled={disabledChairs.includes(id)}
                            setChairs={setChairs}
                            chairs={chairs}/>;
                            
                        }):''}
                    </ul>
                    <ul>
                        <li>Selecionado</li>
                        <li>Disponível</li>
                        <li>Indisponível</li>
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
                </main>
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
                onClick={HandleChairs}>
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