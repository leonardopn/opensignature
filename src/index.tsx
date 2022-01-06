import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "reactjs-popup/dist/index.css";
import { AppRoutes } from "./routes/router";
import createStore from "./store/store";
import "./styles/global.css";
import 'reactjs-popup/dist/index.css';

const store = createStore();

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
