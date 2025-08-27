import { TextField } from "@mui/material";
import SectionTitle from "../ui/SectionTitle";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type FitScoreForm } from "../../schemas/fitScoreSchema";
import { getErrorTextFor } from "../FieldError";

type Props = {
  register: UseFormRegister<FitScoreForm>;
  errors: FieldErrors<FitScoreForm>;
  emailTaken: boolean;
};

export default function StepBasicData({ register, errors, emailTaken }: Props) {
  return (
    <>
      <SectionTitle>Dados Básicos</SectionTitle>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        required
        error={!!errors.name}
        helperText={getErrorTextFor(errors, "name")}
        {...register("name")}
      />
      <TextField
        label="E-mail"
        type="email"
        fullWidth
        margin="normal"
        required
        error={!!errors.email || emailTaken}
        helperText={
          emailTaken
            ? "Este e-mail já foi utilizado nesta avaliação."
            : errors.email?.message
        }
        {...register("email")}
      />
    </>
  );
}
