import { Box, Image } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";
import { calcEquivalentPosition } from "../../helper/calc";
import { selectButton } from "../../helper/switch";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    image: HTMLImageElement | undefined;
    sizes: { width: number; height: number };
    selectedElement: string;
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

export const Canvas = ({ setPosition, image, sizes, elements, setElements, selectedElement }: canvasProps) => {
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
            const { x, y } = calcEquivalentPosition(
                sizes.width,
                sizes.height,
                image?.width,
                image?.height,
                e.clientX - bound.x,
                e.clientY - bound.y
            );

            setElements([
                ...elements,
                {
                    id: uuidv4(),
                    type: selectedElement,
                    position: { x: e.clientX - bound.left, y: e.clientY - bound.top },
                    positionInitial: { x, y },
                },
            ]);
        }
    }

    function moveElement(elementId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        document.onmousemove = (event) => {
            event.preventDefault();
            const pdfImage = document.getElementById("pdf-image");
            if (pdfImage) {
                const bound = pdfImage.getBoundingClientRect();

                const el = document.getElementById(elementId);
                if (el) {
                    el.style.top = `${event.clientY - bound.top}px`;
                    el.style.left = `${event.clientX - bound.left}px`;
                }
            }
        };
    }

    function dropElementAfterMove(elementId: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const arrayFilter = elements.filter((button) => button.id !== elementId);
        const { type } = elements.find((button) => button.id === elementId) ?? {};
        
        const pdfImage = document.getElementById("pdf-image");
        if (pdfImage) {
            if (image) {
                const bound = pdfImage.getBoundingClientRect();
                const { x, y } = calcEquivalentPosition(
                    sizes.width,
                    sizes.height,
                    image?.width,
                    image?.height,
                    e.clientX - bound.x,
                    e.clientY - bound.y
                );

                setElements([
                    ...arrayFilter,
                    {
                        id: uuidv4(),
                        type: type ?? "SIGN",
                        position: { x: e.clientX - bound.left, y: e.clientY - bound.top },
                        positionInitial: { x, y },
                    },
                ]);
            }
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
                const SelectedElement = selectButton(element.type);
                return (
                    <SelectedElement
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
                        onMouseDown={(e) => {
                            //NOTE - Quando o click do mouse é feito e segurado
                            moveElement(element.id, e);
                        }}
                        onMouseUp={(e) => {
                            //NOTE - Quando o click do mouse é solto
                            dropElementAfterMove(element.id, e);
                        }}
                    ></SelectedElement>
                );
            })}
        </Box>
    );
};
