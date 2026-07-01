<p align="center">
  <img src="./ts-tools-pro-1-generics.svg" alt="TS-TOOLS logo" width="240">
</p>

# TypeScript - Tools

TypeScript type-level utility collection.

## Install

```sh
npm i @asosunoff/ts-tools
```

## Development

```sh
git clone https://github.com/aSosunoff/TS-TOOLS.git
cd TS-TOOLS
npm i
npm run build
```

## Usage

```ts
import type {
  any as anyTools,
  array,
  common,
  object,
  string,
} from "@asosunoff/ts-tools";
```

You can also import commonly used utilities directly from the package root.

```ts
import type {
  ArrayLast,
  DtoToModel,
  DtoWithCamelCaseKeys,
  DtoWithCamelCaseKeysRecursive,
  GetOptionalKeys,
  HasOnlyKeys,
  HasSnakeCaseKey,
  IsPrimitiveType,
  IsRequiredKey,
  IsSameType,
  OverrideFields,
  RemoveFields,
  StringReplaceAll,
  SnakeToCamelCase,
  StrictRecord,
  TakeSnakeCaseKey,
} from "@asosunoff/ts-tools";
```

Example:

```ts
import type { object, string } from "@asosunoff/ts-tools";

type ApiUser = {
  user_id: number;
  first_name: string;
  last_name?: string;
};

type ClientUser = object.DtoWithCamelCaseKeys<ApiUser>;
// {
//   userId: number;
//   firstName: string;
//   lastName?: string;
// }

type UserOptionalKeys = object.GetOptionalKeys<ApiUser>;
// "last_name"

type UserPatch = object.OverrideFields<
  ClientUser,
  { firstName: "Admin" }
>;
// {
//   userId: number;
//   firstName: "Admin";
//   lastName?: string;
// }

type PublicUser = object.DtoToModel<
  ApiUser,
  { userId: string },
  { deleteFields: "lastName" }
>;
// {
//   userId: string;
//   firstName: string;
// }

type NestedApiUser = {
  user_profile: {
    first_name: string;
    address_info: {
      zip_code: string;
    };
  };
};

type NestedClientUser = object.DtoWithCamelCaseKeysRecursive<NestedApiUser>;
// {
//   userProfile: {
//     firstName: string;
//     addressInfo: {
//       zipCode: string;
//     };
//   };
// }

type FieldName = string.SnakeToCamelCase<"created_at">;
// "createdAt"

type HasSnakeCaseField = string.HasSnakeCaseKey<"created_at">;
// true

type ApiSnakeCaseKeys = object.TakeSnakeCaseKey<ApiUser>;
// "user_id" | "first_name" | "last_name"
```

## Array Utilities

### `array.First<T>`

Returns the first tuple item.

```ts
type Result = array.First<["a", "b", "c"]>;
// "a"
```

### `array.Last<T>`

Returns the last tuple item.

```ts
type Result = array.Last<["a", "b", "c"]>;
// "c"
```

### `array.Pop<T>`

Removes the last tuple item.

```ts
type Result = array.Pop<["a", "b", "c"]>;
// ["a", "b"]
```

### `array.Push<T, E>`

Adds an item to the end of a tuple.

```ts
type Result = array.Push<["a", "b"], "c">;
// ["a", "b", "c"]
```

### `array.Shift<T>`

Removes the first tuple item.

```ts
type Result = array.Shift<["a", "b", "c"]>;
// ["b", "c"]
```

### `array.Unshift<T, E>`

Adds an item to the start of a tuple.

```ts
type Result = array.Unshift<["b", "c"], "a">;
// ["a", "b", "c"]
```

### `array.Join<T, D>`

Joins tuple items into a string literal.

```ts
type Result = array.Join<["user", "profile", "name"], ".">;
// "user.profile.name"
```

### `array.Length<T>`

Returns tuple length.

```ts
type Result = array.Length<["a", "b", "c"]>;
// 3
```

### `array.ArrayType<T>`

Returns the item type from an array type.

```ts
type Result = array.ArrayType<Array<{ id: number; name: string }>>;
// {
//   id: number;
//   name: string;
// }
```

## String Utilities

### `string.Split<S, D>`

Splits a string literal by delimiter.

