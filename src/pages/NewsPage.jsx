import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Card } from "../components/Card";
import { useAuth } from "../Contexts/AuthContext";
import News from "../components/News";
import AddNews from "../components/AddNews";

export default function NewsPage() {
  const { news } = useAuth();

  return (
    <Layout>
      <Heading>News ({news.length})</Heading>

      <SimpleGrid columns={6}>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        <GridItem>
          <AddNews />
        </GridItem>
      </SimpleGrid>
      <Container maxW="container.lg" overflowX="auto" py={4}>
        <SimpleGrid mb={10} columns={3} spacing={5}>
          {news.map((item) => (
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
