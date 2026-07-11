import { useTypewriter } from '@/hooks/useTypewriter';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypewriterText({ text, speed = 50, delay = 0, className = '' }: TypewriterTextProps) {
  const { displayText, isComplete } = useTypewriter(text, speed, delay);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      {!isComplete && <span className="cursor-blink">|</span>}
    </span>
  );
}
