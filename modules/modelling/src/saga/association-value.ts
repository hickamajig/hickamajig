/**
 * A key-value pair saga used to resolve one or more saga instances associated with a given event. 
 * There is a many-to-many relationship between association values and sagas.
 * 
 * Two {@link AssociationValue}s are considered equal if both their key and value are equal. 
 */
export interface AssociationValue {

  /**
   * Key which identifies this association value. 
   * Typically, this indicates the name of the saga property contianing the association value.
   */
  key: string;

  /**
   * Associaiton value.
   */
  value: string;
}

export class AssociationValue {
  /**
   * Checks if two associations values are equal.
   * 
   * @param other Associaiton value to comparse for equality. 
   * @returns true if the key and value of {@code this} and {@code other} are equal. 
   */
  public static equals(a: AssociationValue, b: AssociationValue): boolean {
    return a.key === b.key && a.value === b.value;
  }
}
