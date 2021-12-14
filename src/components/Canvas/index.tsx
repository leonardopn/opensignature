import { Box, Image } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { regraDe3 } from "../../helper/calc";
import { ButtonSign } from "../ButtonSign";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    image: HTMLImageElement | undefined;
    sizes: { width: number; height: number };
    elements: {
        type: string;
        position: { x: number; y: number };
        positionInitial: { x: number; y: number };
    }[];
    setElements: Dispatch<
        SetStateAction<
            {
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

    return (
        <Box position="relative" p="8" bg="#e9e9e9" minWidth={sizes.width + 80} minHeight="100%" display="flex">
            <Image
                onMouseMove={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();
                    setCoordinates(e.clientX - bound.left, e.clientY - bound.top);
                }}
                onClick={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();
                    if (image) {
                        const initialX = regraDe3(sizes.width, e.clientX - bound.left, image?.width);
                        const initialY = regraDe3(sizes.height, e.clientY - bound.top, image?.height);
                        setElements([
                            ...elements,
                            {
                                type: "SIGN",
                                position: { x: e.clientX - bound.left, y: e.clientY - bound.top },
                                positionInitial: { x: initialX, y: initialY },
                            },
                        ]);
                    }
                }}
                src={image?.src}
                width={sizes.width}
                height={sizes.height}
                maxWidth="none"
                onDragEnter={(e) => {
                    e.preventDefault();
                }}
                onDragLeave={(e) => {
                    e.stopPropagation(); //
                    e.preventDefault();
                }}
                onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onDrop={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();

                    if (image) {
                        const initialX = regraDe3(sizes.width, e.clientX - bound.left, image?.width);
                        const initialY = regraDe3(sizes.height, e.clientY - bound.top, image?.height);
                        setElements([
                            ...elements,
                            {
                                type: "SIGN",
                                position: { x: e.clientX - bound.left, y: e.clientY - bound.top },
                                positionInitial: { x: initialX, y: initialY },
                            },
                        ]);
                    }
                }}
            ></Image>
            {elements.map((element, index) => {
                return (
                    <ButtonSign
                        key={index}
                        position="absolute"
                        top={element.position.y}
                        left={element.position.x}
                        onClick={(e) => console.log(e.currentTarget.getClientRects())}
                    ></ButtonSign>
                );
            })}
        </Box>
    );
};
