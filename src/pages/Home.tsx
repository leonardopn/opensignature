import { Button, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { convertPdfToImages } from "../helper/pdf";
import { setPdf } from "../store/actions/pdf.action";
import { StateProps } from "../store/types/types.redux";

type HomeProps = {
    pdf: string;
    setPdf: (pdf: string) => void;
};

const Home = ({ pdf, setPdf }: HomeProps) => {
    async function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target?.files instanceof FileList) {
            const archive = event.target.files[0];
            if (archive) {
                const a = await convertPdfToImages(archive);
                setPdf(a[0]);
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
                <img src={pdf} alt=""></img>
            </VStack>
            {console.log(pdf)}
        </Flex>
    );
};

const mapStateToProps = (states: StateProps) => {
    return {
        pdf: states.pdf,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPdf(pdf: string) {
            const action = setPdf(pdf);
            dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
