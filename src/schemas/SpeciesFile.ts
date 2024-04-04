import * as yup from "yup";
import PokemonType from "../data/pokemonTypes";
import ExperienceGroup from "../data/experienceGroups";
import EggGroups from "../data/eggGroups";
import { MoveSchema } from "./MoveSchema";
import { AbilitySchema } from "./AbilitySchema";
import { EvolutionSchema } from "./EvolutionSchema";
import { StatsSchema } from "./StatsSchema";
import { RangeSchema } from "./RangeSchema";
import { BehaviourSchema } from "./BehaviourSchema";

export const SpeciesFileSchema = yup.object().shape({
  implemented: yup.boolean().default(true).optional(),
  nationalPokedexNumber: yup
    .number()
    .default(9999)
    .transform((v) => +v),
  primaryType: yup.string().oneOf(PokemonType).default("normal").required(),
  secondaryType: yup
    .string()
    .oneOf(PokemonType)
    .transform((v) => v || undefined)
    .optional(),
  abilities: yup.array().of(AbilitySchema.required()).default([]),
  baseStats: StatsSchema,
  behaviour: BehaviourSchema,
  catchRate: yup.number().default(45).optional(),
  maleRatio: yup.number().default(0.5).optional(),
  shoulderMountable: yup.bool().default(false).optional(),
  features: yup.array().of(yup.string().required()).default([]).optional(),
  baseExperienceYield: yup.number().default(10).optional(),
  experienceGroup: yup
    .string()
    .oneOf(ExperienceGroup)
    .default(ExperienceGroup[0])
    .optional(),
  eggCycles: yup.number().default(120).optional(),
  eggGroups: yup
    .array()
    .of(yup.string().oneOf(EggGroups).required())
    .min(1)
    .max(2)
    .default([]),
  drops: yup
    .object()
    .shape({
      amount: RangeSchema.default({ min: 1, max: 1 }).optional(),
      entries: yup.array().of(
        yup.object().shape({
          percentage: yup.number().default(100).optional(),
          quantity: yup.number().optional(),
          quantityRange: RangeSchema.default({ min: 1, max: 1 }).optional(),
          maxSelectableTimes: yup.number().default(1).optional(),
          item: yup.string().default("minecraft:fish").required(),
          nbt: yup.string().optional(),
        })
      ),
    })
    .optional(),
  moves: yup.array().of(MoveSchema.required()).default([]),
  labels: yup
    .array()
    .of(yup.string().required())
    .default(["custom"])
    .optional(),
  pokedex: yup.string().default("").required(),
  evolutions: yup.array().of(EvolutionSchema.required()).optional(),
  baseScale: yup.number().default(1).required(),
  hitbox: yup
    .object()
    .shape({
      width: yup.number().default(1),
      height: yup.number().default(1),
      fixed: yup.boolean().default(false),
    })
    .required(),
  baseFriendship: yup.number().default(0),
  evYield: StatsSchema.partial(),
  height: yup.number().default(1),
  weight: yup.number().default(1),
  dynamaxBlocked: yup.boolean().default(false),
});
