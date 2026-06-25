type Props = {
  title: string;
};

const Component = ({ title }: Props) => {
  return (
    <>
      <h2>Component</h2>
      <p>{title}</p>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <Component title={4} />
    </div>
  );
}
