import { Box, Grid, GridItem, Link, useColorModeValue } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import MessageForm from "../components/MessageForm";
import { useColorModeValue as getColor } from "@/components/ui/color-mode";

export default function Footer() {
  const bg = getColor("white", "gray.800");
  const textColor = getColor("gray.800", "gray.100");
  const linkHover = getColor("gray.600", "gray.300");

  return (
    <Box position="fixed" bottom="0" width="100%" bg={bg} color={textColor}>
      <MessageForm />

      <Grid
        gridTemplateColumns="auto 1fr"
        textAlign="center"
        alignItems="center"
        py="4px"
        px="30px"
        height="40px"
      >
        <GridItem justifySelf="start">
          <Link
            href="https://x.com/lightfighter719"
            target="_blank"
            rel="noreferrer"
            _hover={{ color: linkHover }}
            display="inline-flex"
            alignItems="center"
            gap="2px"
          >
            <FaTwitter /> lightfighter719
          </Link>
        </GridItem>
        <GridItem justifySelf="end">
          <Link
            href="https://github.com/sudo-self/chat-supabase"
            target="_blank"
            rel="noreferrer"
            _hover={{ color: linkHover }}
            display="inline-flex"
            alignItems="center"
            gap="2px"
          >
            <FaGithub /> Source code
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
}



