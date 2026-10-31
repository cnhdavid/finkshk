import type messages from "../../messages/de.json";

type ArraysAsRawKeys<Value> = Value extends readonly unknown[]
  ? string
  : Value extends object
    ? { [Key in keyof Value]: ArraysAsRawKeys<Value[Key]> }
    : Value;

declare module "next-intl" {
  interface AppConfig {
    Locale: "de";
    Messages: ArraysAsRawKeys<typeof messages>;
  }
}
