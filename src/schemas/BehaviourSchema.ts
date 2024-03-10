import * as yup from "yup";
import TimeRanges from "../data/timeRanges";
import SleepDepths from "../data/sleepDepths";
import { ChanceSchema } from "./ChanceSchema";
import { RangeSchema } from "./RangeSchema";

export const BehaviourSchema = yup.object().shape({
  moving: yup.object().shape({
    walk: yup.object().shape({
      canWalk: yup.boolean().default(true).optional(),
      avoidsLand: yup.boolean().default(false).optional(),
      walkSpeed: yup.number().default(0.35).optional(),
    }),
    swim: yup.object().shape({
      avoidsWater: yup.boolean().default(false).optional(),
      hurtByLava: yup.boolean().default(true).optional(),
      canSwimInWater: yup.boolean().default(true).optional(),
      canSwimInLava: yup.boolean().default(true).optional(),
      swimSpeed: yup.number().default(0.3).optional(),
      canBreatheUnderwater: yup.boolean().default(false).optional(),
      canBreatheUnderlava: yup.boolean().default(false).optional(),
      canWalkOnWater: yup.boolean().default(false).optional(),
      canWalkOnLava: yup.boolean().default(false).optional(),
    }),
    fly: yup.object().shape({
      canFly: yup.boolean().default(false).optional(),
      flySpeedHorizontal: yup.number().default(0.3).optional(),
    }),
    stepHeight: yup.number().default(0.6).optional(),
    wanderChance: yup.number().default(120).optional(),
    wanderSpeed: yup.number().default(1).optional(),
    canLook: yup.boolean().default(true).optional(),
    looksAtEntities: yup.boolean().default(true).optional(),
  }),
  resting: yup.object().shape({
    canSleep: yup.boolean().default(false).optional(),
    times: yup.string().oneOf(TimeRanges).default("night").optional(),
    sleepChance: ChanceSchema.default({ x: 1, y: 600 }).optional(),
    light: RangeSchema.default({ min: 0, max: 15 }).optional(),
    depth: yup.string().oneOf(SleepDepths).default("normal").optional(),
  }),
});
