import { Box, Button, ChakraProvider, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FiRotateCw } from "react-icons/fi";
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import useImage from "use-image";
import { Canvas } from "../components/Canvas";
import { SelectorBar } from "../components/SelectorBar";
import { theme } from "../styles/theme/theme";

export const App = () => {
    const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });
    const [rotate, setRotate] = React.useState(0);
    const [sizes, setSizes] = React.useState({ width: 0, height: 0 });
    const [zoom, setZoom] = React.useState(1);
    const [imagePdf] = useImage("/teste2.png");

    React.useEffect(() => {
        if (imagePdf?.width && imagePdf?.height) {
            setSizes({ width: imagePdf?.width, height: imagePdf?.height });
        }
    }, [imagePdf]);

    function rotateRigth() {
        if (rotate + 90 < 360) {
            setRotate(rotate + 90);
        } else {
            setRotate(0);
        }
    }

    function zoomIn() {
        if (imagePdf?.width && imagePdf?.height) {
            console.log(imagePdf?.width + "*" + (zoom + 0.1));
            setSizes({ width: imagePdf?.width * (zoom + 0.1), height: imagePdf?.height * (zoom + 0.1) });
            setZoom(zoom + 0.1);
        }
    }
    function zoomOut() {
        if (imagePdf?.width && imagePdf?.height) {
            console.log(imagePdf?.width + "*" + (zoom - 0.1));
            setSizes({ width: imagePdf?.width * (zoom - 0.1), height: imagePdf?.height * (zoom - 0.1) });
            setZoom(zoom - 0.1);
        }
    }

    return (
        <ChakraProvider theme={theme}>
            <Flex height="100vh">
                <SelectorBar></SelectorBar>
                <Flex m="8" flex="1" direction="column">
                    <HStack spacing="2" mb="3">
                        <Button colorScheme="green" leftIcon={<RiZoomInLine />} onClick={zoomIn}>
                            Zoom In
                        </Button>
                        <Button colorScheme="red" leftIcon={<RiZoomOutLine />} onClick={zoomOut}>
                            Zoom Out
                        </Button>
                        <Button colorScheme="blue" leftIcon={<FiRotateCw />} onClick={rotateRigth}>
                            Rodar
                        </Button>
                        <Text>
                            X: {coordinates.x}, Y: {coordinates.y}
                        </Text>
                    </HStack>
                    <Box flex="1" overflow="auto" maxWidth={window.innerWidth - 220}>
                        <Canvas sizes={sizes} image={imagePdf} setPosition={setCoordinates} rotate={rotate}></Canvas>
                    </Box>
                </Flex>
            </Flex>
        </ChakraProvider>
    );
};
