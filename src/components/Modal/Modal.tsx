import {
    Button,
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps as ChakraModalProps,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps extends ChakraModalProps {
    title: string;
}

export const Modal = ({ title, ...rest }: ModalProps) => {
    return (
        <ChakraModal {...rest} isCentered>
            <ModalOverlay />
            <ModalContent >
                <ModalHeader color="gray.800">{title}</ModalHeader>
                <ModalCloseButton color="gray.800" />
                <ModalBody >{rest.children}</ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={rest.onClose} width="100px">
                        Cancelar
                    </Button>
                    <Button colorScheme="green" width="100px">
                        Enviar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    );
};
