const ErrorText = ({ disabled, text }) => {
  const style = {
    display: disabled ? 'none' : 'block',
    backgroundColor: '#FFCCCB',
    padding: '1em',
    borderRadius: '5px'
  };

  return (
    <p id="error-text" style={style}><b>Error: </b>{text}</p>
  );
}

export default ErrorText;