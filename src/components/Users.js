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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../Contexts/AuthContext";
import { useEffect, useRef, useState } from "react";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Users({ props, cColor, bColor }) {
  const { patientModifications, doctorModifications, addDocsToDoctors } =
    useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [checkedBox, setCheckedBox] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState("outside");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialRef = useRef();
  const finalRef = useRef();

  const onSave = () => {
    if (props.age) {
      const userMods = {
        name: name,
        surname: surname,
        age: age,
        gender: gender,
        email: props.email,
      };

      if (!name) {
        userMods.name = props.name;
      }
      if (!surname) {
        userMods.surname = props.surname;
      }
      if (!age) {
        userMods.age = props.age;
      }
      if (!gender) {
        userMods.gender = props.sex;
      }

      console.log("if executed for patients");

      patientModifications(props.id, { userMods });
    } else {
      const userMods = {
        name: name,
        surname: surname,
        hospitalName: hospitalName,
        email: props.email,
        approved: checkedBox ? "1" : "0",
        profilePhotoUrl: props.profilePhotoUrl,
      };

      if (!name) {
        userMods.name = props.name;
      }
      if (!surname) {
        userMods.surname = props.surname;
      }
      if (!hospitalName) {
        userMods.hospitalName = props.hospital;
      }
      if (checkedBox == false) {
        userMods.approved = props.approved;
      }
      doctorModifications(props.id, { userMods });
      if (checkedBox == true) {
        addDocsToDoctors(props.id, { userMods });
      }
      console.log("else executed for doctors");
    }

    setHospitalName("");
    setSurname("");
    setName("");
    setAge("");
    setGender("");

    onClose();

    toast({
      description: "User updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div>
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User modification</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder={props.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  required
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Surname</FormLabel>
                <Input
                  placeholder={props.surname}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  name="surname"
                  required
                />
              </FormControl>
              {props?.age ? (
                <>
                  <FormControl mt={4}>
                    <FormLabel>Age</FormLabel>
                    <Input
                      placeholder={props.age}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      name="age"
                      required
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Gender</FormLabel>
                    <Input
                      placeholder={props.sex}
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      required
                    />
                  </FormControl>
                </>
              ) : (
                <></>
              )}
              {props?.hospital ? (
                <>
                  <FormControl mt={4}>
                    <FormLabel>Hospital Name</FormLabel>
                    <Input
                      placeholder={props.hospital}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      name="hospitalName"
                      required
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Document</FormLabel>
                    <Image
                      boxSize="200px"
                      src={props?.document}
                      alt="Document"
                      onClick={() => window.open(props.document, "_blank")}
                    />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>
                      Approve Doctor  
                      <Checkbox
                        pt={1.5}
                        isChecked={
                          props?.approved === "1" ? !checkedBox : checkedBox
                        }
                        onChange={(e) => {
                          setCheckedBox(e.target.checked);
                        }}
                      ></Checkbox>
                    </FormLabel>
                  </FormControl>
                </>
              ) : (
                <></>
              )}
            </ModalBody>

            <ModalFooter>
              <Button onClick={onSave} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>

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
              bg={cColor}
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
                <Badge
                  rounded="full"
                  px="2"
                  fontSize="0.8em"
                  colorScheme={bColor}
                >
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
                  <Icon
                    as={EditIcon}
                    h={7}
                    w={7}
                    alignSelf={"center"}
                    onClick={onOpen}
                  />
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
    </div>
  );
}

export default Users;
