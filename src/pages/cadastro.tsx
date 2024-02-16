import { FunctionComponent } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Textarea,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { Input, InputBase } from './components/Address';

interface IUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: number | undefined;
  description: string;
}

const schema = yup.object({
  firstName: yup.string().required('O primeiro nome é obrigatório'),
  lastName: yup.string().required('O sobrenome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  address: yup.string().required('O endereço é obrigatório'),
  description: yup.string().required('A descrição é obrigatória'),
  phone: yup
    .string()
    .transform(value => (value ? value.replace(/\D/g, '') : ''))
    .matches(/^\d+$/, 'Digite apenas números')
    .min(10, 'O telefone deve ter no mínimo 10 dígitos')
    .max(11, 'O telefone deve ter no máximo 11 dígitos')
    .required('O telefone é obrigatório'),
});

export const Cadastro: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState

  } = useForm<IUserFormData>({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data: IUserFormData) => {
    console.log(data);
  };
  console.log(formState.errors);


  return (
    <>
      <Head>
        <title>Formulários com NextJs e Chakra Ui</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
        backgroundColor="gray.900"
      >
        <Box
          px={12}
          py={12}
          width="full"
          maxWidth="450px"
          textAlign="center"
          boxShadow="lg"
          background="gray.700"
          borderRadius="6px"
        >
          <Heading>
            <Text color="gray.200" fontSize="2xl">
              Registro
            </Text>
          </Heading>
          <form
            action=""
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >

            <Input
              error={formState.errors?.firstName}
              label="Nome"
              type="text"
              reference="firstName"
              placeholder="Nome"
              {...register('firstName')}
            />

            <Input
              error={formState.errors?.lastName}
              label='Seu Sobrenome'
              type='text'
              reference='lastName'
              placeholder="Seu Sobrenome"
              {...register('lastName')}
            />


            <Input
              error={formState.errors?.email}
              label='Seu Email'
              type='text'
              reference='email'
              placeholder="Seu Email"
              {...register('email')}
            />


            <Input
              error={formState.errors?.address}
              label='Seu Endereço'
              type='text'
              reference='address'
              placeholder="Seu Endereço"
              {...register('address')}
            />


            <FormControl display="flex" flexDirection="column" alignItems="flex-start" marginTop="15px" borderColor={formState.errors?.description ? '#E53E3E' : '#4A5568'}>
              {formState.errors?.phone ? (
                <Text as="span" style={{ textTransform: 'capitalize', color: '#E53E3E', marginBottom: '5px' }}>
                  {formState.errors?.phone?.message}
                </Text>
              ) : (
                <FormLabel color="gray.200">
                  Telefone
                </FormLabel>
              )}
              <InputMask
                mask="(99) 99999-9999"
                maskChar=""
                style={{
                  width: "100%",
                  backgroundColor: '#171923',
                  color: '#E2E8F0',
                  borderRadius: 4,
                  outline: 4,
                  padding: "8px 16px",
                  fontSize: "md",
                  border: "1px solid",
                  borderColor: formState.errors?.phone ? '#E53E3E' : '#4A5568',
                }}
                placeholder="Seu Telefone"
                {...register('phone')}
              />

            </FormControl>

            <FormControl
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              marginTop="15px"
              borderColor={formState.errors?.description ? '#E53E3E' : '#4A5568'}
            >
              {formState.errors?.description ? (
                <Text as="span" style={{ textTransform: 'capitalize', color: '#E53E3E', marginBottom: '5px' }}>
                  {formState.errors?.description?.message}
                </Text>
              ) : (
                <FormLabel color='white'>
                  Mensagem
                </FormLabel>
              )}
              <Textarea
                border="1px"
                borderColor={formState.errors?.description ? '#E53E3E' : '#4A5568'}
                outline="none"
                bgColor="gray.900"
                focusBorderColor={formState.errors?.description ? '#E53E3E' : '#4A5568'}
                color="gray.200"
                resize="none"
                placeholder="Sua mensagem"
                {...register('description')}
              />
            </FormControl>

            <Button
              type="submit"
              width="full"
              bgColor="green.400"
              mt={4}
              color="gray.200"
              _hover={{
                color: 'black',
              }}
            >
              Registro com yup
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Cadastro;
