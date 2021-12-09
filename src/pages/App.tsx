import { Box, ChakraProvider, Flex, HStack, Button, Text } from "@chakra-ui/react";
import { FiRotateCw } from "react-icons/fi";
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import { Canvas } from "../components/Canvas";
import { SelectorBar } from "../components/SelectorBar";
import { theme } from "../styles/theme/theme";
import React from "react";

export const App = () => {
    const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });

    return (
        <ChakraProvider theme={theme}>
            <Flex>
                <SelectorBar></SelectorBar>
                <Box m="8" flex="1">
                    <HStack spacing="2" mb="3">
                        <Button colorScheme="green" leftIcon={<RiZoomInLine />}>
                            Zoom In
                        </Button>
                        <Button colorScheme="red" leftIcon={<RiZoomOutLine />}>
                            Zoom Out
                        </Button>
                        <Button colorScheme="blue" leftIcon={<FiRotateCw />}>
                            Rodar
                        </Button>
                        <Text>
                            X: {coordinates.x}, Y: {coordinates.y}
                        </Text>
                    </HStack>
                    <Box overflow="auto" maxWidth={window.innerWidth - 220} maxHeight={window.innerHeight - 120}>
                        <Canvas setPosition={setCoordinates}></Canvas>
                    </Box>
                </Box>
            </Flex>
        </ChakraProvider>
    );
};
