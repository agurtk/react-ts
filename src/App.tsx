import React from "react";
import "./App.css";

import Input from "./components/Input";
import Form, { type FormHandle } from "./components/Form";
import Button from "./components/Button";
// import Container from "./components/Container";

function App() {
  const input = React.useRef<HTMLInputElement>(null);
  const customFormRef = React.useRef<FormHandle>(null);
  const handleSave = (data: unknown) => {
    const extractedData = data as { name: string; age: string };
    console.log(extractedData);
    customFormRef.current?.clear();
  };
  // const handleSave = (data: unknown) => {
  //   if (
  //     !data ||
  //     typeof data !== "object" ||
  //     !("name" in data) ||
  //     !("age" in data)
  //   ) {
  //     return;
  //   }
  //   console.log(data);
  //   customFormRef.current?.clear();
  // };

  return (
    <main>    
      <Form onSave={handleSave} ref={customFormRef}>
        <Input id="name" label="Your name" type="text" ref={input} />
        <Input id="age" label="Your age" type="number" />
        <p>
          <Button>Save</Button>
        </p>
      </Form>

      {/* 
      <Button>A button</Button>
      Lecture thumbnail
      
      <Button href="https://google.com">A link</Button> */}
      {/* <Container as={Button} >Click me</Container> */}
    </main>
  );
}

export default App;
