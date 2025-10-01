import { Alert, Box, Button, Spinner } from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";
import Message from "./Message";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Messages() {
  const { username, loadingInitial, error, getMessagesAndSubscribe, messages } =
    useAppContext();

  const reversed = [...messages].reverse();
  const alertBg = useColorModeValue("red.100", "red.700");
  const alertColor = useColorModeValue("red.800", "red.100");

  if (loadingInitial)
    return (
      <Box textAlign="center" py="20px">
        <Spinner size="xl" />
      </Box>
    );

  if (error)
    return (
      <Box
        mt="20px"
        p="3"
        borderRadius="8px"
        bg={alertBg}
        color={alertColor}
        textAlign="center"
      >
        {error}
        <Button
          ml="8px"
          size="sm"
          colorScheme="red"
          variant="outline"
          onClick={getMessagesAndSubscribe}
        >
          Retry
        </Button>
      </Box>
    );

  if (!messages.length)
    return (
      <Box as="h3" textAlign="center" py="20px" color={useColorModeValue("gray.600", "gray.300")}>
        No messages 😞
      </Box>
    );

  return reversed.map((message) => {
    const isYou = message.username === username;
    return <Message key={message.id} message={message} isYou={isYou} />;
  });
}

