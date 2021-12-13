import { Box, ChakraProvider, Flex, HStack, Select, Text } from "@chakra-ui/react";
import React from "react";
import { GoArrowDown } from "react-icons/go";
import useImage from "use-image";
import { Canvas } from "../components/Canvas";
import { SelectorBar } from "../components/SelectorBar";
import { theme } from "../styles/theme/theme";

export const App = () => {
    const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });
    const [sizes, setSizes] = React.useState({ width: 0, height: 0 });
    const [zoom, setZoom] = React.useState(1);
    const [imagePdf] = useImage("/teste.png");

    React.useEffect(() => {
        if (imagePdf?.width && imagePdf?.height) {
            setSizes({ width: imagePdf?.width * zoom, height: imagePdf?.height * zoom });
        }
    }, [zoom, imagePdf]);

    return (
        <ChakraProvider theme={theme}>
            <Flex height="100vh">
                <SelectorBar></SelectorBar>
                <Flex m="8" flex="1" direction="column">
                    <HStack spacing="2" mb="3">
                        <Select
                            bg="pink.500"
                            fontWeight="bold"
                            borderColor="pink.500"
                            cursor="pointer"
                            _active={{ color: "black" }}
                            icon={<GoArrowDown></GoArrowDown>}
                            value={zoom}
                            onChange={(e) => setZoom(+e.target.value)}
                            width="fit-content"
                        >
                            <option value="0.1">10%</option>
                            <option value="0.2">20%</option>
                            <option value="0.3">30%</option>
                            <option value="0.4">40%</option>
                            <option value="0.5">50%</option>
                            <option value="0.5">60%</option>
                            <option value="0.7">70%</option>
                            <option value="0.8">80%</option>
                            <option value="0.9">90%</option>
                            <option value="1">100%</option>
                            <option value="1.1">110%</option>
                            <option value="1.2">120%</option>
                        </Select>
                        <Text>
                            <strong>X:</strong> {Math.round(coordinates.x)}, <strong>Y:</strong>{" "}
                            {Math.round(coordinates.y)}
                        </Text>
                    </HStack>
                    <Box id="scroll-box" flex="1" overflow="auto" maxWidth={window.innerWidth - 220}>
                        <Canvas sizes={sizes} image={imagePdf} setPosition={setCoordinates}></Canvas>
                    </Box>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
};
