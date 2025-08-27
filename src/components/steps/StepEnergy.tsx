import SectionTitle from "../ui/SectionTitle";
import ScoreSelect from "../ui/ScoreSelect";
import { getErrorTextFor } from "../FieldError";
import { type Control, type FieldErrors } from "react-hook-form";
import { type FitScoreForm } from "../../schemas/fitScoreSchema";
import { engQs } from "../../config/questions";

type Props = { control: Control<FitScoreForm>; errors: FieldErrors<FitScoreForm> };

export default function StepEnergy({ control, errors }: Props) {
  return (
    <>
      <SectionTitle>Energia</SectionTitle>
      {engQs.map(([name, label]) => (
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
