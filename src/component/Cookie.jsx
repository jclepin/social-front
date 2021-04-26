import { useState } from "react";
const Cookie = () => {
  const [result, setresult] = useState("not yet");
  const getCookie = async () => {
    const rawResult = await fetch(`${process.env.REACT_APP_API_URL}/cookie`);
    const result = await rawResult.json();
    setresult(result);
  };

  return (
    <section className='background'>
      <p>cookie</p>
      <button onClick={getCookie}>get cookie</button>
      <p>{result}</p>
    </section>
  );
};

export default Cookie;
