export default function (props) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="64" height="64" viewBox='0 0 512 512'>
        {props.children}
      </svg>
    </>
  );
}
