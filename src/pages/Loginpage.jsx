import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../Contexts/AuthContext";
import useMounted from "../hooks/useMounted";

export default function Loginpage() {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const toast = useToast();
  const { login } = useAuth();

  const mounted = useMounted();
  const loginAdmin = () => {
    if (!email || !password) {
      toast({
        description: "Credentials are not valid",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsSubmitting2(true);
    login(email, password)
      .then((response) => {
        console.log(response);
        history.push(location.state?.from ?? "/");
        toast({
          description: "Logged in as Admin",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
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
        mounted.current && setIsSubmitting2(false);
      });
  };

  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Login
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            // your login logic here
            if (!email || !password) {
              toast({
                description: "Credentials are not valid",
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            }
            //@Fix login toast for admins and govs (When loggin in as admin with normal button, it says logged in as gov in both cases)
            setIsSubmitting(true);
            login(email, password)
              .then((response) => {
                console.log(response);
                history.push(location.state?.from ?? "/");
                toast({
                  description: "Logged in as Gov Auth",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
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
            {/* <PasswordField /> */}
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button variant="link">
            <Link to="/forgot-password">Forgot password?</Link>
          </Button>
          <Button variant="link" onClick={() => history.push("/register")}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6}>CMSE406</DividerWithText>
      </Card>
    </Layout>
  );
}
