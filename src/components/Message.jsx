import { Box, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Message({ message, isYou }) {
  const bgColor = isYou ? useColorModeValue("teal.100", "teal.700") : useColorModeValue("gray.200", "gray.600");
  return (
    <Box bg={bgColor} p="3" my="2" borderRadius="md" maxW="80%" alignSelf={isYou ? "flex-end" : "flex-start"}>
      <Text fontSize="sm" fontWeight="bold">{message.username}</Text>
      <Text fontSize="sm">{message.text}</Text>
    </Box>
  );
}


