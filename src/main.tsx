import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {Gameboard} from "./components/Gameboard.tsx";
import {GameSetter} from "./components/GameSetter.tsx";
import {Provider} from "react-redux";
import store from "./stores";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <GameSetter/>
        </Provider>
    </StrictMode>,
)
