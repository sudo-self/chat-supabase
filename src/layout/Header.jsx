import { Button, Grid, GridItem, Image, useColorModeValue } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import supabase from "../supabaseClient";
import { useAppContext } from "../context/appContext";
import NameForm from "./NameForm";

export default function Header() {
  const { username, setUsername, randomUsername, session } = useAppContext();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("#edf2f7", "gray.700");

  return (
    <Grid
      templateColumns="max-content 1fr min-content"
      justifyItems="center"
      alignItems="center"
      bg={bgColor}
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="4px solid"
      borderColor={borderColor}
      px="2"
      py="1"
    >
      <GridItem justifySelf="start">
        <Image src="/logo.png" height="30px" />
      </GridItem>

      {session ? (
        <>
          <GridItem justifySelf="end" alignSelf="center" mr="4">
            Welcome <strong>{username}</strong>
          </GridItem>
          <Button
            marginRight="4"
            size="sm"
            variant="link"
            onClick={() => {
              const { error } = supabase.auth.signOut();
              if (error) return console.error("error signOut", error);
              const newUsername = randomUsername();
              setUsername(newUsername);
              localStorage.setItem("username", newUsername);
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <GridItem justifySelf="end" alignSelf="center">
            <NameForm />
          </GridItem>
          <Button
            size="sm"
            marginRight="2"
            colorScheme="teal"
            variant="outline"
            onClick={() =>
              supabase.auth.signInWithOAuth({
                provider: "github",
                redirectTo: window.location.origin,
              })
            }
          >
            Login <FaGithub style={{ marginLeft: "4px" }} />
          </Button>
        </>
      )}
    </Grid>
  );
}

