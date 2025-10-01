'use client'

import { useEffect, useRef, useState } from "react";
import { Input, Stack, IconButton, Text } from "@chakra-ui/react";
import { BiSave, BiEdit } from "react-icons/bi";
import { useAppContext } from "../context/appContext";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function NameForm() {
  const { username, setUsername } = useAppContext();
  const [newUsername, setNewUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const inputBg = useColorModeValue("gray.100", "gray.700");
  const inputBorder = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    setNewUsername(username);
  }, [username]);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const cleaned = newUsername.trim();
    if (!cleaned) {
      setNewUsername(username);
      setIsEditing(false);
      return;
    }
    setUsername(cleaned);
    localStorage.setItem("username", cleaned);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" align="center" spacing={2}>
        {isEditing ? (
          <Input
            ref={inputRef}
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Choose a username"
            size="sm"
            maxLength={15}
            bg={inputBg}
            border="1px solid"
            borderColor={inputBorder}
            color={textColor}
            _placeholder={{ color: placeholderColor }}
          />
        ) : (
          <Text
            onClick={toggleEditing}
            cursor="pointer"
            fontSize="sm"
            fontWeight="medium"
            color={textColor}
          >
            Welcome <strong>{newUsername}</strong>
          </Text>
        )}
        <IconButton
          size="sm"
          variant="outline"
          colorScheme="teal"
          aria-label={isEditing ? "Save username" : "Edit username"}
          icon={isEditing ? <BiSave /> : <BiEdit />}
          onClick={(e) => (isEditing ? handleSubmit(e) : toggleEditing())}
        />
      </Stack>
    </form>
  );
}




