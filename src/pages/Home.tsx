import { Button, Flex, Heading, VStack, Input } from "@chakra-ui/react";
import React from "react";

export const Home = () => {
    return (
        <Flex height="100vh" flexDirection="column">
            <VStack
                display="flex"
                alignItems="none"
                spacing="4"
                bg="gray.700"
                flexDirection="column"
                m="auto"
                borderRadius="8"
                p="8">
                <Heading alignSelf="center" pb="5" fontSize="25">
                    Selecionar arquivo PDF
                </Heading>
                <Input type="file"></Input>
                <Button colorScheme="pink">Processar</Button>
            </VStack>
        </Flex>
    );
};
