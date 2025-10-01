import { Box, Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import MessageForm from "../components/MessageForm";

export default function Footer() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const linkColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Box position="fixed" bottom="0" width="100%" zIndex="10">
      <MessageForm />

      <Grid
        gridTemplateColumns="auto 1fr"
        textAlign="center"
        alignItems="center"
        py="4px"
        px="30px"
        height="40px"
        bg={bgColor}
        borderTop="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        color={textColor}
      >
        <GridItem justifySelf="start">
          <a
            href="https://x.com/lightfighter719"
            target="_blank"
            rel="noreferrer"
            style={{ color: linkColor, display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <FaTwitter /> lightfighter719
          </a>
        </GridItem>
        <GridItem justifySelf="end">
          <a
            href="https://github.com/sudo-self/chat-supabase"
            target="_blank"
            rel="noreferrer"
            style={{ color: linkColor, display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <FaGithub /> Source code
          </a>
        </GridItem>
      </Grid>
    </Box>
  );
}

