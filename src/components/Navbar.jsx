import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../Contexts/AuthContext";
import Navlink from "./Navlink";
import GovPage from "../pages/GovPage";

export function Navbar() {
  const { toggleColorMode } = useColorMode();
  const toast = useToast();
  const { logout, currentUser, wUser } = useAuth();
  useEffect(() => {
    console.log("Currents: " + wUser);
  }, [wUser]);

  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      mb={4}
    >
      <HStack py={4} justifyContent="flex-end" maxW="container.lg" mx="auto">
        <Navlink to="/" name="CMSE406 - Grad II" size="lg" />
        <Spacer />
        {!currentUser && <Navlink to="/login" name="Login" />}
        {!currentUser && <Navlink to="/register" name="Register" />}
        {currentUser && wUser === "Admin" && (
          <Navlink to="/news-page" name="News" />
        )}
        {currentUser && wUser === "Gov" && (
          <Navlink to="/gov-page" name="Gov Panel" />
        )}
        {currentUser && wUser === "Admin" && (
          <Navlink to="/admin-panel-page" name="Admin Panel" />
        )}
        {currentUser && (
          <Navlink
            to="/logout"
            name="Logout"
            onClick={async (e) => {
              e.preventDefault();
              // handle logout
              logout();
              toast({
                description: "Logged out",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
            }}
          />
        )}
        <IconButton
          variant="outline"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
      </HStack>
    </Box>
  );
}
