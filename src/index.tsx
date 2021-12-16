import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom";
import "reactjs-popup/dist/index.css";
import { AppRoutes } from "./routes/router";
import "./styles/global.css";

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <AppRoutes />
    </React.StrictMode>,
    document.getElementById("root")
);
