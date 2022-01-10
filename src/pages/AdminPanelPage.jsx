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
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Contexts/AuthContext";
import { EditIcon } from "@chakra-ui/icons";
import { IconButton, Spacer } from "@chakra-ui/react";
import Users from "../components/Users";

export default function AdminPanelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [searchTerm3, setSearchTerm3] = useState("");
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
      {allUsers.map((item) => {
        if (item?.hospital) {
          docCounter++;
        } else patientCounter++;
      })}
      <Heading>Users Registered</Heading>
      <Badge colorScheme="green" fontSize="lg" mt={10}>
        Doctors {docCounter}
      </Badge>

      <Spacer />
      <Flex flexDirection="row" mt={10}>
        <Badge colorScheme="green" fontSize="sm" h="6">
          Approved Doctors
        </Badge>
        <Spacer />
        <Input
          width="80"
          placeholder="Search approved doctors.."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </Flex>
      <SimpleGrid columns={3}>
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
            if (item?.approved === "1") {
              if (item.hospital) {
                return (
                  <>
                    <GridItem maxW="sm">
                      <Users
                        props={item}
                        cColor={"green.200"}
                        bColor={"green"}
                      />
                    </GridItem>
                  </>
                );
              }
            }
          })}
      </SimpleGrid>
      <Flex flexDirection="row" mt={10}>
        <Badge colorScheme="cyan" fontSize="sm" h="6">
          Unapproved Doctors
        </Badge>
        <Spacer />
        <Input
          width="80"
          placeholder="Search Unapproved doctors.."
          onChange={(event) => {
            setSearchTerm2(event.target.value);
          }}
        />
      </Flex>
      <SimpleGrid columns={3}>
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
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            if (item?.approved === "0" || item.approved === undefined) {
              if (item.hospital) {
                return (
                  <>
                    <GridItem maxW="sm">
                      <Users props={item} cColor={"cyan.200"} bColor={"cyan"} />
                    </GridItem>
                  </>
                );
              }
            }
          })}
      </SimpleGrid>
      <Flex flexDirection="row" mt={10} w="full" h="full">
        <Badge colorScheme="red" fontSize="sm" h="6">
          Patients
        </Badge>
        <Spacer />
        <Input
          width="80"
          placeholder="Search patients.."
          onChange={(event) => {
            setSearchTerm3(event.target.value);
          }}
        />
      </Flex>
      <SimpleGrid columns={3}>
        {allUsers
          .filter((val) => {
            if (searchTerm3 == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm3.toLowerCase())
            ) {
              return val;
            } else if (
              val.surname.toLowerCase().includes(searchTerm3.toLowerCase())
            ) {
              return val;
            } else if (
              val.email.toLowerCase().includes(searchTerm3.toLowerCase())
            ) {
              return val;
            }
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => {
            if (item.age) {
              return (
                <GridItem maxW="sm">
                  <Users props={item} />
                </GridItem>
              );
            }
          })}
      </SimpleGrid>
      {/* <Table variant="striped" colorScheme="teal">
        <TableCaption>All users registered</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Surname</Th>
            <Th>Email</Th>
            <Th isNumeric>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allUsers.map((item) => {
            return (
              <Tr key={item.email}>
                <Td>{item.name}</Td>
                <Td>{item.surname}</Td>
                <Td>{item.email}</Td>
                <Td isNumeric>
                  <IconButton
                    aria-label="Search database"
                    icon={<EditIcon />}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table> */}
      <Container maxW="container.lg" overflowX="auto" py={4}></Container>
    </Layout>
  );
}
