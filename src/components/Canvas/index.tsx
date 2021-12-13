import { Box, Image } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

interface canvasProps {
    setPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
    rotate: number;
    image: HTMLImageElement | undefined;
    sizes: { width: number; height: number };
}

export const Canvas = ({ setPosition, rotate, image, sizes }: canvasProps) => {
    const [positionAbsolute, setPositionAbsolute] = React.useState({ top: "30px" });

    function setCoordinates(x: number, y: number) {
        setPosition({
            x,
            y,
        });
    }

    React.useEffect(() => {
        switch (rotate) {
            case 0:
                setPositionAbsolute({ top: "30px" });
                break;
            case 180:
                setPositionAbsolute({ top: "30px" });
                break;
            default:
                setPositionAbsolute({ top: "400px" });
                break;
        }
    }, [rotate]);

    return (
        <Box bg="gray" padding="8" position="relative" w={sizes.width + 1000} h={sizes.height + 1000}>
            <Image
                position="absolute"
                onMouseMove={(e) => {
                    const bound = e.currentTarget.getBoundingClientRect();
                    setCoordinates(e.clientX - bound.left, e.clientY - bound.top);
                }}
                style={{
                    transform: `rotate(${rotate}deg)`,
                }}
                src={"/teste2.png"}
                width={sizes.width}
                height={sizes.height}
                maxWidth="none"
            ></Image>
        </Box>
    );
};