```ts
type Result = string.Split<"user.profile.name", ".">;
// ["user", "profile", "name"]
```

### `string.Length<T>`

Returns string literal length.

```ts
type Result = string.Length<"hello">;
// 5
```

### `string.Last<T>`

Returns the last character of a string literal.

```ts
type Result = string.Last<"hello">;
// "o"
```

### `string.First<T, D>`

Returns the first string part. The delimiter defaults to an empty string.

```ts
type FirstChar = string.First<"hello">;
// "h"

type FirstPart = string.First<"user.profile.name", ".">;
// "user"
```

### `string.Tail<T, D>`

Returns the string after the first delimiter match.

```ts
type Result = string.Tail<"user.profile.name", ".">;
// "profile.name"
```

### `string.Replace<T, A, B>`

Replaces the first occurrence of a string literal.

```ts
type Result = string.Replace<"user-name", "-", "_">;
// "user_name"
```

### `string.ReplaceAll<T, A, B>`

Replaces all occurrences of a string literal.

```ts
type Result = string.ReplaceAll<"user-profile-name", "-", "_">;
// "user_profile_name"
```

### `string.At<S, I>`

Returns a character by index.

```ts
type Result = string.At<"hello", 1>;
// "e"
```

### `string.SnakeToCamelCase<T>`

Converts a `snake_case` string literal to `camelCase`.

```ts
type Result = string.SnakeToCamelCase<"user_profile_name">;
// "userProfileName"
```

### `string.HasSnakeCaseKey<K>`

Checks whether a property key is a string key containing `_`.

```ts
type A = string.HasSnakeCaseKey<"user_id">;
// true

type B = string.HasSnakeCaseKey<"userId">;
// false
```

## Object Utilities

Key-check helpers use different directions:

| Utility | Checks |
| --- | --- |
| `object.HasKeys<K, T>` | every key in `K` exists in `T` |
| `object.HasOnlyKeys<K, T>` | every key in `T` is allowed by `K` |
| `object.HasExactKeys<K, T>` | both previous checks are true |
| `object.StrictRecord<K, T>` | requires `T` to be a strict `Record<K, unknown>` |

### `object.Merge<A, B>`

Merges two object types. Properties from `B` override properties from `A`.

```ts
type Result = object.Merge<
  { id: number; name: string; enabled: boolean },
  { name: "admin"; role: "owner" }
>;
// {
//   id: number;
//   name: "admin";
//   enabled: boolean;
//   role: "owner";
// }
```

### `object.isObject<T>`

Checks whether a type is an object record. Arrays return `false`.

```ts
type A = object.isObject<{ id: number }>;
// true

type B = object.isObject<string[]>;
// false
```

### `object.PropsPath<T>`

Builds a union of nested property paths.

```ts
type Result = object.PropsPath<{
  user: {
    profile: {
      name: string;
    };
  };
  active: boolean;
}>;
// "user.profile.name" | "active"
```

### `object.GetTypeByPropsPath<T, PATH>`

Returns the value type by a dot-separated property path.

```ts
type Result = object.GetTypeByPropsPath<
  {
    user: {
      profile: {
        name: string;
      };
    };
  },
  "user.profile.name"
>;
// string
```

### `object.HasKeys<K, T>`

Checks whether every key in `K` exists in `T`.

```ts
type A = object.HasKeys<
  "id",
  {
    id: number;
    name: string;
  }
>;
// true

type B = object.HasKeys<
  "id" | "email",
  {
    id: number;
    name: string;
  }
>;
// false
```

### `object.HasOnlyKeys<K, T>`

Checks whether `T` has no keys outside `K`.

```ts
type KeysList = "alert" | "confirm";

type A = object.HasOnlyKeys<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
  }
>;
// true

type B = object.HasOnlyKeys<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
    custom: { id: string };
  }
>;
// false
```

### `object.HasExactKeys<K, T>`

Checks whether `T` has exactly the selected key union.

```ts
type Result = object.HasExactKeys<
  "id" | "name",
  {
    id: number;
    name: string;
  }
>;
// true
```

### `object.StrictRecord<K, T>`

Requires `T` to be a record with every key from `K` and no keys outside `K`.

