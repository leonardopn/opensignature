import { Box, ChakraProvider, theme } from "@chakra-ui/react";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box>Olá mundo</Box>
    </ChakraProvider>
);
