'use client'

import { useEffect, useRef, useState } from "react";
import { Input, Stack, IconButton, Text } from "@chakra-ui/react";
import { BiSave, BiEdit } from "react-icons/bi";
import { useAppContext } from "../context/appContext";

export default function NameForm() {
  const { username, setUsername } = useAppContext();
  const [newUsername, setNewUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef(null);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Keep local state in sync if username changes externally
  useEffect(() => {
    setNewUsername(username);
  }, [username]);

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleSubmit = (e) => {
    e?.preventDefault();

    const cleanedUsername = newUsername.trim();
    if (!cleanedUsername) {
      setNewUsername(username);
      setIsEditing(false);
      return;
    }

    setUsername(cleanedUsername);
    localStorage.setItem("username", cleanedUsername);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" align="center" spacing={2}>
        {isEditing ? (
          <Input
            name="username"
            placeholder="Choose a username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            ref={inputRef}
            size="sm"
            maxLength={15}
            bg="gray.100"
            border="1px solid"
            borderColor="gray.300"
          />
        ) : (
          <Text
            onClick={toggleEditing}
            cursor="pointer"
            fontSize="sm"
            fontWeight="medium"
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
          onClick={(e) => {
            if (isEditing) handleSubmit(e);
            else toggleEditing();
          }}
        />
      </Stack>
    </form>
  );
}

