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
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { EditIcon } from "@chakra-ui/icons";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Users({ props }) {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="300px"
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

        <Image
          src={
            props.profilePhotoUrl === "default"
              ? "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              : props.profilePhotoUrl
          }
          width="300px"
          height="190px"
          alt={`Picture of ${props.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Box d="flex" alignItems="baseline">
            {props?.age ? (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
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
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {props.name}
            </Box>
            <Tooltip
              label="Edit User"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <chakra.a href={"#"} display={"flex"}>
                <Icon as={EditIcon} h={7} w={7} alignSelf={"center"} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              color={useColorModeValue("gray.800", "white")}
            ></Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Users;
