import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { Canvas } from "../components/Canvas";
import { SelectorBar } from "../components/SelectorBar";
import { theme } from "../styles/theme/theme";

export const App = () => (
    <ChakraProvider theme={theme}>
        <Flex justifyContent="space-between">
            <SelectorBar></SelectorBar>
            <Box m="8">
                <Canvas></Canvas>
            </Box>
        </Flex>
    </ChakraProvider>
);
