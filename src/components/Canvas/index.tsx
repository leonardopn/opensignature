import { Button, HStack } from "@chakra-ui/react";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageRef } from "konva/lib/Stage";
import React from "react";
import { RiZoomInLine, RiZoomOutLine } from "react-icons/ri";
import { FiRotateCw, FiRotateCcw } from "react-icons/fi";
import { Image, Layer, Stage } from "react-konva";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import useImage from "use-image";

interface elementProps {
    x: number;
    y: number;
    image: HTMLImageElement | undefined;
}

export const Canvas = () => {
    const [elements, setElements] = React.useState<elementProps[]>([]);
    const [imageButton] = useImage("/assets/button_sign.png");
    const [imagePdf] = useImage("/teste2.jpg");

    const modalRef = React.useRef<PopupActions>(null);
    const canvasRef = React.useRef<StageRef>(null);

    const [sizesCanvas, setSizesCanvas] = React.useState({
        width: imagePdf?.width,
        height: imagePdf?.height,
    });

    const [sizesImage, setSizesImage] = React.useState({
        width: imagePdf?.width,
        height: imagePdf?.height,
    });

    const [zoom, setZoom] = React.useState(1);
    const [rotate, setRotate] = React.useState({ degree: 0, x: 0, y: 0 });

    React.useEffect(() => {
        setSizesCanvas({
            width: imagePdf?.width,
            height: imagePdf?.height,
        });
        setSizesImage({
            width: imagePdf?.width,
            height: imagePdf?.height,
        });
    }, [imagePdf?.width, imagePdf?.height, setSizesImage, setSizesCanvas]);

    function zoomIn() {
        if (imagePdf?.height && imagePdf?.width) {
            setSizesImage({ width: imagePdf?.width * (zoom + 0.1), height: imagePdf?.height * (zoom + 0.1) });
            // setSizesCanvas({ width: imagePdf?.width * (zoom + 0.1), height: imagePdf?.height * (zoom + 0.1) });
            setZoom(zoom + 0.1);
        }
    }

    function zoomOut() {
        if (imagePdf?.height && imagePdf?.width) {
            setSizesImage({ width: imagePdf?.width * (zoom - 0.1), height: imagePdf?.height * (zoom - 0.1) });
            // setSizesCanvas({ width: imagePdf?.width * (zoom + 0.1), height: imagePdf?.height * (zoom + 0.1) });
            setZoom(zoom - 0.1);
        }
    }

    function rotateRight() {
        switch (rotate.degree) {
            case 90:
                setSizesCanvas({ width: sizesCanvas.height, height: sizesCanvas.width });
                setRotate({
                    ...rotate,
                    degree: rotate.degree + 90,
                    x: sizesCanvas.height ? sizesCanvas.height : 0,
                    y: sizesCanvas.width ? sizesCanvas.width : 0,
                });
                break;
            case 180:
                setSizesCanvas({ width: sizesCanvas.height, height: sizesCanvas.width });
                setRotate({ ...rotate, degree: rotate.degree + 90, x: 0, y: sizesCanvas.width ? sizesCanvas.width : 0 });
                break;
            case 270:
                setSizesCanvas({ width: sizesCanvas.height, height: sizesCanvas.width });
                setRotate({ ...rotate, degree: rotate.degree + 90, x: 0, y: 0 });
                break;
            case 360:
                setSizesCanvas({ width: sizesCanvas.height, height: sizesCanvas.width });
                setRotate({ ...rotate, degree: 90, x: sizesCanvas.height ? sizesCanvas.height : 0 });
                break;
            default:
                setSizesCanvas({ width: sizesCanvas.height, height: sizesCanvas.width });
                setRotate({ ...rotate, degree: rotate.degree + 90, x: sizesCanvas.height ? sizesCanvas.height : 0 });
                break;
        }
    }

    function addElementInCanvas(event: KonvaEventObject<MouseEvent>) {
        const stage = event.target.getStage();
        const positions = stage?.getPointerPosition();
        if (positions) {
            setElements([...elements, { x: positions?.x, y: positions?.y, image: imageButton }]);
        }
    }

    function removeElement(key: number) {
        setElements(elements.filter((_, index) => index !== key));
    }

    function changeElementPosition(key: number, x: number, y: number) {
        const newElements = elements.map((element, index) => {
            if (index === key) {
                return { ...element, x, y };
            }
            return element;
        });
        setElements(newElements);
    }

    function sign() {
        modalRef.current?.open();
    }

    return (
        <>
            <HStack spacing="2" mb="3">
                <Button colorScheme="green" leftIcon={<RiZoomInLine />} onClick={zoomIn}>
                    Zoom In
                </Button>
                <Button colorScheme="red" leftIcon={<RiZoomOutLine />} onClick={zoomOut}>
                    Zoom Out
                </Button>
                <Button colorScheme="blue" leftIcon={<FiRotateCw />} onClick={rotateRight}>
                    Rodar
                </Button>
            </HStack>
            <Stage
                ref={canvasRef}
                width={sizesCanvas.width}
                height={sizesCanvas.height}
                rotation={rotate.degree}
                x={rotate.x}
                y={rotate.y}
            >
                <Layer
                    onMouseEnter={(e) => {
                        const stage = e.target.getStage();
                        if (stage) {
                            const container = stage.container();
                            container.style.cursor = "copy";
                        }
                    }}
                >
                    <Image image={imagePdf} width={sizesImage.width} height={sizesImage.height} />
                    {elements.map((element, index) => {
                        return (
                            <Image
                                key={index}
                                draggable
                                onClick={(e) => sign()}
                                image={element.image}
                                x={element.x}
                                y={element.y}
                                onMouseEnter={(e) => {
                                    const stage = e.target.getStage();
                                    if (stage) {
                                        const container = stage.container();
                                        container.style.cursor = "move";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const stage = e.target.getStage();
                                    if (stage) {
                                        const container = stage.container();
                                        container.style.cursor = "copy";
                                    }
                                }}
                                onDragEnd={(e) => {
                                    changeElementPosition(index, e.target.x(), e.target.y());
                                }}
                            />
                        );
                    })}
                </Layer>
            </Stage>
            {/* <Button
                draggable="true"
                onDragEnd={(e) => {
                    e.preventDefault();
                    canvasRef.current?.setPointersPositions(e);
                    const positions = canvasRef.current?.getPointerPosition();
                    if (positions) {
                        setElements([...elements, { x: positions?.x, y: positions?.y, image: imageButton }]);
                    }
                }}
            >
                Enviar
            </Button> */}
            {/* {elements.map((element, index) => (
                <p>
                    X: {element.x} Y: {element.y}
                </p>
            ))} */}
            <Popup ref={modalRef} modal>
                <span> Modal content </span>
            </Popup>
        </>
    );
};
