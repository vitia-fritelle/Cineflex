import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilmPage from "./pages/FilmPage";
import Home from "./pages/Home";
import SessionPage from "./pages/SessionPage";
import Success from "./pages/Success";

export default () => {
    return (
        <BrowserRouter>
            <header>CINEFLEX</header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filme/:idFilme" element={<FilmPage/>}/>
                <Route path="/sessao/:idSessao" element={<SessionPage/>}/>
                <Route path="/sucesso" element={<Success/>}/>
            </Routes>
        </BrowserRouter>
    );
}
