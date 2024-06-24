import React from "react";
import Form, { FormHandle } from "./UI/Form";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { useTimersContext } from "../store/timersContext";

const AddTimer = () => {
  const formRef = React.useRef<FormHandle>(null);
  const { addTimer } = useTimersContext();

  const handleSaveTimer = (data: unknown) => {
    const extractedData = data as { name: string; duration: string };
    addTimer({ name: extractedData.name, duration: +extractedData.duration });
    formRef.current?.clear();
  };

  return (
    <Form ref={formRef} onSave={handleSaveTimer} id="add-timer-form">
      <Input type="text" label="name" id="name" />
      <Input type="number" label="duration" id="duration" />
      <p>
        <Button>Add Timer</Button>
      </p>
    </Form>
  );
};

export default AddTimer;
