import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Windows 98 Terminal v1.0' },
    { type: 'output', content: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, (args: string[]) => string> = {
    help: () => 'Available commands: help, clear, echo, date, whoami, ls, cat',
    clear: () => {
      setLines([]);
      return '';
    },
    echo: (args) => args.join(' '),
    date: () => new Date().toString(),
    whoami: () => 'guest',
    ls: () => 'about.txt  projects.txt  contact.txt',
    cat: (args) => {
      const file = args[0];
      if (file === 'about.txt') {
        return 'Hi! I am a developer who loves building cool web experiences.';
      } else if (file === 'projects.txt') {
        return '1. Portfolio Website\n2. Todo App\n3. Weather Dashboard';
      } else if (file === 'contact.txt') {
        return 'Email: hello@example.com\nGitHub: github.com/aqshol-claw';
      }
      return `cat: ${file}: No such file or directory`;
    },
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      setLines((prev) => [...prev, { type: 'input' as const, content: '' }]);
      setInput('');
      return;
    }

    const [cmd, ...args] = trimmedInput.split(' ');
    let output = '';

    if (commands[cmd]) {
      output = commands[cmd](args);
    } else {
      output = `'${cmd}' is not recognized as an internal or external command.`;
    }

    setLines((prev) => [
      ...prev,
      { type: 'input' as const, content: trimmedInput },
      ...(output ? [{ type: 'output' as const, content: output }] : []),
    ]);
    setInput('');
  };

  return (
    <div className="terminal" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
      {lines.map((line, index) => (
        <div key={index} className="terminal__line">
          {line.type === 'input' ? (
            <span>
              <span className="terminal__prompt">C:\&gt;</span>
              {line.content}
            </span>
          ) : (
            line.content
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="terminal__input-line">
        <span className="terminal__prompt">C:\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          className="terminal__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
