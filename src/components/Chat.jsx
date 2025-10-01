import { Badge, Box, Container, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../context/appContext";
import Messages from "./Messages";
import { BsChevronDoubleDown } from "react-icons/bs";

export default function Chat() {
  const [height, setHeight] = useState(window.innerHeight - 205);
  const { scrollRef, onScroll, scrollToBottom, isOnBottom, unviewedMessageCount } =
    useAppContext();

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight - 205);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const bgColor = useColorModeValue("white", "gray.800");

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
                >
                  {unviewedMessageCount}
                  <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
                </Badge>
              ) : (
                <BsChevronDoubleDown />
              )
            }
          />
        )}
      </Box>
    </Container>
  );
}


