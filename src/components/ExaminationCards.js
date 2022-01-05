import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect } from "react";
function ExaminationCards({ props }) {
  return (
    <Flex p={25} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        width="500px"
        height="240px"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {props?.age ? (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        ) : (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="green.200"
          />
        )}

        <Text
          fontWeight="bold"
          align="center"
          mt={4}
          mx={4}
          mb={4}
          fontSize="xs"
        >
          Symptoms
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.lossOfST === 1 ? "Loss of Smell & Taste" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.fever === 1 ? "Fever" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.cough === 1 ? "Persistent Cough" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.fatigue === 1 ? "Fatigue" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.diarrhea === 1 ? "Diarrhea" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.abdominalPain === 1 ? "Abdominal Pain" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.meals === 1 ? "Skipping Meals" : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.meals === 0 ? " " : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.abdominalPain === 0 ? " " : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.diarrhea === 0 ? " " : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.fatigue === 0 ? " " : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.cough === 0 ? " " : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.fever === 0 ? " " : ""}
        </Text>
        <Text align="left" mx={4} fontSize="xs">
          {props?.lossOfST === 0 ? " " : ""}
        </Text>

        <Box p="6">
          <Box d="flex" justifyContent="flex-end" alignItems="baseline">
            <Badge rounded="full" px="2" fontSize="0.7em" colorScheme="red">
              Probability: {props.probability}%
            </Badge>
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="1xl"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            ></Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ExaminationCards;
