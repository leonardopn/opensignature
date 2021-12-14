import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";

interface ButtonDeleteProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonDelete = ({ onDeleteElement, ...rest }: ButtonDeleteProps) => {
    return (
        <Button
            onClick={onDeleteElement}
            display="flex"
            rightIcon={<AiFillDelete></AiFillDelete>}
            colorScheme="red"
            {...rest}
        >
            Apagar
        </Button>
    );
};