```ts
type KeysList = "alert" | "confirm";

type A = object.StrictRecord<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
  }
>;
// {
//   alert: { title: string };
//   confirm: { message: string };
// }

type B = object.StrictRecord<
  KeysList,
  {
    alert: { title: string };
    confirm: { message: string };
    custom: { id: string };
  }
>;
// Error: "custom" is not allowed.
```

### `object.CollapseObject<T>`

Converts a nested object type into a flat object with dot-separated keys.

```ts
type Result = object.CollapseObject<{
  user: {
    profile: {
      name: string;
    };
  };
  active: boolean;
}>;
// {
//   "user.profile.name": string;
//   active: boolean;
// }
```

### `object.PartialField<T, F>`

Makes selected object fields optional and keeps all other fields unchanged.

```ts
type Result = object.PartialField<
  {
    id: number;
    name: string;
    email: string;
  },
  "email"
>;
// {
//   id: number;
//   name: string;
//   email?: string;
// }
```

### `object.RequiredField<T, K>`

Makes selected object fields required and keeps all other fields unchanged.

```ts
type Result = object.RequiredField<
  {
    id: number;
    name?: string;
    email?: string;
  },
  "name" | "email"
>;
// {
//   id: number;
//   name: string;
//   email: string;
// }
```

### `object.IsOptionalKey<T, K>`

Checks whether object key `K` is optional.

```ts
type Result = object.IsOptionalKey<
  {
    id: number;
    name?: string;
  },
  "name"
>;
// true
```

### `object.IsRequiredKey<T, K>`

Checks whether object key `K` is required.

```ts
type Result = object.IsRequiredKey<
  {
    id: number;
    name?: string;
  },
  "id"
>;
// true
```

`object.IsRequeredKey<T, K>` is kept as a backward-compatible alias, but `object.IsRequiredKey<T, K>` should be preferred.

### `object.GetOptionalKeys<T>`

Returns a union of all optional keys in `T`.

```ts
type Result = object.GetOptionalKeys<{
  id: number;
  name?: string;
  email?: string;
}>;
// "name" | "email"
```

### `object.GetRequiredKeys<T>`

Returns a union of all required keys in `T`.

```ts
type Result = object.GetRequiredKeys<{
  id: number;
  name?: string;
  active: boolean;
}>;
// "id" | "active"
```

### `object.OverrideFields<T, U>`

Overrides existing fields in `T` using `U`.

Unlike `Merge`, this utility only allows keys that already exist in `T`.

```ts
type Result = object.OverrideFields<
  {
    id: number;
    role: "user";
    active: boolean;
  },
  {
    role: "admin";
    active: false;
  }
>;
// {
//   id: number;
//   role: "admin";
//   active: false;
// }
```

### `object.RemoveFields<T, K>`

Removes selected fields from an object type.

```ts
type Result = object.RemoveFields<
  {
    id: number;
    name: string;
    password: string;
  },
  "password"
>;
// {
//   id: number;
//   name: string;
// }
```

### `object.DtoWithCamelCaseKeys<T>`

Converts top-level object keys from `snake_case` to `camelCase`.

```ts
type Result = object.DtoWithCamelCaseKeys<{
  first_name: string;
  last_name: string;
  is_active: boolean;
}>;
// {
//   firstName: string;
//   lastName: string;
//   isActive: boolean;
// }
```

### `object.TakeSnakeCaseKey<T>`

Extracts a union of object keys written in `snake_case`.

```ts
type Result = object.TakeSnakeCaseKey<{
  user_id: number;
  firstName: string;
  created_at: string;
}>;
// "user_id" | "created_at"
```

### `object.DtoToModel<T, R, Options>`

Converts a DTO into a model by converting keys to `camelCase`, overriding selected field types, and removing selected model fields.

`R` is intended for real type changes after DTO keys are converted to `camelCase`. If a primitive field is overridden with the same type, TypeScript reports a redundant override. `Options["deleteFields"]` removes fields from the final model.

```ts
type Result = object.DtoToModel<
  {
    user_id: number;
    created_at: string;
    password_hash: string;
  },
  {
    createdAt: Date;
  },
  {
    deleteFields: "passwordHash";
  }
>;
// {
//   userId: number;
//   createdAt: Date;
// }
```

