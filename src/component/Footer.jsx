const Footer = () => {
  const resetStatus = async () => {
    const result = await fetch(`${process.env.REACT_APP_API_URL}/resetStatus`);
    return result;
  };
  return (
    <section>
      <button onClick={resetStatus}>Reset Status</button>
    </section>
  );
};

export default Footer;
