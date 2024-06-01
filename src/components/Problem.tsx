interface Props{
    num1: number;
    num2: number;
    operation: string;
}

const Problem = ({ num1, num2, operation }: Props) => {
  return (
    <div className="problem">
      {num1} {operation} {num2}
    </div>
  );
};

export default Problem;
