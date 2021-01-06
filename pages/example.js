import Link from "next/link";

const Example = (props) => {
  return (
    <div>
      <h1>Example page, show doesn't need login</h1>
      <Link href={"/"}>
        <a>Home</a>
      </Link>
    </div>
  );
};

export default Example;
