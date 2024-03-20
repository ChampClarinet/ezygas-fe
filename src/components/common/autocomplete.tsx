import { useCallback, useState } from "react";
import {
  AutoCompleteProps as AP,
  AutoCompleteCompleteEvent,
  AutoComplete as BaseAC,
} from "primereact/autocomplete";

export interface AutocompleteProps<T = any> extends AP {
  /**
   * List of items to show in dropdown
   */
  listOfHint: T[];
  /**
   * Field in each listOfHint item to pick to search
   * leave null if list type is string
   */
  fieldToPick?: keyof T | (keyof T)[];
}
/**
 * for values and onChange, use actual object, no need to map
 */
const Autocomplete = <T,>(props: AutocompleteProps<T>) => {
  const { listOfHint, fieldToPick } = props;
  const [suggestions, setSuggestions] = useState<T[]>([]);

  const search = useCallback(
    (e: AutoCompleteCompleteEvent) => {
      setSuggestions(
        listOfHint.filter((item) => {
          const ftp = Array.isArray(fieldToPick) ? fieldToPick : [fieldToPick];
          return ftp.some((f) => {
            const valueToCheck = f ? item[f] : f;
            if (valueToCheck == null) return false;
            return valueToCheck
              .toString()
              .toLowerCase()
              .includes(e.query.toLowerCase());
          });
        })
      );
    },
    [fieldToPick, listOfHint]
  );

  return (
    <BaseAC suggestions={suggestions} completeMethod={search} {...props} />
  );
};

export default Autocomplete;
