import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { FaSignature } from "react-icons/fa";
import Popup from "reactjs-popup";
import { ButtonDelete } from "../ButtonDelete";

interface ButtonSignProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonInitial = ({ onDeleteElement, ...rest }: ButtonSignProps) => {
    const button = (
        <Button colorScheme="pink" p="2" borderRadius="10" rightIcon={<FaSignature />} {...rest}>
            Rubrica
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
