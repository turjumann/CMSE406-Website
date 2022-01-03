import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
  UnorderedList,
  Tag,
  Stack,
  Image,
  Text,
  SimpleGrid,
  GridItem,
  Divider,
  Center,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import img1 from "../images/1.PNG";
import img2 from "../images/2.PNG";
import img3 from "../images/3.PNG";
import img4 from "../images/4.PNG";
import img5 from "../images/5.PNG";
import img6 from "../images/6.PNG";

export default function Homepage() {
  return (
    <Layout>
      <Center>
        <Heading>Self-Pre-Diagnosis Covid 19 System</Heading>
      </Center>
      <SimpleGrid columns={2} spacing={10}>
        <GridItem colSpan={2}>
          <Center>
            <Badge
              size="md"
              mt={20}
              fontWeight="black"
              mx={2}
              fontSize="4xl"
              px={2}
            >
              About our project
            </Badge>
          </Center>
          <Text fontSize="2xl" ml={7} mt={4}>
            Self-Pre-diagnosis Covid-19 Prediction System is a mobile
            application that helps patients self-identify the risk of Covid-19
            infection without the need of going to a hospital in the first
            place.
          </Text>
          <Center>
            <Badge
              fontWeight="black"
              fontSize="2xl"
              mx={2}
              mt={10}
              px={2}
              mb={10}
              colorScheme="green"
            >
              Some Screenshots for our mobile application
            </Badge>
          </Center>
          <Badge
            fontWeight="black"
            fontSize="2xl"
            mx={2}
            px={2}
            mb={6}
            colorScheme="red"
          >
            Patients
          </Badge>
          <Center>
            <Stack gridGap={100} mt={2} direction="row">
              <Image
                border="1px"
                borderRadius="25"
                boxSize="25%"
                src={img1}
                alt="Dan Abramov"
              />
              <Image
                border="2px"
                borderRadius="25"
                boxSize="25%"
                src={img2}
                alt="Dan Abramov"
              />
              <Image
                border="2px"
                borderRadius="25"
                boxSize="25%"
                src={img3}
                alt="Dan Abramov"
              />
            </Stack>
          </Center>
          <Center>
            <Stack gridGap={100} mt={10} direction="row">
              <Image
                border="2px"
                borderRadius="25"
                boxSize="25%"
                src={img4}
                alt="Dan Abramov"
              />
              <Image
                border="2px"
                borderRadius="25"
                boxSize="25%"
                src={img5}
                alt="Dan Abramov"
              />
              <Image
                border="2px"
                borderRadius="25"
                boxSize="25%"
                src={img6}
                alt="Dan Abramov"
              />
            </Stack>
          </Center>
        </GridItem>
        <GridItem>
          <Text my={6}></Text>
          <Heading>
            <Badge fontWeight="black" mx={2} fontSize="4xl" px={2}>
              Team Members
            </Badge>
            {/* <chakra.span
          fontWeight="black"
          fontStyle="italic"
          fontSize="9xl"
          mx={2}
        >
          v9
        </chakra.span> */}
            {/* <Badge
          fontWeight="black"
          fontSize="4xl"
          mx={2}
          px={2}
          colorScheme="green"
        >
          NEW API
        </Badge> */}
          </Heading>
          <UnorderedList fontSize="3xl" my={4}>
            <ListItem>Ahmad Turjman</ListItem>
            <ListItem>Taha Unsal</ListItem>
            <ListItem>Kiana Kamkar</ListItem>
          </UnorderedList>

          {/* <ListItem>
          <Code fontSize="inherit"> Redirect TO</Code> or Back (keeping the
          state)
        </ListItem>
        <ListItem>
          custom Auth Hook <Code fontSize="3xl">useAuth()</Code>
        </ListItem>
        <ListItem>Loading indicators while sign-in/up</ListItem>
        <ListItem>
          Dark Mode enabled template using
          <Badge
            fontSize="inherit"
            colorScheme="teal"
            mx={2}
            textTransform="capitalize"
            borderRadius="md"
          >
            Chakra UI
          </Badge>
        </ListItem> */}
        </GridItem>
        <GridItem>
          <Badge
            size="md"
            mt={5}
            fontWeight="black"
            mx={2}
            fontSize="4xl"
            px={2}
          >
            Project Supervisor
          </Badge>

          <chakra.pre fontSize="3xl" ml={7} mt={4}>
            Assoc. Prof. Dr.
          </chakra.pre>
          <chakra.pre fontSize="3xl" ml={7}>
            Alexander Chefranov
          </chakra.pre>
        </GridItem>
      </SimpleGrid>
    </Layout>
  );
}
