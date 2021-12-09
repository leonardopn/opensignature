import { Box } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import useImage from "use-image";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
}

export const Canvas = ({ setPosition }: canvasProps) => {
    const [imageButton] = useImage("/assets/button_sign.png");
    const [imagePdf] = useImage("/teste2.png");

    function setCoordinates(x: number, y: number) {
        setPosition({
            x,
            y,
        });
    }

    return (
        <Box
            backgroundImage={"/teste2.png"}
            width={imagePdf?.width}
            height={imagePdf?.height}
            onMouseMove={(e) => {
                const bound = e.currentTarget.getBoundingClientRect();
                setCoordinates(e.clientX - bound.left, e.clientY - bound.top);
            }}
        ></Box>
    );
};
