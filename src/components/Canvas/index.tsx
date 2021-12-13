import { Box, Image } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    image: HTMLImageElement | undefined;
    sizes: { width: number; height: number };
}

export const Canvas = ({ setPosition, image, sizes }: canvasProps) => {
    function setCoordinates(x: number, y: number) {
        setPosition({
            x,
            y,
        });
    }

    return (
        <Box
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
                src={"/teste.png"}
                width={sizes.width}
                height={sizes.height}
                maxWidth="none"
            ></Image>
        </Box>
    );
};
