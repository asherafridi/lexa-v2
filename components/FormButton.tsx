import React from 'react';
import { Button } from './ui/button';
import { CircleDashed } from 'lucide-react';

const FormButton = ({ state, text = 'Submit' }: { state: boolean; text?: string }) => {
  return (
    <Button className="w-full m-2" type="submit" disabled={state}>
      {state ? <CircleDashed className="w-[20px] animate-spin" /> : ''} &nbsp;
      {text}
    </Button>
  );
};

export default FormButton;
