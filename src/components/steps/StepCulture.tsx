import SectionTitle from "../ui/SectionTitle";
import ScoreSelect from "../ui/ScoreSelect";
import { getErrorTextFor } from "../FieldError";
import { type Control, type FieldErrors } from "react-hook-form";
import { type FitScoreForm } from "../../schemas/fitScoreSchema";
import { cultQs } from "../../config/questions";

type Props = { control: Control<FitScoreForm>; errors: FieldErrors<FitScoreForm> };

export default function StepCulture({ control, errors }: Props) {
  return (
    <>
      <SectionTitle>Cultura</SectionTitle>
      {cultQs.map(([name, label]) => (
        <ScoreSelect
          key={String(name)}
          control={control}
          name={name}
          label={label}
          error={getErrorTextFor(errors, name)}
        />
      ))}
    </>
  );
}
