import { useRef, useState } from 'react';
import { Avatar, ActionIcon, Box, rem, Tooltip } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

export default function ProfilePicture() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        src={imageSrc}
        radius="50%"
        size={120}
        alt="Profile Picture"
        style={{ border: '2px solid #ccc' }}
      />
      <ActionIcon
        onClick={handleClick}
        variant="filled"
        size="md"
        style={{
          position: 'absolute',
          bottom: 4,
          right: 4,
          zIndex: 1,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
        }}
      >
        <IconPencil size="1.1rem" color="#333" />
      </ActionIcon>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </Box>
  );
}
