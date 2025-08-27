import { useState } from "react";
import { checkEmailExists } from "../services/candidates"; 

export function useEmailCheck() {
  const [checking, setChecking] = useState(false);
  const [taken, setTaken] = useState(false);

  const verify = async (email: string) => {
    setChecking(true);
    const exists = await checkEmailExists(email);
    setTaken(exists);
    setChecking(false);
    return !exists; 
  };

  return { checking, taken, verify, setTaken };
}
