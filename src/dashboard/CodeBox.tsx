import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBoxProps {
  language: string;
  code: string;
}

const CodeBox: React.FC<CodeBoxProps> = ({ language, code }) => {
  return (
    <div className="code-box">
      <SyntaxHighlighter language={language} style={atomDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBox;