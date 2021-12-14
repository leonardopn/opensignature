import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPenFill } from "react-icons/bs";
import Popup from "reactjs-popup";

interface ButtonSignProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonSign = ({ onDeleteElement, ...rest }: ButtonSignProps) => {
    const button = (
        <Button
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

    return onDeleteElement ? (
        <Popup
            trigger={() => button}
            position="top center"
            contentStyle={{ maxWidth: "fit-content" }}
            on={["hover", "focus"]}
            closeOnDocumentClick
        >
            <Button
                onClick={onDeleteElement}
                display="flex"
                rightIcon={<AiFillDelete></AiFillDelete>}
                style={{ background: "var(--chakra-colors-red-500)" }}
            >
                Apagar
            </Button>
        </Popup>
    ) : (
        button
    );
};
