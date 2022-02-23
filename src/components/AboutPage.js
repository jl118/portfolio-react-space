import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { DarkTheme, mediaQueries } from './Themes'
import spacecat from "../assets/Images/spacecat.svg";
import Loading from '../subComponents/Loading';
//Components
const SocialIcons = lazy(() => import('../subComponents/SocialIcons'))
const HomeBtn = lazy(() => import('../subComponents/HomeButton'))
const LogoComponent = lazy(() => import('../subComponents/LogoComponent'))
const ParticlesComponent = lazy(() =>
  import('../subComponents/ParticlesComponent')
)
const BigTitle = lazy(() => import('../subComponents/BigTitle'))


const Box = styled(motion.div)`
  background-color: ${(props) => props.theme.body};
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`

const float = keyframes`
0% { transform: translateY(-10px)         }
    50% { transform: translateY(15px) translateX(15px)        }
    100% { transform: translateY(-10px)         }
`

const SpaceCat = styled(motion.div)`
  position: absolute;
  top: 10%;
  right: 5%;
  animation: ${float} 4s ease infinite;
width:20vw;
  img{
    width:100%;
    height:auto;
  }
`
const Main = styled(motion.div)`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  height: 60vh;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
 backdrop-filter: blur(4px);
  
  position: absolute;
  left: calc(5rem + 5vw);
  top: 10rem;

  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;

  ${mediaQueries(40)`
          width: 60vw;
          height: 50vh;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);


  `};
  ${mediaQueries(30)`
          width: 50vw;
          height: auto;
          backdrop-filter: none;
          margin-top:2rem;

  `};

${mediaQueries(20)`
          padding: 1rem;
          font-size: calc(0.5rem + 1vw);
  `};

`
const AboutPage = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <Suspense fallback={<Loading/>}>
        <Box
          key='skills'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}>
          <LogoComponent theme='dark' />
          <HomeBtn />
          <SocialIcons theme='dark' />
          <ParticlesComponent theme='dark' />

          <SpaceCat
            initial={{ right: '-20%', top: '100%' }}
            animate={{
              right: '5%',
              top: '10%',
              transition: { duration: 2, delay: 0.5 },
            }}>
              <img src={spacecat}  alt="spacecat" />
          </SpaceCat>
          <Main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 1 } }}>
            I'm a MERN stack developer with a Bachelor's Degree in Communication 
            and Media Technology from UNC Chapel Hill positioned to provide unique perspectives on how end users interact with online content. 
            I'm passionate about creating accessible and visually inviting websites and apps.
            <br />
            <br />Pursuing this passion, I earned a certificate in Full Stack Web Development 
            through UNC Chapel Hill, where I expanded my skills in responsive web design. I love using technology to 
            solve problems efficiently, while striving to create a more engaging and intuitive 
            user experience. I want to utilize my skills in communication as part of a 
            quality-driven team to build better experiences on the web.{' '}
          </Main>
          <BigTitle text='ABOUT ME' top='10%' left='5%' />
        </Box>
      </Suspense>
    </ThemeProvider>
  )
}

export default AboutPage
