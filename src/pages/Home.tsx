import { Button, Flex, Heading, Image, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { convertPdfToImages, loadPdf, readFileData } from "../helper/pdf";

export const Home = () => {
    const [file, setFile] = React.useState<File>();
    const [image, setImage] = React.useState<string>();

    async function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target?.files instanceof FileList) {
            const archive = event.target.files[0];
            if (archive) {
                setFile(archive);
                const a = await convertPdfToImages(archive);
                setImage(a[0]);
            } else {
                setFile(undefined);
            }
        }
    }

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
                <Input type="file" onChange={onChangeFile}></Input>
                <Button colorScheme="pink">Processar</Button>
                <img src={image}></img>
            </VStack>
        </Flex>
    );
};
