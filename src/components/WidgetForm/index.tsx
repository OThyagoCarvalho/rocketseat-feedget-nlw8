import { CloseButton } from "../CloseButton";
import bugImgUrl from '../../assets/bug.svg'
import ideaImgUrl from '../../assets/idea.svg'
import thoughtImgUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImgUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImgUrl,
      alt: 'Imagem de uma lâmpada',
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImgUrl,
      alt: 'Imagem de uma nuvem'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm () {

  function handleRestartFeedbackType () {
    setFeedbackSent(false)
    setFeedbackType(null);
  }


  
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      
      { feedbackSent ? 
      
      (<FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedbackType}/>)
      
      : (
        <>
        {!feedbackType ? ( // ! turns falsy into truthy and always displays Feedback options/types rendered by FeedbackTypeStep component!
        <FeedbackTypeStep onFeedbackTypeChange = {setFeedbackType} />
      ) : (
        <FeedbackContentStep 
        feedbackType={feedbackType}
        onFeedbackTypeRestart={handleRestartFeedbackType}
        onFeedbackSent={() => {setFeedbackSent(true)}}
        />
      )}  
      </> 

      )}

      
      <footer className="text-xs text-neutral-400 mt-4"> Feito com ❤ por <a className="underline underline-offset-2" href="https://github.com/OThyagoCarvalho" target="_blank">Thyago</a>  </footer>
    </div>
  );
}