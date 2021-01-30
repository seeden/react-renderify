# react-renderify
Get an async response from your component.
This library will help you to manage your work with async functions and react components. Components inside component Renderify are visible only when the render function was called. Everything inside renderify component will be hidden again when you resolve the response from your component using useResponse hook.

## Example
Simple example with your modal library.

UserProfile.tsx
```tsx
import { Renderify, useRenderify } from 'react-renderify';
import ConfirmationDialog from './ConfirmationDialog';

type Props = {
  user: {
    username: string;
  };
};

function UserProfile(props: Props) {
  const { 
    user: {
      username,
    },
  } = props;

  const deleteUserConfirmation = useRenderify();

  async function handleDeleteUser() {
    const isDeleteConfirmed = await deleteUserConfirmation.render();

    if (isDeleteConfirmed) {
      // TODO: call delete service and remove user with username: username
    }
  }


  return (
    <>
      <h1>Hi {username}</h1>

      <button onClick={handleDeleteUser} type="button">
        Delete User
      </button>

      <Renderify ref={deleteUserConfirmation.ref}>
        <ConfirmationDialog>
          Do you want to remove user: {username}?
        </ConfirmationDialog>
      </Renderify>
    <>
  );
}
```

ConfirmationDialog.tsx
```tsx
import { ReactNode } from 'react';
import { useResponse } from 'react-renderify';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'my-modal-library';

type Props = {
  title?: ReactNode;
  children: ReactNode;
};

export default function ConfirmationDialog(props: Props) {
  const { title, children } = props;
  const { resolve } = useResponse();

  function handleCancel() {
    resolve(false);
  }

    function handleConfirm() {
    resolve(true);
  }

  return (
    <Modal onClose={handleCancel} isOpen>
      {title && (
        <ModalHeader>{title}</ModalHeader>
      )}
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <button onClick={handleCancel}>
          Cancel
        <button>
        <button onClick={handleConfirm}>
          OK
        <button>
      </ModalFooter>
    </Modal>
  );
}
```

## Example without useRenderify
Because useRenderify is just a wrapper around useRef. You can use useRef and ignore useRenderify. useRenderify will add more functionality in the future and it is recommended to use it. One great feature will be the automatic wait for the first render. 

UserProfile.tsx
```tsx
import { useRef } from 'react';
import { Renderify } from 'react-renderify';
import ConfirmationDialog from './ConfirmationDialog';

type Props = {
  user: {
    username: string;
  };
};

function UserProfile(props: Props) {
  const { 
    user: {
      username,
    },
  } = props;

  const deleteUserRef = useRef(null);

  async function handleDeleteUser() {
    if (deleteUserRef.current) {
      const isDeleteConfirmed = await deleteUserRef.current.render();

      if (isDeleteConfirmed) {
        // TODO: call delete service and remove user with username: username
      }
    }
  }


  return (
    <>
      <h1>Hi {username}</h1>

      <button onClick={handleDeleteUser} type="button">
        Delete User
      </button>

      <Renderify ref={deleteUserRef}>
        <ConfirmationDialog>
          Do you want to remove user: {username}?
        </ConfirmationDialog>
      </Renderify>
    <>
  );
}
```
