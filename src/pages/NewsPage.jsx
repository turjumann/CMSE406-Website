import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import {
  Badge,
  chakra,
  Code,
  Container,
  Heading,
  Box,
  Image,
  Button,
  VStack,
  SimpleGrid,
  GridItem,
  Spacer,
  Flex,
  Input,
} from "@chakra-ui/react";
import { Card } from "../components/Card";
import { useAuth } from "../Contexts/AuthContext";
import News from "../components/News";
import AddNews from "../components/AddNews";

export default function NewsPage() {
  const { news } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <Heading>News ({news.length})</Heading>

      <SimpleGrid columns={6}>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem mr={5}>
          <Input
            placeholder="Search news.."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </GridItem>
        <GridItem>
          <AddNews />
        </GridItem>
      </SimpleGrid>
      <Container maxW="container.lg" overflowX="auto" py={4}>
        <SimpleGrid mb={10} columns={3} spacing={5}>
          {news
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.author.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              } else if (
                val.body.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item) => (
              <GridItem>
                <News props={item} />
              </GridItem>
            ))}
        </SimpleGrid>
        <Spacer />
      </Container>
    </Layout>
  );
}
