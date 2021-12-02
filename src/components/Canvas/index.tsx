import { Button } from "@chakra-ui/react";
import { KonvaEventObject } from "konva/lib/Node";
import React from "react";
import { Image, Layer, Stage } from "react-konva";
import Popup from "reactjs-popup";
import useImage from "use-image";

interface elementProps {
    x: number;
    y: number;
    image: HTMLImageElement | undefined;
}

export const Canvas = () => {
    const [elements, setElements] = React.useState<elementProps[]>([]);
    const [imageButton] = useImage("/assets/button_sign.png");
    const [imagePdf] = useImage("/teste.png");

    const sizes = {
        width: 850,
        height: 1000,
    };

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

    function sign() {}

    return (
        <>
            <Popup  modal>
                <span> Modal content </span>
            </Popup>
            <Stage onClick={addElementInCanvas} width={sizes.width} height={sizes.height}>
                <Layer
                    onMouseEnter={(e) => {
                        const stage = e.target.getStage();
                        if (stage) {
                            const container = stage.container();
                            container.style.cursor = "copy";
                        }
                    }}
                >
                    <Image width={sizes.width} height={sizes.height} image={imagePdf} />
                    {elements.map((element, index) => {
                        return (
                            <Image
                                key={index}
                                draggable
                                onClick={(_) => removeElement(index)}
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
            <Button onClick={(e) => console.log(elements)}>Enviar</Button>
        </>
    );
};
