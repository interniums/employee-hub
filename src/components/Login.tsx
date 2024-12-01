import { SubmitHandler, useForm } from 'react-hook-form'
import { Wrapper } from './common/Wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router'
import { TailSpin } from 'react-loader-spinner'
import styled from 'styled-components'
import LoginSchema from '../utils/LoginSchema'
import { showPopup } from '../store/popup.store'

type FormData = z.infer<typeof LoginSchema>

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(LoginSchema) })
  const navigate = useNavigate()
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const email = watch('email').length
    const password = watch('password').length

    if (email && password) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [watch('email'), watch('password')])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('handle sign')
    const user = await LoginUser(data.email, data.password)
    console.log(user)
    if (user) {
      navigate('/notes')
      showPopup('Logged in successfully')
    }
  }

  const LoginUser = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      setLoading(false)
      return user
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setError('password', {
          type: 'manual',
          message: 'Wrong password',
        })
      } else if (error.code === 'auth/user-not-found') {
        setError('email', {
          type: 'manual',
          message: 'User with provided email don`t exist',
        })
      }
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInputsWrapper>
          <StyledHeading>Sign-in</StyledHeading>
          <StyledField>
            <StyledLabel>
              Email<StyledRequiredSpan>*</StyledRequiredSpan>
            </StyledLabel>
            <StyledInput
              $hasError={errors.email?.message?.length ? true : false}
              autoComplete="off"
              type="text"
              {...register('email')}
            />
            <StyledErrorMessage>{errors.email?.message}</StyledErrorMessage>
          </StyledField>
          <StyledField>
            <StyledLabel>
              Password<StyledRequiredSpan>*</StyledRequiredSpan>
            </StyledLabel>
            <StyledInput
              $hasError={errors.password?.message?.length ? true : false}
              autoComplete="off"
              type="password"
              {...register('password')}
            />
            <StyledErrorMessage>{errors.password?.message}</StyledErrorMessage>
          </StyledField>
        </StyledInputsWrapper>
        <StyledField>
          <StyledButton type="submit" disabled={buttonDisabled}>
            {loading ? <TailSpin width={28} height={28} /> : <StyledButtonText>Login</StyledButtonText>}
          </StyledButton>
        </StyledField>
      </StyledForm>
    </Wrapper>
  )
}

const StyledButtonText = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`
const StyledHeading = styled.h1`
  font-weight: 700;
  text-align: center;
  font-size: 2.25rem;
`
const StyledForm = styled.form`
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  padding: 0rem 2.5rem;
  flex-direction: column;
  gap: 0.75rem;
`
const StyledInputsWrapper = styled(Wrapper)`
  gap: 0.75rem;
  flex-grow: 0;
`
const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
`
const StyledLabel = styled.label`
  font-size: 1.25rem;
  font-weight: 700;
`
const StyledRequiredSpan = styled.span`
  color: rgb(215, 0, 0);
  padding-left: 0.5rem;
`
const StyledInput = styled.input<{ $hasError: boolean }>`
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
  outline: ${(props) => (props.$hasError ? '2px solid rgb(200, 0, 0)' : 'none')};
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border: 0.5px solid rgba(0, 0, 0, 0.25);

  &:focus {
    outline: ${(props) => (props.$hasError ? '2px solid rgb(200, 0, 0)' : '1.5px solid black')};
  }
`
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 25);
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 0.35rem;
  padding: 0.75rem 0rem;
  outline: none;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 350ms;

  &:focus {
    outline: 2px solid black;
    outline-offset: 2px;
  }
  &:disabled {
    color: black;
    background-color: white;
    box-shadow: none;
  }
`
const StyledErrorMessage = styled.p`
  color: rgb(200, 0, 0);
  font-size: 1rem;
  font-weight: 700;
`

export default Login
