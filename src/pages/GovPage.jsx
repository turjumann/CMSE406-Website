import {
  Heading,
  Container,
  Badge,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  SimpleGrid,
  GridItem,
  Divider,
  Tooltip,
  chakra,
  Icon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Contexts/AuthContext";
import { InfoIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import GovUsers from "../components/GovUsers";

export default function GovPage() {
  const [item, setItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const btnRef = useRef();
  const { allUsers } = useAuth();
  console.log(allUsers);
  let patientCounter = 0;
  let docCounter = 0;
  const propsToBePassed = {
    adminName: "Admin",
    adminEmail: "@Email",
    adminImg: "ImgUrl",
  };

  return (
    <Layout>
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
              {item.name}
            </ModalHeader>
            <ModalHeader>{}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{}</ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      {allUsers.map((item) => {
        if (item?.hospital) {
          docCounter++;
        } else patientCounter++;
      })}
      <Heading>Users Registered</Heading>
      <Badge colorScheme="green" fontSize="lg" mt={10}>
        Doctors {docCounter}
      </Badge>
      {/* <SimpleGrid columns={3}>
        {allUsers.map((item) => {
          if (item.hospital) {
            return (
              <GridItem maxW="sm">
                <GovUsers props={item} />
              </GridItem>
            );
          }
        })}
      </SimpleGrid>
      <Badge colorScheme="red" fontSize="lg" mt={4}>
        Patients {patientCounter}
      </Badge>
      <SimpleGrid columns={3}>
        {allUsers.map((item) => {
          if (item.age) {
            return (
              <GridItem maxW="sm">
                <GovUsers props={item} />
              </GridItem>
            );
          }
        })}
      </SimpleGrid> */}
      <Table mb={8} variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Email</Th>
            <Th isNumeric>Info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allUsers.map((item) => {
            if (item.hospital) {
              return (
                <Tr key={item.email}>
                  <Td>{item.name}</Td>
                  <Td>{item.surname}</Td>
                  <Td>{item.email}</Td>
                  <Td isNumeric>
                    <Tooltip
                      label="More info"
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                    >
                      <IconButton
                        onClick={() => {
                          setItem(item);
                          onOpen();
                        }}
                        aria-label="Search database"
                        icon={<InfoIcon />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              );
            }
          })}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>

      <Badge colorScheme="red" fontSize="lg" mt={4}>
        Patients {patientCounter}
      </Badge>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>All users registered</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Email</Th>
            <Th isNumeric>Info</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allUsers.map((item) => {
            if (item.age) {
              return (
                <Tr key={item.email}>
                  <Td>{item.name}</Td>
                  <Td>{item.surname}</Td>
                  <Td>{item.email}</Td>
                  <Td isNumeric>
                    <Tooltip
                      label="More info"
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                    >
                      <IconButton
                        aria-label="Search database"
                        icon={<InfoIcon />}
                      />
                    </Tooltip>
                  </Td>
                </Tr>
              );
            }
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
      <Container maxW="container.lg" overflowX="auto" py={4}></Container>
    </Layout>
  );
}
