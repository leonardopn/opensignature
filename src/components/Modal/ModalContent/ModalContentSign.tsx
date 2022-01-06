import {
    Select,
    Box,
    HStack,
    Input,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    TabsProps,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";

interface ModalContentSignProps extends TabsProps {}

export const ModalContentSign = ({ ...rest }: ModalContentSignProps) => {
    const [initial, setInitial] = React.useState("");
    const [signature, setSignature] = React.useState("");
    const [selectedFont, setSelectedFont] = React.useState("'Licorice', cursive");

    function getInitials(name: string) {
        const regex = /( (\S)|(^\S))/g;
        const b = regex.exec(name);

        console.log(b);
        // const nameArray = name.split(" ");
        // const initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
        return "";
    }

    return (
        <VStack
            spacing="8"
            mb="3"
            border="1px"
            borderColor="gray.200"
            pt="3"
            pl="3"
            pr="3"
            color="gray.700"
            borderRadius="8">
            <Tabs {...rest} isFitted variant="enclosed" width="100%">
                <TabList mb="1em">
                    <Tab>Digitar</Tab>
                    <Tab>Enviar arquivo</Tab>
                    <Tab>Desenhar</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Select mb="3" onChange={(e) => setSelectedFont(e.target.value)}>
                            <option value="'Licorice', cursive">Estilo 1</option>
                            <option value="'Moon Dance', cursive">Estilo 2</option>
                            <option value="'Vujahday Script', cursive">Estilo 3</option>
                        </Select>
                        <Text fontWeight="700" fontSize="16" mb="1">
                            Visualização:
                        </Text>
                        <Box
                            fontSize="45px"
                            fontFamily={selectedFont}
                            border="1px"
                            borderColor="gray.200"
                            bg="gray.50"
                            p="8"
                            borderRadius="8"
                            whiteSpace="nowrap"
                            textOverflow="clip"
                            overflow="auto">
                            <Text fontSize="14" fontFamily="Roboto, sans-serif">
                                Assinatura:
                            </Text>
                            {signature ? signature : "Texto de exemplo"}
                            <Text fontSize="14" fontFamily="Roboto, sans-serif">
                                Rubrica:
                            </Text>
                            {initial ? initial : "Texto de exemplo"}
                        </Box>
                        <HStack spacing="3" mt="8">
                            <Input
                                value={signature}
                                placeholder="Sua assinatura"
                                onChange={(e) => {
                                    setSignature(e.target.value);
                                    setInitial(getInitials(signature));
                                }}></Input>
                            <Input
                                value={initial}
                                placeholder="Sua rubrica"
                                onChange={(e) => setInitial(e.target.value)}></Input>
                        </HStack>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>3!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
};
