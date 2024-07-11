import './Problem.css'
interface Props {
  num1: number;
  num2: number;
  operation: string;
}
const Problem = ({ num1, num2, operation}: Props) => {
  return (
    <div style={{ fontFamily: "monospace", textAlign: "right", width: "50px" }} className="problem">
      <div className="first-number">{num1}</div>
      <div className="operation">{operation}</div>
      <div className= "second-number"> {num2}</div>
      <hr style={{ width: "280px", border:"3px solid", borderRadius: "10px"}} />
    </div>
  );
};

export default Problem;
