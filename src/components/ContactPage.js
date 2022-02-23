import { useState, lazy, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import styled, { ThemeProvider, css } from "styled-components";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { motion } from "framer-motion";
import { lightTheme, mediaQueries } from "./Themes";
import Loading from "../subComponents/Loading";

//Components
const SocialIcons = lazy(() => import("../subComponents/SocialIcons"));
const HomeBtn = lazy(() => import("../subComponents/HomeButton"));
const LogoComponent = lazy(() => import("../subComponents/LogoComponent"));
const ParticlesComponent = lazy(() =>
  import("../subComponents/ParticlesComponent")
);
const BigTitle = lazy(() => import("../subComponents/BigTitle"));

const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  ${mediaQueries(50)`
            flex-direction:column;  
            padding:8rem 0;
            height:auto;
            &>*:nth-child(5){
              margin-bottom:5rem;
            }
           
  `};
  ${mediaQueries(30)`
           
            &>*:nth-child(5){
              margin-bottom:4rem;
            }
           
  `};
`;

const Main = styled(motion.div)`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};
  padding: 2rem;
  width: 30vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);

  ${mediaQueries(60)`
            height: 55vh;
  `};

  ${mediaQueries(50)`
              width: 50vw;
              height: max-content;

  `};

  font-family: "Ubuntu Mono", monospace;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    color: ${(props) => props.theme.body};
    background-color: ${(props) => props.theme.text};
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(1em + 1vw);

  ${mediaQueries(60)`
          font-size:calc(0.8em + 1vw);
  `};

  ${mediaQueries(50)`
          font-size:calc(1em + 2vw);
          margin-bottom:1rem;
  `};

  ${mediaQueries(30)`
                      font-size:calc(1em + 1vw);
  `};
  ${mediaQueries(25)`
                      font-size:calc(0.8em + 1vw);
                      svg{
                        width:30px;
                        height:30px;
                      }
  `};

  ${Main}:hover & {
    & > * {
      fill: ${(props) => props.theme.body};
    }
  }

  & > *:first-child {
    margin-right: 1rem;
  }
`;

const Shared = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 0px 15px;
  box-sizing: border-box;
  
`;

const Input = styled.input`
  display: block;
  width: 100%;
  ${Shared};
`;

const TextArea = styled.textarea`
  background-color: #eee;
  width: 100%;
  min-height: 100px;
  resize: none;
  ${Shared};
`;

const Button = styled.button`
  display: block;
  background-color: #aaa;
  font-size: 1rem;
  border: 0;
  border-radius: 5px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
  height: 40px;
`;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const [disabled, setDisabled] = useState(false);

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      // Disable form while processing submission
      setDisabled(true);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message
      };

      // Use emailjs to email contact form data
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );

      // Reset contact form fields after submission
      reset();
      // Display success toast
      toastifySuccess();
      // Re-enable form submission
      setDisabled(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Suspense fallback={<Loading />}>
        <Box
          key="contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <LogoComponent theme="light" />
          <HomeBtn />
          <SocialIcons theme="light" />
          <ParticlesComponent theme="light" />

          <Main>
            <Title>
              Send me an Email!
            </Title>
            <Form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
              <Input
                type='text'
                name='name'
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Please enter your name'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Please use 30 characters or less'
                  }
                })}
                placeholder='Name'
              ></Input>
              {errors.name && <span className='errorMessage'>{errors.name.message}</span>}  
              <Input
                type='email'
                name='email'
                {...register('email', {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                })}
                placeholder='Email Address'
              ></Input>
              {errors.email && (
                <span className='errorMessage'>Please enter a valid email address</span>
              )} 
              <Input
                type='text'
                name='subject'
                {...register('subject', {
                  required: {
                    value: true,
                    message: 'Please enter a subject'
                  },
                  maxLength: {
                    value: 75,
                    message: 'Subject cannot exceed 75 characters'
                  }
                })}
                placeholder='Subject'
              ></Input>
              {errors.subject && (
                <span className='errorMessage'>{errors.subject.message}</span>
              )}  
              <TextArea
                rows={3}
                name='message'
                {...register('message', {
                  required: true
                })}
                placeholder='Message'
              ></TextArea>
              {errors.message && <span className='errorMessage'>Please enter a message</span>}
              <Button disabled={disabled} type='submit'>
                Send
              </Button>
            </Form>
            <ToastContainer />
          </Main>
          <BigTitle text="Contact Me" top="80%" right="30%" />
        </Box>
      </Suspense>
    </ThemeProvider>
  );
};

export default ContactPage;