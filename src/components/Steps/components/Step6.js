import React, { useCallback, useEffect, useState } from "react";

import { useStepData, useSetStep, maxStageLength } from "state/stepState";

import ModalContainer from "../../ModalContainer/ModalContainer";

import { useTelegram } from "hooks/useTelegram";

import CheckedBadge  from "assets/svg/checkedBadge.svg";
import Checkbox from "components/Checkbox/Checkbox";


const Step6 = () => {
    const updateFrequencyoptions = {
        realTime: 'real time updates',
        weekly: 'weekly compilation'
    }
  const [ updateFrequency, setUpdateFrequency ] = useState(updateFrequencyoptions.realTime);

  const { tg } = useTelegram();

  const stage = useStepData();
  const setStage = useSetStep();

  const nextStage = useCallback(() => {
    if (stage < maxStageLength) {
      setStage(stage + 1);
    }
  }, [stage, setStage]);

  useEffect(() => {
    tg.MainButton.setParams({
        text: "NEXT",
        color: "#04BEFE",
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", nextStage);
    return () => {
      tg.offEvent("mainButtonClicked", nextStage);
    };
  }, [nextStage, tg]);

  console.log(updateFrequency)

  return (
    <>
    <ModalContainer>
      <div>
          <img style={{width: 40, margin: '0 auto'}} src={CheckedBadge} alt="checked" />
          <p>All done! You can change update frequency:</p>
        </div>
    </ModalContainer>  

    <div style={{display: 'flex', flexDirection: 'row', aligmItems: 'center', gap: 10}}>
    <Checkbox
          checked={updateFrequencyoptions.realTime === updateFrequency}
          label='real time updates'
          background
          onChange={   (value) => {
            const isChecked = value.checked;
            !isChecked && setUpdateFrequency(updateFrequencyoptions.realTime);
          }}
        />

        <Checkbox
          checked={updateFrequencyoptions.weekly === updateFrequency}
          label='weekly compilation'
          background
          onChange={   (value) => {
            const isChecked = value.checked;
            !isChecked && setUpdateFrequency(updateFrequencyoptions.weekly);
          }}
        />
        </div> 
    </>
  );
};

export default Step6;