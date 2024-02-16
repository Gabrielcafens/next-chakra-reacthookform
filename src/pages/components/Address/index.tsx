import type { InputProps as ChakraInputProps } from '@chakra-ui/react';
import {
    Input as ChakraInput,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';

import {
    forwardRef,
    useState,
    type ForwardRefRenderFunction,
    useEffect,
} from 'react';
import type { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';


export interface InputProps extends ChakraInputProps {
    label?: string;
    reference: string;
    type: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | any | null;
}


export const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    label = '',
    reference,
    type,
    error = null,
    placeholder = '',
    ...rest
}: InputProps, ref) => {
    const [value, setValue] = useState(rest.value);

    useEffect(() => {
        setValue(rest.value);
    }, [rest.value]);

    return (
        <FormControl marginTop="15px" isInvalid={!!error} {...rest}>

            {label && (
                <FormLabel color={!error ? 'white' : 'red.500'}>
                    {!error ? label : error.message}
                </FormLabel>
            )}
            <ChakraInput
                type={type}
                value={value}
                id={reference}
                ref={ref}
                isInvalid={!!error}
                border="1px solid"
                borderColor='#4A5563'
                outline="none"
                bgColor="gray.900"
                focusBorderColor="gray.600"
                color="gray.200"
                placeholder={!error ? placeholder : error.message}
                {...rest}
            />
        </FormControl>
    );
};

export const Input = forwardRef(InputBase);