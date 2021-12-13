import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { BsFillPenFill } from "react-icons/bs";

interface ButtonSignProps extends ChakraButtonProps {
    
}

export const ButtonSign = ({ ...rest }: ButtonSignProps) => {
    return (
        <Button
            draggable="true"
            style={{ background: "var(--chakra-colors-pink-500)" }}
            _hover={{ background: "var(--chakra-colors-blue-600)" }}
            p="2"
            borderRadius="10"
            rightIcon={<BsFillPenFill />}
            {...rest}
        >
            Assinar
        </Button>
    );
};
