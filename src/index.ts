import * as array from "./array";
import * as string from "./string";
import * as any from "./any";
import * as object from "./object";
import * as common from "./common";

export { array, string, object, any, common };

export type {
  First as ArrayFirst,
  Join as ArrayJoin,
  Last as ArrayLast,
  Length as ArrayLength,
  Pop as ArrayPop,
  Push as ArrayPush,
  Shift as ArrayShift,
  Unshift as ArrayUnshift,
  ArrayType,
} from "./array";

export type { Anyfy } from "./any/anyfy";

export type {
  EmitListeners,
  IsFunction,
  MaybeRefProps,
  Prettify,
  ReplaceAll as CommonReplaceAll,
  SplitCamelCase,
  TypeCheck,
  IsSameType,
  PrimitiveType,
  IsPrimitiveType,
} from "./common";

export type {
  CollapseObject,
  GetTypeByPropsPath,
  HasExactKeys,
  HasKeys,
  HasOnlyKeys,
  isObject,
  Merge,
  PropsPath,
  PartialField,
  RequiredField,
  StrictRecord,
  IsOptionalKey,
  IsRequiredKey,
  GetOptionalKeys,
  GetRequiredKeys,
  DtoWithCamelCaseKeys,
  DtoWithCamelCaseKeysRecursive,
  OverrideFields,
  RemoveFields,
  DtoToModel,
  TakeSnakeCaseKey,
} from "./object";

export type {
  At as StringAt,
  First as StringFirst,
  Last as StringLast,
  Length as StringLength,
  Replace as StringReplace,
  ReplaceAll as StringReplaceAll,
  Split as StringSplit,
  Tail as StringTail,
  SnakeToCamelCase,
  HasSnakeCaseKey,
} from "./string";
