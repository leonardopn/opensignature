import { Button, Flex, Heading, Input, VStack } from "@chakra-ui/react";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { api } from "../services/api";
import { setPdf } from "../store/actions/pdf.action";

type HomeProps = {
    setPdf: (pdf: string) => void;
};

const Home = ({ setPdf }: HomeProps) => {
    async function onChangeFile(event: React.ChangeEvent<HTMLInputElement>) {
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
                <Link to="/edit-pdf">
                    <Button colorScheme="pink" w="100%">
                        Processar
                    </Button>
                </Link>
            </VStack>
        </Flex>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPdf(pdf: string) {
            const action = setPdf(pdf);
            dispatch(action);
        },
    };
};

export default connect(null, mapDispatchToProps)(Home);
