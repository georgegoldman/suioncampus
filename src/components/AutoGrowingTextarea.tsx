import { useRef, useEffect } from 'react';

const AutoGrowingTextarea = ({ name, value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleInput = (e) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    onChange(e); // This correctly updates parent state
  };

  return (
    <textarea
      ref={textareaRef}
      name={name}
      className="w-full border border-gray-300 rounded px-3 py-2 overflow-hidden resize-none"
      value={value}
      onChange={handleInput}
    />
  );
};


export default AutoGrowingTextarea;
