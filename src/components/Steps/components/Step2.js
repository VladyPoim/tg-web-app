import React, { useCallback, useEffect } from 'react';

import { useStepData, useSetStep, maxStageLength } from '../../../state/stepState';

import AssistContainer from '../../AssistContainer/AssistContainer';

import { useTelegram } from '../../../hooks/useTelegram';
import Checkbox from '../../Checkbox/Checkbox';

const Step2 = () => {
    const { tg } = useTelegram();

    const stage = useStepData();
    const setStage = useSetStep();

  
    const nextStage = useCallback(() => {
      if (stage < maxStageLength) {
        setStage(stage + 1)
      }}, [stage, setStage]);

      console.log(tg);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "SKIP",
            color: '#8D9BD7'
        })
    })

    useEffect(() => {
        tg.onEvent('mainButtonClicked', nextStage)
        return () => {
            tg.offEvent('mainButtonClicked', nextStage)
        }
    }, [nextStage, tg])

    return (
    <>
        <AssistContainer>
            We use dynasty instead typical categories.
            Let’s review who are you (^--^)
        </AssistContainer>

        <Checkbox label="development" />
    </>
    );
};

export default Step2;