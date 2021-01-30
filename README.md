# react-renderify
Get an async response from your component.
This library will help you to manage your work with async functions and react components. Components inside component Renderify are visible only when the render function was called. Everything inside renderify component will be hidden again when you resolve the response from your component using useResponse hook.

## Why I created this library?
I am using modals in all my projects and working with it can be taff.
I had multiple conditions:
1. react context needs to work correctly in the modals
2. use modals as async functions
3. pass properties directly to modal components as standard react properties
4. support for TypeScript and no missing properties

To get working version with all of these conditions is not very easy because you need to write a lot of code. We also had multiple ways how to render modals and not all of them are right.
Here are few examples:
1. When you use any ModalsProvider which is at the root of your application you are not able to use react context inside your modals. Because you will lose context from children components. (Modals will be rendered outside of this context)
2. When you have multiple modals in your component and you are trying to synchronize the visible state for all of them you need to write a lot of code

This library is fixing all mentioned problems.
I hope that you will enjoy it.

# Support
If you like my work, do not forget to [:heart: Sponsor me on GitHub](https://github.com/sponsors/seeden) or

[![](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-1.svg)](https://www.buymeacoffee.com/seeden)

Thank you.


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
Because useRenderify is just a wrapper around useRef. You can use useRef and ignore useRenderify. useRenderify will add more functionality in the future and it is recommended to use it. One great feature will be the automatic wait for the first render. The second feature will be passing props to the component.

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

# Support
If you like my work, do not forget to [:heart: Sponsor me on GitHub](https://github.com/sponsors/seeden) or

[![](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-1.svg)](https://www.buymeacoffee.com/seeden)

Thank you.
