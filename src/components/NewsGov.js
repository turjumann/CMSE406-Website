import React, { useRef, useState } from "react";
import { Layout } from "./Layout";
import {
  Badge,
  chakra,
  Code,
  Container,
  Heading,
  Box,
  Image,
  Button,
  Spacer,
  useDisclosure,
  ModalFooter,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { Card } from "./Card";
import { useAuth } from "../Contexts/AuthContext";

function NewsGov({ props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const btnRef = useRef();

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <>
        <Modal
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Badge mr={3} borderRadius="full" px="2" colorScheme="green">
                Author
              </Badge>
              {props.author}
            </ModalHeader>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{props.body}</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="green">
            Author
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.author}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.title}
        </Box>

        <Box>
          <Box mt="3" as="span" fontSize="sm" noOfLines={4}>
            {props.body}
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Spacer />
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            <Button onClick={onOpen} variant="outline" size="sm">
              Read More...
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NewsGov;
