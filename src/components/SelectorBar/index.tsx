import { Flex, Heading, VStack } from "@chakra-ui/react";
import { ButtonInitial } from "../ButtonInitial";
import { ButtonSign } from "../ButtonSign/index";

interface selectorBarProps {
    setSelectedElement: (value: string) => void;
}

export const SelectorBar = ({ setSelectedElement }: selectorBarProps) => {
    return (
        <Flex
            bg="gray.700"
            height="fit-content"
            position="sticky"
            top="8"
            borderBottomRightRadius="8"
            borderTopRightRadius="8"
            p="5"
            direction="column"
        >
            <Heading fontSize="2xl" mb="4">
                Opções
            </Heading>
            <VStack spacing="3">
                <ButtonSign onClick={(_) => setSelectedElement("SIGN")} />
                <ButtonInitial onClick={(_) => setSelectedElement("INITIAL")} />
            </VStack>
        </Flex>
    );
};
