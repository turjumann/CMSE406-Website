import React, { useRef, useState } from "react";
import { Layout } from "../components/Layout";
import {
  Badge,
  useToast,
  chakra,
  Code,
  Container,
  Heading,
  Box,
  Image,
  Button,
  Textarea,
  Text,
  Input,
  Spacer,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Card } from "../components/Card";

import { useAuth } from "../Contexts/AuthContext";
import { AddIcon } from "@chakra-ui/icons";

function AddNews({ props }) {
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [author, setAuthor] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addNews } = useAuth();

  const initialRef = useRef();
  const finalRef = useRef();
  const toast = useToast();

  const add = () => {
    if (author === "" || title === "" || body === "") {
      toast({
        description: "Please fill all the fields.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    addNews({ author, title, body })
      .then(() => {
        toast({
          description: "Your post has been submitted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((e) => {
        toast({
          description: e.mesage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setAuthor("");
        setTitle("");
        setBody("");
      });
    onClose();
  };
  let handleInputChangeTitle = (e) => {
    let inputValue = e.target.value;
    setTitle(inputValue);
  };
  let handleInputChangeBody = (e) => {
    let inputValue = e.target.value;
    setBody(inputValue);
  };
  let handleInputChangeAuthor = (e) => {
    let inputValue = e.target.value;
    setAuthor(inputValue);
  };

  return (
    <>
      <Box>
        <Button colorScheme="teal" onClick={onOpen}>
          <AddIcon w={6} h={6} />
          <Text ml={4}>Add News</Text>
        </Button>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                value={author}
                onChange={handleInputChangeAuthor}
                placeholder="Author..."
                size="sm"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={handleInputChangeTitle}
                placeholder="Title..."
                size="sm"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Textarea
                height="200"
                value={body}
                onChange={handleInputChangeBody}
                placeholder="Body..."
                size="sm"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={add}
              variant="outline"
              size="sm"
              colorScheme="pink"
              mr={3}
            >
              Post News
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNews;
