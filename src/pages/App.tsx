import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Canvas } from "../components/Canvas";
import { theme } from "../styles/theme/theme";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Flex align="center" justifyContent="center" p="50px">
            <Canvas></Canvas>
        </Flex>
    </ChakraProvider>
);
