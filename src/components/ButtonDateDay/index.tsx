import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AiFillCalendar } from "react-icons/ai";
import Popup from "reactjs-popup";
import { ButtonDelete } from "../ButtonDelete";

interface ButtonDateDayProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonDateDay = ({ onDeleteElement, ...rest }: ButtonDateDayProps) => {
    const button = (
        <Button colorScheme="blue" p="2" borderRadius="10" rightIcon={<AiFillCalendar />} {...rest}>
            Dia
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
