export default function (props) {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg"
        width="2em" height="2em" viewBox='0 0 96 96'
        stroke="currentColor" stroke-width="4" fill="none">
        {props.children}
      </svg>
    </>
  );
}
