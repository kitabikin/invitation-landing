import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const letterContainerVariants = {
  before: { transition: { staggerChildren: 0.015 } },
  after: { transition: { staggerChildren: 0.03 } },
};

const letterVariants = {
  before: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
  after: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

const StyledTitleElement = styled(motion.span)`
  position: relative;
  display: inline-block;
  max-width: 100%;
  word-break: break-word;
  z-index: 10;
  background-image: linear-gradient(to right, #07334e, #d71c4f);
  color: white;
`;

function TitleHome(props) {
  const { children } = props;

  return (
    <AnimatePresence>
      <StyledTitleElement
        {...props}
        variants={letterContainerVariants}
        initial={'before'}
        animate={'after'}
        key={children}
        aria-label={children}
      >
        {children.split(' ').map((word, wordI) => (
          <span
            key={`word-${word}-${wordI}`}
            style={{
              display: 'inline-block',
            }}
          >
            {Array.from(word).map((letter, index) => (
              <motion.span
                key={`${index}-${letter}`}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: 'auto',
                }}
                variants={letterVariants}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
            {'\u00A0'}
          </span>
        ))}
      </StyledTitleElement>
    </AnimatePresence>
  );
}

export default TitleHome;
