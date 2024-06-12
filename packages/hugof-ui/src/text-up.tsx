import { Fragment } from "react";

export type TextUpProps = {
  children?: string;
};

export function TextUp({ children }: TextUpProps) {
  const lines = children?.split("\n");

  const wordsPerLine = lines?.reduce<number[]>(
    (previousValue, _, currentIndex) => {
      const secondPrevWords = lines[currentIndex - 2]?.split(" ").length || 0;
      const prevWords = lines[currentIndex - 1]?.split(" ").length || 0;
      return previousValue.concat([secondPrevWords + prevWords]);
    },
    [],
  );

  return lines?.map((line, lineIndex) => {
    const words = line.split(" ");
    return (
      <span key={lineIndex} className="block">
        {words.map((word, wordIndex) => {
          const prevLineWordsTotal = wordsPerLine?.[lineIndex] || 0;
          const key = prevLineWordsTotal + wordIndex;
          return (
            <Fragment key={key}>
              <span className="inline-block overflow-hidden">
                <span
                  className="ease-&lsqb;cubic-bezier(.25,.13,.19,1)&rsqb; inline-block duration-500 animate-in slide-in-from-bottom"
                  style={{
                    animationDelay: `${100 + 25 * key}ms`,
                  }}
                >
                  {word}
                </span>
              </span>{" "}
            </Fragment>
          );
        })}
      </span>
    );
  });
}
