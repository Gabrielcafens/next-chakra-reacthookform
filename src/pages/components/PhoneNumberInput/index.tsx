import type { InputProps as ChakraInputProps } from '@chakra-ui/react';
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';
import {
  forwardRef,
  useState,
  type ForwardRefRenderFunction,
  useEffect,
} from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import type { IconType } from 'react-icons';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { inputMask } from '~/constants';

interface InputProps extends ChakraInputProps {
  LeftIcon?: IconType;
  label?: string;
  reference: string;
  type: string;
  mask?: string;
  hasRightAddon?: boolean;
  RightAddonIcon?: IconType;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | any | null;
}

export const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = (
  {
    LeftIcon,
    label = '',
    mask = '',
    reference,
    type,
    hasRightAddon = false,
    RightAddonIcon,
    error = null,
    ...rest
  }: InputProps,
  ref
) => {
  const [seePassword, setSeePassword] = useState(false);
  const [value, setValue] = useState(rest.value);

  useEffect(() => {
    setValue(rest.value);
  }, [rest.value]);

  return (
    <FormControl width="100%" isInvalid={!!error} {...rest}>
      {label && (
        <FormLabel color={!error ? 'black' : 'red.500'}>
          {!error ? label : error.message}
        </FormLabel>
      )}

      <InputGroup
        border="1px solid"
        borderColor={!error ? 'gray' : 'red.500'}
        borderRadius={8}
      >
        {LeftIcon && (
          <InputLeftElement
            pointerEvents="none"
            height="100%"
            transition="1s ease"
          >
            <LeftIcon size={18} color={!error ? 'black' : 'red'} />
          </InputLeftElement>
        )}

        <ChakraInput
          {...rest}
          bg="transparent"
          color="black"
          autoComplete="off"
          autoCapitalize="off"
          type={seePassword ? 'text' : type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(inputMask(e.target.value, mask))
          }
          id={reference}
          ref={ref}
          isInvalid={!!error}
          marginTop={0}
          value={value}
          border="none"
          focusBorderColor="transparent"
        />

        {type === 'password' && (
          <InputRightAddon bg="gray-700" border={0}>
            <IconButton
              onClick={() => setSeePassword(!seePassword)}
              _hover={{ bg: 'gray-700' }}
              size="sm"
              h="100%"
              bg="gray-700"
              aria-label="see-pass"
            >
              {!seePassword ? (
                <FiEyeOff size={20} color={!error ? 'black' : 'red'} />
              ) : (
                <FiEye size={20} color={!error ? 'black' : 'red'} />
              )}
            </IconButton>
          </InputRightAddon>
        )}

        {hasRightAddon && RightAddonIcon && (
          <InputRightAddon
            bg="white"
            borderLeftColor="white"
            borderRightRadius={50}
          >
            <IconButton
              onClick={() => {}}
              _hover={{ bg: 'white' }}
              size="sm"
              w="100%"
              color="color"
              borderRightRadius={50}
              aria-label="see-pass"
            >
              <RightAddonIcon />
            </IconButton>
          </InputRightAddon>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);