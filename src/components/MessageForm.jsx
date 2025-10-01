import { useState } from "react";
import { Input, Stack, IconButton, Box, Container } from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { useAppContext } from "../context/appContext";
import supabase from "../supabaseClient";

export default function MessageForm() {
  const { username, country, session } = useAppContext();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    const messageText = message.trim();
    setMessage("");

    try {
      const { error } = await supabase.from("messages").insert([{
        text: messageText,
        username,
        country,
        is_authenticated: !!session,
      }]);
      if (error) throw error;
    } catch (err) {
      console.error("Error sending message:", err.message || err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Box py="15px" bg="gray.100">
      <Container maxW="600px">
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack direction="row" spacing={2}>
            <Input
              placeholder="Enter a message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              autoFocus
              maxLength={500}
            />
            <IconButton
              aria-label="Send message"
              icon={<BiSend />}
              type="submit"
              colorScheme="teal"
              isLoading={isSending}
              isDisabled={!message.trim()}
              fontSize="20px"
            />
          </Stack>
        </form>
        <Box fontSize="10px" mt="1" color="gray.500">
          Warning: do not share sensitive information
        </Box>
      </Container>
    </Box>
  );
}



