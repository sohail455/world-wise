import Button from "./Button";
import { useNavigate } from "react-router-dom";
function ButtonBack() {
  const navigate = useNavigate();
  return (
    <Button
      onclick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
      type={"back"}
    >
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
