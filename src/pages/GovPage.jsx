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
  Input,
  Flex,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const { allUsers, allEcs } = useAuth();
  let patientCounter = 0;
  let docCounter = 0;

  useEffect(() => {
    console.log(allEcs.length);
  }, [allEcs]);
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
                <>
                  <Text>
                    <Badge
                      mr={3}
                      borderRadius="full"
                      px="2"
                      colorScheme="purple"
                    >
                       Hospital 
                    </Badge>
                    {item.hospital}
                  </Text>

                  <Text my={5}>
                    <Badge
                      mr={3}
                      borderRadius="full"
                      px="2"
                      colorScheme="green"
                    >
                      Doctor's License
                    </Badge>
                  </Text>
                  <Image
                    boxSize="200px"
                    src={item?.document}
                    alt="Document"
                    onClick={() => window.open(item.document, "_blank")}
                  />
                </>
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
                         Gender  
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
                  <SimpleGrid columns={2}>
                    {allEcs.map((eCard) => {
                      if (item.email === eCard.userEmail)
                        return (
                          <div>
                            <GridItem>
                              <ExaminationCards props={eCard} />
                            </GridItem>
                          </div>
                        );
                    })}
                  </SimpleGrid>
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
          if (item.approved === "1") {
            docCounter++;
          }
        } else patientCounter++;
      })}
      <Heading>Users Registered</Heading>
      <Badge colorScheme="green" fontSize="lg" mt={10}>
        Doctors {docCounter}
      </Badge>
      <Input
        placeholder="Search doctors.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

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
          {allUsers
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.surname.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.email.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
              if (item.hospital) {
                if (item.approved === "1") {
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
              }
            })}
        </Tbody>
      </Table>

      {/*Second Table */}
      <Badge colorScheme="red" fontSize="lg" mt={4}>
        Patients {patientCounter}
      </Badge>
      <Input
        placeholder="Search patients.."
        onChange={(event) => {
          setSearchTerm2(event.target.value);
        }}
      />
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
          {allUsers
            .filter((val) => {
              if (searchTerm2 == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm2.toLowerCase())
              ) {
                return val;
              } else if (
                val.surname.toLowerCase().includes(searchTerm2.toLowerCase())
              ) {
                return val;
              } else if (
                val.email.toLowerCase().includes(searchTerm2.toLowerCase())
              ) {
                return val;
              } else if (searchTerm != "") {
                if (
                  !val.surname.toLowerCase().includes(searchTerm2.toLowerCase())
                )
                  return "Nothing found";
              }
            })
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
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
