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
  Image,
  Center,
  Text,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Contexts/AuthContext";
import { InfoIcon, CheckIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import GovUsers from "../components/GovUsers";
import ExaminationCards from "../components/ExaminationCards";

export default function GovPage() {
  const [item, setItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("outside");
  const btnRef = useRef();

  const { allUsers } = useAuth();
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
          size={item?.age ? "xl" : null}
          onClose={onClose}
          finalFocusRef={btnRef}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Badge mr={3} borderRadius="full" px="2" colorScheme="green">
                Name
              </Badge>
              {item.name} {item.surname}
            </ModalHeader>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody align="center"></ModalBody>
            <ModalBody>
              <div align="center">
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={item.profilePhotoUrl}
                  alt="Photo Url"
                />
              </div>
              <Text>
                <Badge mr={3} borderRadius="full" px="2" colorScheme="blue">
                      Email    
                </Badge>
                {item.email}
              </Text>
              {item?.hospital ? (
                <Text>
                  <Badge mr={3} borderRadius="full" px="2" colorScheme="purple">
                     Hospital 
                  </Badge>
                  {item.hospital}
                </Text>
              ) : (
                <div>
                  <Text>
                    <Badge
                      mr={3}
                      borderRadius="full"
                      px="2"
                      colorScheme="purple"
                    >
                            Age      
                    </Badge>
                    {item.age + " years old"}
                  </Text>
                  <Text>
                    <Badge mr={3} borderRadius="full" px="2" colorScheme="pink">
                             Sex      
                    </Badge>
                    {item.sex}
                  </Text>
                </div>
              )}

              {item?.age && (
                <div isScroll={false} align="center">
                  <Badge
                    mr={3}
                    mt={5}
                    borderRadius="full"
                    px="2"
                    colorScheme="purple"
                  >
                    Examination Cards
                  </Badge>
                  <div>
                    <SimpleGrid columns={2}>
                      <GridItem>
                        <ExaminationCards props={item} />
                      </GridItem>
                      <GridItem>
                        <ExaminationCards props={item} />
                      </GridItem>
                      <GridItem>
                        <ExaminationCards props={item} />
                      </GridItem>
                      <GridItem>
                        <ExaminationCards props={item} />
                      </GridItem>
                    </SimpleGrid>
                  </div>
                </div>
              )}
            </ModalBody>
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
      </Table>

      {/*Second Table */}
      <Badge colorScheme="red" fontSize="lg" mt={4}>
        Patients {patientCounter}
      </Badge>
      <Table variant="striped" colorScheme="teal">
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
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Email</Th>
            <Th isNumeric>Info</Th>
          </Tr>
        </Tfoot>
      </Table>
      <Container maxW="container.lg" overflowX="auto" py={4}></Container>
    </Layout>
  );
}
