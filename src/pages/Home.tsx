import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMovies } from "../adapters";

export default () => {
    const [movies] = useMovies();

    return (
        <Main>
            <h3>Selecione o filme</h3>
            <ul>
                {movies?movies.map(({posterURL,title, id}) => 
                    <li key={id}>
                        <Link to={`/filme/${id}`}>
                            <img  src={posterURL} alt={title}/>
                        </Link>
                    </li>
                ):''}
            </ul>
        </Main>
    );
    
};

const Main = styled.main`
    margin-top: 67px;

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

    h3 {
        height: 110px;

        display: flex;
        align-items: center;
    }

    ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;

        li {
            position: relative;
            background: #FFFFFF;
            box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            width: 145px;
            height: 209px;
            z-index: 1;
    
            margin-bottom: 11px;
    
            &:nth-child(odd) {
                margin-right: 15px;
            }
        
            &:nth-child(even) {
                margin-left: 15px;
            }
    
            a {
                cursor: pointer;
    
                img {
                    position: absolute;
                    z-index: 2;
                    width: 129px;
                    height: 193px;
                    top: 8px;
                    left: 8px;
                }
            }
        }
    }

    

    @media (max-width: 320px) {
        li:nth-child(odd) {
            margin-right: 0;
        }

        li:nth-child(even) {
            margin-left: 0;
        }
    }
`;