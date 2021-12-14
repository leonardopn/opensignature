import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AiFillCalendar } from "react-icons/ai";
import Popup from "reactjs-popup";
import { ButtonDelete } from "../ButtonDelete";

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
            <ButtonDelete onDeleteElement={onDeleteElement} />
        </Popup>
    ) : (
        button
    );
};
