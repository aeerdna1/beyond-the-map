import { useEffect, useState } from 'react';

/** Types each word, pauses, deletes it, then moves on to the next one. */
export default function Typewriter({ words, typeMs = 90, holdMs = 1600 }: {
  words: string[];
  typeMs?: number;
  holdMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = deleting ? typeMs / 2 : typeMs;
    if (!deleting && text === word) delay = holdMs;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === '') {
        setDeleting(false);
        setI((n) => n + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeMs, holdMs]);

  return (
    <span aria-live="polite">
      <span className="bg-sunset bg-clip-text text-transparent">{text}</span>
      <span className="caret ml-0.5 text-sunset">|</span>
    </span>
  );
}
