import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../pages/App";
import Home from "../pages/Home";
import { theme } from "../styles/theme/theme";

export const AppRoutes = () => {
    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/edit-pdf" element={<App></App>}></Route>
                    <Route path="*" element={<h1>404: Page not found</h1>}></Route>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    );
};
