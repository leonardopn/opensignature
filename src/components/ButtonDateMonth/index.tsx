import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { AiFillCalendar } from "react-icons/ai";
import Popup from "reactjs-popup";
import { ButtonDelete } from "../ButtonDelete";

interface ButtonDateMonthProps extends ChakraButtonProps {
    onDeleteElement?(): void;
}

export const ButtonDateMonth = ({ onDeleteElement, ...rest }: ButtonDateMonthProps) => {
    const button = (
        <Button colorScheme="green" p="2" borderRadius="10" rightIcon={<AiFillCalendar />} {...rest}>
            Mês
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
