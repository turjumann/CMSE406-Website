import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../Contexts/AuthContext";
import useMounted from "../hooks/useMounted";

export default function Registerpage() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const { register, addUsersToDb } = useAuth();
  const mounted = useMounted();
  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Register
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your register logic here
            if (!email || !password) {
              toast({
                description: "Credentials are not valid",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
            setIsSubmitting(true);
            register(email, password)
              .then((response) => {
                console.log(response);
                addUsersToDb(email, checkbox ? "Admin" : "Gov");
              })
              .catch((error) => {
                console.log(error);
                toast({
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              })
              .finally(() => {
                mounted.current && setIsSubmitting(false);
              });
          }}
        >
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <Checkbox
              isChecked={checkbox}
              onChange={(e) => {
                setCheckbox(e.target.checked, checkbox);
              }}
            >
              Admin
            </Checkbox>

            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant="link" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>CMSE406</DividerWithText>
      </Card>
    </Layout>
  );
}
