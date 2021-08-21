import { useAppSelector } from "../../../app/hooks";
import { Highlight } from "../highlight/highlight";

export function Highlighter(props: HighlighterProps) {

  const { textChunks, activeChunkIndex, matchingChunksIndices } = useAppSelector(state => {
    return {
      textChunks: state.textSearch.textChunks,
      activeChunkIndex: state.textSearch.activeChunkIndex,
      matchingChunksIndices: state.textSearch.matchingChunksIndices
    }
  })
  
  return (
    <>
      {
        textChunks.map((chunk, index) => matchingChunksIndices.includes(index) ? (
          <Highlight
            key={index}
            text={chunk}
            active={index === activeChunkIndex}
          />
        ) : chunk)
      }
    </>
  );
}

interface HighlighterProps {

}