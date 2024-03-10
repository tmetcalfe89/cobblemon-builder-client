import { Button, Divider, FormControlLabel, Grid, Stack, Switch, TextField } from "@mui/material";
import Species from "../types/Species";
import WithId from "../types/WithId";
import { Controller, useForm } from "react-hook-form";
import NumberField from "../components/NumberField";
import { yupResolver } from "@hookform/resolvers/yup";
import SpeciesSchema from "../schemas/SpeciesSchema";
import PokemonTypes from "../data/pokemonTypes";
import Autocomplete from "../components/Autocomplete";
import EggGroups from "../data/eggGroups";
import ExperienceGroup from "../data/experienceGroups";
import Select from "../components/Select";

interface SpecieEditorProps {
  specie: WithId<Species>;
  onUpdate: (newData: WithId<Species>) => void;
}

export default function SpecieEditor({ specie, onUpdate }: SpecieEditorProps) {
  const { register, handleSubmit, control } = useForm({
    defaultValues: specie,
    resolver: async (raw, context, options) => {
      const data = SpeciesSchema.cast(raw)
      // you can debug your validation schema here
      console.log("formData", data)
      console.log(
        "validation result",
        await yupResolver(SpeciesSchema)(data, context, options)
      )
      return yupResolver(SpeciesSchema)(data, context, options)
    }
  })

  return <Stack gap={1}>
    <NumberField {...register("species.nationalPokedexNumber")} label="National Pokedex Number" />
    <TextField multiline {...register("species.pokedex")} label="Pokedex Description" />
    <Stack direction="row" sx={{ "& > *": { flexGrow: 1, minWidth: 0, flexBasis: 0 } }}>
      <Controller
        control={control}
        name="species.primaryType"
        render={({ field: { ref: _ref, ...field } }) => <Autocomplete options={PokemonTypes} label="Primary Type" {...field} disableClearable />}
      />
      <Controller
        control={control}
        name="species.secondaryType"
        render={({ field: { ref: _ref, ...field } }) => <Autocomplete options={PokemonTypes} label="Secondary Type" {...field} />}
      />
    </Stack>
    <Divider>Base Stats</Divider>
    <Grid container rowGap={1}>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.baseStats.hp")} label="HP" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.baseStats.attack")} label="ATK" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.baseStats.defence")} label="DEF" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.baseStats.speed")} label="SPD" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.baseStats.special_attack")} label="SPATK" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.baseStats.special_defence")} label="SPDEF" />
      </Grid>
    </Grid>
    <Divider />
    <NumberField label="Catch Rate" {...register("species.catchRate")} />
    <NumberField label="Male Ratio" {...register("species.maleRatio")} />
    <Stack direction="row" sx={{ "& > *": { flexGrow: 1, minWidth: 0, flexBasis: 0 } }}>
      <Controller
        control={control}
        name="species.shoulderMountable"
        render={({ field: { ref: _ref, value, ...field } }) => <FormControlLabel control={<Switch {...field} checked={value} />} label="Shoulder Mountable" />}
      />
      <Controller
        control={control}
        name="species.dynamaxBlocked"
        render={({ field: { ref: _ref, value, ...field } }) => <FormControlLabel control={<Switch {...field} checked={value} />} label="Dynamax Blocked" />}
      />
    </Stack>
    <Stack direction="row" sx={{ "& > *": { flexGrow: 1, minWidth: 0, flexBasis: 0 } }}>
      <NumberField label="Base Exp Yield" {...register("species.baseExperienceYield")} />
      <Controller
        control={control}
        name="species.experienceGroup"
        render={({ field: { ref: _ref, ...field } }) => <Select options={ExperienceGroup.map((expGroup) => ({ id: expGroup, name: expGroup }))} label="Experience Group" {...field} />}
      />
    </Stack>
    <Stack direction="row" sx={{ "& > *": { flexGrow: 1, minWidth: 0, flexBasis: 0 } }}>
      <Controller
        control={control}
        name="species.eggGroups"
        render={({ field: { ref: _ref, onChange, ...fields } }) =>
          <Autocomplete
            {...fields}
            multiple
            options={EggGroups}
            label="Egg Groups"
            onChange={(_, data) => {
              console.log(data);
              onChange(data);
            }}
            maxCount={2}
          />
        }
      />
      <NumberField label="Egg Cycles" {...register("species.baseExperienceYield")} />
    </Stack>
    <NumberField label="Base Friendship" {...register("species.baseFriendship")} />
    <Divider>EV Yield</Divider>
    <Grid container rowGap={1}>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.evYield.hp")} label="HP" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.evYield.attack")} label="ATK" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.evYield.defence")} label="DEF" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.evYield.speed")} label="SPD" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.evYield.special_attack")} label="SPATK" />
      </Grid>
      <Grid item sm={4}>
        <NumberField fullWidth {...register("species.evYield.special_defence")} label="SPDEF" />
      </Grid>
    </Grid>
    <Divider />
    <Stack direction="row" sx={{ "& > *": { flexGrow: 1, minWidth: 0, flexBasis: 0 } }}>
      <NumberField {...register("species.height")} label="Height" />
      <NumberField {...register("species.weight")} label="Weight" />
    </Stack>
    <Button onClick={handleSubmit(onUpdate)}>Update</Button>
  </Stack>
}