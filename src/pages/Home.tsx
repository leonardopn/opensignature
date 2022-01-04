import { Button, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { api } from "../services/api";
import { setPdf } from "../store/actions/pdf.action";
import { StateProps } from "../store/types/types.redux";

type HomeProps = {
    pdf: string;
    setPdf: (pdf: string) => void;
};

const Home = ({ pdf, setPdf }: HomeProps) => {
    async function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
        console.log("oi");
        if (event.target?.files instanceof FileList) {
            const archive = event.target.files[0];
            const formData = new FormData();
            formData.append("file", archive);

            const { data } = await api.post("/upload", formData, {
                headers: {
                    "Content-Type": `multipart/form-data; `,
                },
            });

            setPdf(data.image);
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
                <img src={"data:image/jpg;base64," + pdf} alt=""></img>
            </VStack>
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
