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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../Contexts/AuthContext";
import { EditIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import Users from "../components/Users";

export default function AdminPanelPage() {
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
      {allUsers.map((item) => {
        if (item?.hospital) {
          docCounter++;
        } else patientCounter++;
      })}
      <Heading>Users Registered</Heading>
      <Badge colorScheme="green" fontSize="lg" mt={10}>
        Doctors {docCounter}
      </Badge>
      <SimpleGrid columns={3}>
        {allUsers.map((item) => {
          if (item.hospital) {
            return (
              <GridItem maxW="sm">
                <Users props={item} />
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
