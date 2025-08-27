import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { FormControl, FormLabel, Select, MenuItem, FormHelperText } from "@mui/material";

type ScoreSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
};

export default function ScoreSelect<T extends FieldValues>({
  control,
  name,
  label,
  error,
}: ScoreSelectProps<T>) {
  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <FormControl fullWidth margin="normal" error={!!error}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value ?? ""}
            displayEmpty
            onChange={(e) => field.onChange(Number(e.target.value))}
          >
            <MenuItem value={-1} disabled>
              Selecione 1–10 (1 = Não concordo · 10 = Concordo plenamente)
            </MenuItem>
            {options.map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
