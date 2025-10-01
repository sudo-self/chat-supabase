import { useState } from "react";
import { Input, Stack, IconButton, Box, Container } from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { toaster } from "@/components/ui/toaster";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function MessageForm() {
  const { username, country, session } = useAppContext();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const inputBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const bgContainer = useColorModeValue("gray.100", "gray.800");
  const warningColor = useColorModeValue("gray.500", "gray.300");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setIsSending(true);
    setMessage("");

    try {
      const { error } = await supabase.from("messages").insert([
        {
          text: trimmed,
          username,
          country,
          is_authenticated: !!session,
        },
      ]);

      if (error) {
        toaster.create({
          title: "Error sending",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          color: "white",
          background: "#ef4444",
        });
      }
    } catch (err) {
      toaster.create({
        title: "Error sending",
        description: err.message || "Unknown error",
        status: "error",
        duration: 5000,
        isClosable: true,
        color: "white",
        background: "#ef4444",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box py="15px" bg={bgContainer}>
      <Container maxW="600px">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack direction="row" spacing={2}>
            <Input
              name="message"
              placeholder="Enter a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              bg={inputBg}
              border="1px solid"
              borderColor={borderColor}
              autoFocus
              maxLength={500}
            />
            <IconButton
              type="submit"
              aria-label="Send message"
              icon={<BiSend />}
              colorScheme="teal"
              fontSize="20px"
              isLoading={isSending}
              isDisabled={!message.trim()}
            />
          </Stack>
        </form>
        <Box fontSize="10px" mt="1" color={warningColor}>
          Warning: do not share sensitive information
        </Box>
      </Container>
    </Box>
  );
}


