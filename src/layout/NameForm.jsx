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


