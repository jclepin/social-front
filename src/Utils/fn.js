const bug = {
  log(...args) {
    process.env.NODE_ENV === "production" || console.log(...args);
  },
};

const printToUser = (message, status) => {
  let statusClass = "";
  if (status === "success") statusClass = "success";

  return message && <div className={`toUser ${statusClass}`}>{message}</div>;
};

export { bug, printToUser };
