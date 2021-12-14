import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { BsFillPenFill } from "react-icons/bs";
import Popup from "reactjs-popup";
import { ButtonDelete } from "../ButtonDelete";

interface ButtonSignProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonSign = ({ onDeleteElement, ...rest }: ButtonSignProps) => {
    const button = (
        <Button colorScheme="pink" p="2" borderRadius="10" rightIcon={<BsFillPenFill />} {...rest}>
            Assinar
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
