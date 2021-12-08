import { Button } from "@chakra-ui/react";
import { BsFillPenFill } from "react-icons/bs";

export const ButtonSign = () => {
    return (
        <Button
            draggable="true"
            style={{ background: "var(--chakra-colors-pink-500)" }}
            _hover={{ background: "var(--chakra-colors-blue-600)" }}
            p="2"
            borderRadius="10"
            rightIcon={<BsFillPenFill />}
        >
            Assinar
        </Button>
    );
};
