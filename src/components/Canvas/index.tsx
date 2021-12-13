import { Box, Image } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ButtonSign } from "../ButtonSign";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    image: HTMLImageElement | undefined;
    sizes: { width: number; height: number };
}

interface elementsProps {
    type: string;
    position: { x: number; y: number };
}

export const Canvas = ({ setPosition, image, sizes }: canvasProps) => {
    const [elements, setElements] = React.useState<elementsProps[]>([]);

    function setCoordinates(x: number, y: number) {
        setPosition({
            x,
            y,
        });
    }

    return (
        <Box
            position="relative"
            p="8"
            bg="#e9e9e9"
            minWidth={sizes.width + 80}
            minHeight="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Image
                onMouseMove={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();
                    setCoordinates(e.clientX - bound.left, e.clientY - bound.top);
                }}
                onClick={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();
                    console.log({ x: e.clientX - bound.left, y: e.clientY - bound.top });

                    setElements([
                        ...elements,
                        { type: "SIGN", position: { x: e.clientX - bound.left, y: e.clientY - bound.top } },
                    ]);
                }}
                src={"/teste.png"}
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
                    console.log({ x: e.clientX - bound.left, y: e.clientY - bound.top });

                    setElements([
                        ...elements,
                        { type: "SIGN", position: { x: e.clientX - bound.left, y: e.clientY - bound.top } },
                    ]);
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
