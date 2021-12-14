import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AiFillDelete, AiFillCalendar } from "react-icons/ai";
import Popup from "reactjs-popup";

interface ButtonDateProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonDate = ({ onDeleteElement, ...rest }: ButtonDateProps) => {
    const button = (
        <Button
            style={{ background: "var(--chakra-colors-pink-500)" }}
            _hover={{ background: "var(--chakra-colors-blue-600)" }}
            p="2"
            borderRadius="10"
            rightIcon={<AiFillCalendar />}
            {...rest}
        >
            Data
        </Button>
    );

    return onDeleteElement ? (
        <Popup
            trigger={() => button}
            position="top center"
            contentStyle={{ maxWidth: "fit-content" }}
            on={["hover"]}
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
