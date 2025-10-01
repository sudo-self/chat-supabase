import { Badge, Box, Container, IconButton } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useAppContext } from "../context/appContext";
import Messages from "./Messages";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Chat() {
  const [height, setHeight] = useState(window.innerHeight - 205);
  const {
    scrollRef,
    onScroll,
    scrollToBottom,
    isOnBottom,
    unviewedMessageCount,
  } = useAppContext();

  const bgColor = useColorModeValue("white", "gray.800");
  const badgeBg = useColorModeValue("green.500", "green.300");
  const iconColor = useColorModeValue("black", "white");

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 205);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Container maxW="600px" pb="20px">
      <Box
        bg={bgColor}
        p="5"
        overflow="auto"
        borderRadius="10px"
        height={height}
        onScroll={onScroll}
        ref={scrollRef}
        position="relative"
      >
        <Messages />

        {!isOnBottom && (
          <IconButton
            aria-label="Scroll to bottom"
            onClick={scrollToBottom}
            size="sm"
            position="sticky"
            bottom="8px"
            float="right"
            zIndex="1"
            variant="solid"
            colorScheme="teal"
            icon={
              unviewedMessageCount > 0 ? (
                <Badge
                  ml="1"
                  fontSize="0.8em"
                  colorScheme="green"
                  borderRadius="7px"
                  px="2"
                  display="flex"
                  alignItems="center"
                  bg={badgeBg}
                  color={iconColor}
                >
                  {unviewedMessageCount}
                  <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
                </Badge>
              ) : (
                <BsChevronDoubleDown color={iconColor} />
              )
            }
          />
        )}
      </Box>
    </Container>
  );
}




