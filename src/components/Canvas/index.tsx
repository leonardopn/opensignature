import { KonvaEventObject } from "konva/lib/Node";
import { Text as TextType } from "konva/lib/shapes/Text";
import React from "react";
import { Image, KonvaNodeComponent, Layer, Stage, Text } from "react-konva";
import useImage from "use-image";

export const Canvas = () => {
    const [element, setElement] = React.useState<undefined | KonvaNodeComponent<TextType, >>();

    const sizes = {
        width: 1000,
        height: window.innerHeight + 400,
    };

    const PdfImage = () => {
        const [image] = useImage("/teste.png");
        return <Image width={sizes.width} height={sizes.height} image={image} />;
    };

    function addElementInCanvas(event: KonvaEventObject<MouseEvent>) {
        const stage = event.target.getStage();
        console.log(stage?.getPointerPosition());
        const positions = stage?.getPointerPosition();

        setElement(<Text text="Testando" x={positions?.x} y={positions?.y}></Text>);
    }

    return (
        <Stage onClick={addElementInCanvas} width={sizes.width} height={sizes.height}>
            <Layer>
                <PdfImage></PdfImage>
            </Layer>
        </Stage>
    );
};
