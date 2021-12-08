import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { Canvas } from "../components/Canvas";
import { SelectorBar } from "../components/SelectorBar";
import { theme } from "../styles/theme/theme";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Flex>
            <SelectorBar></SelectorBar>
            <Box m="8" flex="1" overflow="auto" maxWidth={window.innerWidth - 220} maxHeight={window.innerHeight-66}>
                <Canvas></Canvas>
            </Box>
        </Flex>
    </ChakraProvider>
);
