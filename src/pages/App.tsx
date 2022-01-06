import { Box, Button, Flex, HStack, Select, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React from "react";
import { GoArrowDown } from "react-icons/go";
import { connect } from "react-redux";
import useImage from "use-image";
import { Canvas } from "../components/Canvas";
import { Modal } from "../components/Modal/Modal";
import { ModalContentSign } from "../components/Modal/ModalContent/ModalContentSign";
import { SelectorBar } from "../components/SelectorBar";
import { regraDe3 } from "../helper/calc";
import { selectButton } from "../helper/switch";
import { api } from "../services/api";
import { StateProps } from "../store/types/types.redux";

interface elementsProps {
    id: string;
    type: string;
    position: { x: number; y: number };
    positionInitial: { x: number; y: number };
}

type AppProps = {
    imageBase64?: string;
};

const App = ({ imageBase64 }: AppProps) => {
    const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });
    const [selectedElement, setSelectedElement] = React.useState("SIGN");
    const [sizes, setSizes] = React.useState({ width: 0, height: 0 });
    const [zoom, setZoom] = React.useState(0.7);
    const [elements, setElements] = React.useState<elementsProps[]>([]);
    const [imagePdf] = useImage("data:image/jpg;base64," + imageBase64 ?? "");
    const { isOpen, onOpen, onClose } = useDisclosure();

    // if (!imageBase64) {
    //     window.location.href = "/";
    // }

    React.useEffect(() => {
        if (imagePdf?.width && imagePdf?.height) {
            setSizes({ width: imagePdf?.width * zoom, height: imagePdf?.height * zoom });

            setElements((elements) => {
                return elements.map((el) => {
                    return {
                        ...el,
                        position: {
                            x: regraDe3(imagePdf?.width, el.positionInitial.x, imagePdf?.width * zoom),
                            y: regraDe3(imagePdf?.height, el.positionInitial.y, imagePdf?.height * zoom),
                        },
                    };
                });
            });
        }
    }, [zoom, imagePdf]);

    async function handleClick() {
        // api.post("/mark-to-sign", elements);
        onOpen();
    }

    return (
        <Flex height="100vh">
            <Modal title="Como deseja Assinar?" isOpen={isOpen} onClose={onClose} size="xl">
                <ModalContentSign>{}</ModalContentSign>
            </Modal>
            <VStack justifyContent="space-between" mt="8" mb="8">
                <SelectorBar setSelectedElement={setSelectedElement}></SelectorBar>
                <HStack width="100%" pl="10px" pr="10px">
                    <Button colorScheme="green" flex="1" onClick={handleClick}>
                        Enviar
                    </Button>
                </HStack>
            </VStack>

            <Flex m="8" flex="1" direction="column">
                <HStack spacing="2" mb="3">
                    <Text>
                        <strong>Elemento selecionado:</strong> {React.createElement(selectButton(selectedElement))}
                    </Text>
                    <Spacer></Spacer>
                    <Text>
                        <strong>X:</strong> {Math.round(coordinates.x)}, <strong>Y:</strong> {Math.round(coordinates.y)}
                    </Text>
                    <Spacer></Spacer>
                    <Select
                        bg="pink.500"
                        fontWeight="bold"
                        borderColor="pink.500"
                        cursor="pointer"
                        _active={{ color: "black" }}
                        icon={<GoArrowDown></GoArrowDown>}
                        value={zoom}
                        onChange={(e) => setZoom(+e.target.value)}
                        width="fit-content">
                        <option value="0.5">50%</option>
                        <option value="0.6">60%</option>
                        <option value="0.7">70%</option>
                        <option value="0.8">80%</option>
                        <option value="0.9">90%</option>
                        <option value="1">100%</option>
                        <option value="1.1">110%</option>
                        <option value="1.2">120%</option>
                    </Select>
                </HStack>
                <Box id="scroll-box" flex="1" overflow="auto" maxWidth={window.innerWidth - 203}>
                    <Canvas
                        selectedElement={selectedElement}
                        elements={elements}
                        setElements={setElements}
                        sizes={sizes}
                        image={imagePdf}
                        setPosition={setCoordinates}></Canvas>
                </Box>
            </Flex>
        </Flex>
    );
};

const mapStateToProps = (states: StateProps) => {
    return {
        imageBase64: states.pdf,
    };
};

export default connect(mapStateToProps, null)(App);
