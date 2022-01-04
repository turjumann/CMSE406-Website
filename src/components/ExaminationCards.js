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

function ExaminationCards({ props }) {
  return (
    <Flex p={25} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        width="500px"
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

        <Text align="left" mt={4} mx={4} fontSize="xs">
          asdasd
        </Text>
        <Text>asdasd</Text>
        <Text>asdasd</Text>
        <Text>asdasd</Text>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {props?.age ? (
              <Badge rounded="full" px="2" fontSize="0.6em" colorScheme="red">
                Patient
              </Badge>
            ) : (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green">
                Doctor
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="1xl"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              {props.name}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default ExaminationCards;
