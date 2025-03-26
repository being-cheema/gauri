import React from 'react';
import { motion } from 'framer-motion';

interface MessageProps {
  text: string;
  delay: number;
  show?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, delay, show = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, delay }}
      className="text-center"
    >
      <p className="text-2xl md:text-4xl font-serif text-purple-400 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

export default Message;
