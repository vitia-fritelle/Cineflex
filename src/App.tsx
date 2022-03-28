import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import FilmPage from "./pages/FilmPage";
import Home from "./pages/Home";
import SessionPage from "./pages/SessionPage";
import Success from "./pages/Success";

export default () => {
    return (
        <BrowserRouter>
            <Header>CINEFLEX</Header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filme/:idFilme" element={<FilmPage/>}/>
                <Route path="/sessao/:idSessao" element={<SessionPage/>}/>
                <Route path="/sucesso" element={<Success/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #C3CFD9;
    color: #E8833A;

    font-family: 'Roboto';
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    height: 67px;
`;