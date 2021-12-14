import { Box, Image } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { regraDe3 } from "../../helper/calc";
import { ButtonSign } from "../ButtonSign";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    image: HTMLImageElement | undefined;
    sizes: { width: number; height: number };
    elements: {
        id: string;
        type: string;
        position: { x: number; y: number };
        positionInitial: { x: number; y: number };
    }[];
    setElements: Dispatch<
        SetStateAction<
            {
                id: string;
                type: string;
                position: { x: number; y: number };
                positionInitial: { x: number; y: number };
            }[]
        >
    >;
}

export const Canvas = ({ setPosition, image, sizes, elements, setElements }: canvasProps) => {
    function setCoordinates(x: number, y: number) {
        setPosition({
            x,
            y,
        });
    }

    function removeElement(id: string) {
        const newElements = elements.filter((element) => element.id !== id);
        setElements(newElements);
    }

    function addElement(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
        const bound = e.currentTarget.getBoundingClientRect();
        if (image) {
            const initialX = regraDe3(sizes.width, e.clientX - bound.left, image?.width);
            const initialY = regraDe3(sizes.height, e.clientY - bound.top, image?.height);
            setElements([
                ...elements,
                {
                    id: uuidv4(),
                    type: "SIGN",
                    position: { x: e.clientX - bound.left, y: e.clientY - bound.top },
                    positionInitial: { x: initialX, y: initialY },
                },
            ]);
        }
    }

    return (
        <Box position="relative" p="8" bg="#e9e9e9" minWidth={sizes.width + 80} minHeight="100%" display="flex">
            <Image
                id="pdf-image"
                cursor="copy"
                onClick={addElement}
                src={image?.src}
                width={sizes.width}
                height={sizes.height}
                maxWidth="none"
                onMouseMove={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();
                    setCoordinates(e.clientX - bound.left, e.clientY - bound.top);
                }}
            ></Image>
            {elements.map((element) => {
                return (
                    <ButtonSign
                        id={element.id}
                        key={element.id}
                        cursor="move"
                        position="absolute"
                        top={element.position.y}
                        left={element.position.x}

                        onDeleteElement={() => removeElement(element.id)}
                        onDragStart={(e) => {
                            e.dataTransfer.setData("id", element.id);
                        }}
                        onMouseDown={(e) => {//NOTE - Quando o click do mouse é feito e segurado
                            e.preventDefault();
                            document.onmousemove = (event) => {
                                event.preventDefault();
                                const pdfImage = document.getElementById("pdf-image");
                                if (pdfImage) {
                                    const bound = pdfImage.getBoundingClientRect();

                                    const el = document.getElementById(element.id);
                                    if (el) {
                                        el.style.top = `${event.clientY - bound.top}px`;
                                        el.style.left = `${event.clientX - bound.left}px`;
                                    }
                                }
                            };
                        }}
                        onMouseUp={(e) => {//NOTE - Quando o click do mouse é solto
                            const arrayFilter = elements.filter((button) => button.id !== element.id);
                            const pdfImage = document.getElementById("pdf-image");
                            if (pdfImage) {
                                const bound = pdfImage.getBoundingClientRect();
                                if (image) {
                                    const initialX = regraDe3(sizes.width, e.clientX - bound.left, image?.width);
                                    const initialY = regraDe3(sizes.height, e.clientY - bound.top, image?.height);
                                    setElements([
                                        ...arrayFilter,
                                        {
                                            id: uuidv4(),
                                            type: "SIGN",
                                            position: { x: e.clientX - bound.left, y: e.clientY - bound.top },
                                            positionInitial: { x: initialX, y: initialY },
                                        },
                                    ]);
                                }
                            }
                        }}
                    ></ButtonSign>
                );
            })}
        </Box>
    );
};