Override keys must be written in `camelCase`. If a legacy model still needs a `snake_case` override,
`Options["skipSnakeCaseCheck"]` disables that diagnostic for selected keys. Use `Options["deleteFields"]` if the
converted `camelCase` field should be removed from the final model.

```ts
type Result = object.DtoToModel<
  {
    user_id: number;
  },
  {
    user_id: string;
  },
  {
    deleteFields: "userId";
    skipSnakeCaseCheck: "user_id";
  }
>;
// {
//   user_id: string;
// }
```

`Options["checkObjectFields"]` enables same-type diagnostics for object fields, and `Options["skipTypeCheckKeys"]` disables same-type diagnostics for selected keys.

```ts
type Result = object.DtoToModel<
  {
    status_id: number;
  },
  {
    statusId: number;
  },
  {
    skipTypeCheckKeys: "statusId";
  }
>;
// {
//   statusId: number;
// }
```

### `object.DtoWithCamelCaseKeysRecursive<T>`

Recursively converts nested object keys from `snake_case` to `camelCase`.

Arrays are preserved as-is and are not traversed recursively.

```ts
type Result = object.DtoWithCamelCaseKeysRecursive<{
  user_profile: {
    first_name: string;
    address_info: {
      zip_code: string;
    };
  };
  is_active: boolean;
}>;
// {
//   userProfile: {
//     firstName: string;
//     addressInfo: {
//       zipCode: string;
//     };
//   };
//   isActive: boolean;
// }
```

## Any Utilities

### `anyTools.Anyfy<O>`

Keeps object keys and converts all values to `any`.

```ts
type Result = anyTools.Anyfy<{
  id: number;
  name: string;
}>;
// {
//   id: any;
//   name: any;
// }
```

## Common Utilities

### `common.Prettify<T>`

Flattens an intersection or mapped type for cleaner editor hints.

```ts
type Result = common.Prettify<
  { id: number } & {
    name: string;
  }
>;
// {
//   id: number;
//   name: string;
// }
```

### `common.EmitListeners<T>`

Builds listener props from an event map.

```ts
type Result = common.EmitListeners<{
  change: [value: string];
  submit: [id: number, valid: boolean];
}>;
// {
//   onChange?: (value: string) => void;
//   onSubmit?: (id: number, valid: boolean) => void;
// }
```

### `common.SplitCamelCase<T, Separator>`

Inserts a separator before uppercase characters.

```ts
type Result = common.SplitCamelCase<"userProfileName">;
// "user-profile-name"
```

### `common.IsFunction<T>`

Checks whether a type is a function.

```ts
type A = common.IsFunction<() => void>;
// true

type B = common.IsFunction<string>;
// false
```

### `common.MaybeRefProps<T>`

Wraps non-function properties into a value-or-ref-like shape. Function properties stay unchanged.

```ts
type Result = common.MaybeRefProps<{
  value: string;
  count: number;
  onChange: (value: string) => void;
}>;
// {
//   value: string | { value: string };
//   count: number | { value: number };
//   onChange: (value: string) => void;
// }
```

### `common.ReplaceAll<T, FROM, TO>`

Replaces all occurrences of a string literal. `FROM` defaults to `"-"` and `TO` defaults to `"_"`.

```ts
type Result = common.ReplaceAll<"user-profile-name">;
// "user_profile_name"
```

### `common.TypeCheck<T>`

Converts a type into a generic function predicate for strict type comparison.

```ts
type Result = common.TypeCheck<string>;
// <G>() => G extends string ? 1 : 2
```

### `common.IsSameType<T, U>`

Checks whether two types are exactly equivalent.

```ts
type A = common.IsSameType<string, string>;
// true

type B = common.IsSameType<string, string | number>;
// false
```

### `common.PrimitiveType`

Union of primitive values used by type-level diagnostics.

```ts
type Result = common.PrimitiveType;
// string | number | boolean | bigint | symbol | null | undefined
```

### `common.IsPrimitiveType<T>`

Checks whether a type is a primitive or a union of primitives.

```ts
type A = common.IsPrimitiveType<string | number>;
// true

type B = common.IsPrimitiveType<{ id: number }>;
// false
```
