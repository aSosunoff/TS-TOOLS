import type { StrictRecord } from "./strict-record";
import type { DtoWithCamelCaseKeys } from "./dto-with-camel-case-keys";
import { IsPrimitiveType, IsSameType } from "../common";
import { OverrideFields } from "./override-fields";

/**
 * Diagnostic type used when a field is overridden with the same type.
 *
 * This exists only at the type level. TypeScript shows the string as the
 * expected type, making redundant overrides visible in diagnostics.
 *
 * @template K - Field key that does not need to be overridden.
 */
type SameFieldTypeError<K extends PropertyKey> =
  `DtoToModel error: field "${K & string}" already has this type in DTO`;

/**
 * Diagnostic type used when a field is both removed and overridden.
 *
 * This exists only at the type level to make the parameter conflict visible in
 * TypeScript diagnostics.
 *
 * @template K - Field key that was marked for removal.
 */
type RemovedFieldError<K extends PropertyKey> = `DtoToModel error: field "${K & string}" was removed from the model`;

/**
 * Builds a constraint for fields that may be overridden in the model.
 *
 * For each model field in `T`, checks whether it was passed in `R`. When the
 * override has the same type as the existing model field and that field is
 * primitive, the constraint uses `SameFieldTypeError` instead of `unknown`.
 *
 * Object fields are not diagnosed by default because TypeScript compares them
 * structurally and can treat an exported model type as equal to the source DTO.
 * Pass `true` to `CheckObjectFields` to check object fields as well. Fields in
 * `SkipSameTypeCheckKeys` skip the same-type check.
 *
 * @template T - Model whose fields are used as the source of truth.
 * @template R - Fields the user wants to override.
 * @template CheckObjectFields - Whether equal object fields should be diagnosed.
 * @template SkipSameTypeCheckKeys - Field keys that skip the same-type diagnostic.
 * @returns Object type used to constrain `R`.
 */
export type ModelOverrideFields<
  T extends object,
  R,
  CheckObjectFields extends boolean = false,
  SkipSameTypeCheckKeys extends PropertyKey = never,
> = {
  [K in keyof T]: K extends keyof R
    ? K extends SkipSameTypeCheckKeys
      ? unknown
      : IsSameType<R[K], T[K]> extends true
        ? CheckObjectFields extends true
          ? SameFieldTypeError<K>
          : IsPrimitiveType<T[K]> extends true
            ? SameFieldTypeError<K>
            : unknown
        : unknown
    : unknown;
};

/**
 * Builds a constraint that reports overrides for fields marked for removal.
 *
 * When a key is included in `D`, the original field type is replaced with
 * `RemovedFieldError`. Other fields are left unchanged.
 *
 * @template T - Override-field constraint.
 * @template D - Key or key union that will be removed from the model.
 * @returns Constraint with diagnostics for removed fields.
 */
export type CheckRemovedField<T extends object, D> = {
  [K in keyof T]: K extends D ? RemovedFieldError<K> : T[K];
};

/**
 * Options for DTO-to-model conversion.
 *
 * @template T - Source DTO object.
 */
type DtoToModelOptions<T extends object> = Partial<{
  /**
   * Model keys to remove after key conversion and field overrides.
   */
  deleteFields: keyof DtoWithCamelCaseKeys<T>;
  /**
   * Whether object fields overridden with the same structural type should be diagnosed.
   */
  checkObjectFields: boolean;
  /**
   * Model keys that should skip the same-type diagnostic.
   *
   * Useful for intentional compatible overrides, such as `number` to a numeric enum.
   */
  skipTypeCheckKeys: keyof DtoWithCamelCaseKeys<T>;
}>;

type DefaultDtoToModelOptions = StrictRecord<
  keyof DtoToModelOptions<object>,
  {
    deleteFields: never;
    checkObjectFields: false;
    skipTypeCheckKeys: never;
  }
>;

type WithDefaultOptions<
  T extends object,
  Options extends DtoToModelOptions<T>,
  K extends keyof DefaultDtoToModelOptions,
> = K extends keyof Options ? Exclude<Options[K], undefined> : DefaultDtoToModelOptions[K];

type EmptyRecord = object;

/**
 * Converts a DTO into a model by camel-casing keys, overriding fields, and removing fields.
 *
 * The second parameter `R` is intended only for real type changes. If `R`
 * contains a primitive field with the same type already produced from the DTO,
 * TypeScript reports it as a redundant override. Object fields can be
 * overridden with exported model types.
 *
 * The third parameter `Options` controls additional checks: `deleteFields`
 * removes fields from the final model, `checkObjectFields` enables diagnostics
 * for equal object fields, and `skipTypeCheckKeys` disables the same-type
 * diagnostic for selected fields.
 *
 * If a field is included in both `R` and `Options["deleteFields"]`, TypeScript
 * reports the conflict because removed fields should not be overridden.
 *
 * @template T - Source DTO object.
 * @template R - Model fields to override after key conversion.
 * @template Options - Options for field removal and redundant-override diagnostics.
 * @returns Model object type with camelCase keys, overrides from `R`, and no fields from `deleteFields`.
 *
 * @example
 * type Result = DtoToModel<
 *   { user_id: string; created_at: string },
 *   { createdAt: Date },
 *   { deleteFields: "userId" }
 * >;
 * // { createdAt: Date }
 */
export type DtoToModel<
  T extends object,
  R extends Partial<
    CheckRemovedField<
      ModelOverrideFields<
        DtoWithCamelCaseKeys<T>,
        R,
        WithDefaultOptions<T, Options, "checkObjectFields">,
        WithDefaultOptions<T, Options, "skipTypeCheckKeys">
      >,
      WithDefaultOptions<T, Options, "deleteFields">
    >
  > = never,
  Options extends DtoToModelOptions<T> = EmptyRecord,
> = Omit<
  OverrideFields<DtoWithCamelCaseKeys<T>, [R] extends [never] ? EmptyRecord : R>,
  WithDefaultOptions<T, Options, "deleteFields">
>;
