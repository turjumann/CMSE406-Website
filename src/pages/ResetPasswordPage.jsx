import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import useMounted from "../hooks/useMounted";

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default function ResetPasswordPage() {
  const history = useHistory();

  const { resetPassword } = useAuth();
  const query = useQuery();
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const mounted = useMounted();
  return (
    <Layout>
      <Heading textAlign="center" my={12}>
        Reset password
      </Heading>
      <Card maxW="md" mx="auto" mt={4}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            resetPassword(query.get("oobCode"), newPassword)
              .then((res) => {
                console.log(res);
                toast({
                  description:
                    "Password has been changed. You can login to your account now.",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });

                history.push("/login");
              })
              .catch((err) => {
                console.log(err.message);
                toast({
                  description: err.message,
                  status: "error",
                  duration: 7000,
                  isClosable: true,
                });
              })
              .finally(() => {
                mounted.current && setIsSubmitting(false);
              });
          }}
        >
          <Stack spacing="6">
            <FormControl id="password">
              <FormLabel>New password</FormLabel>
              <Input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                autoComplete="password"
                required
              />
            </FormControl>
            <Button
              isLoading={isSubmitting}
              type="submit"
              colorScheme="primary"
              size="lg"
              fontSize="md"
            >
              Reset password
            </Button>
          </Stack>
        </chakra.form>
      </Card>
    </Layout>
  );
}
