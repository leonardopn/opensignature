import { Flex, Heading, VStack, Divider } from "@chakra-ui/react";
import { ButtonDate } from "../ButtonDate";
import { ButtonDateDay } from "../ButtonDateDay";
import { ButtonDateMonth } from "../ButtonDateMonth";
import { ButtonDateYear } from "../ButtonDateYear";
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
            direction="column">
            <Heading fontSize="2xl" mb="4">
                Opções
            </Heading>
            <VStack spacing="3" alignItems="stretch">
                <ButtonSign onClick={(_) => setSelectedElement("SIGN")} />
                <ButtonInitial onClick={(_) => setSelectedElement("INITIAL")} />
                <Divider></Divider>
                <ButtonDate onClick={(_) => setSelectedElement("DATE")}></ButtonDate>
                <ButtonDateDay onClick={(_) => setSelectedElement("DATE_DAY")}></ButtonDateDay>
                <ButtonDateMonth onClick={(_) => setSelectedElement("DATE_MONTH")}></ButtonDateMonth>
                <ButtonDateYear onClick={(_) => setSelectedElement("DATE_YEAR")}></ButtonDateYear>
            </VStack>
        </Flex>
    );
};
