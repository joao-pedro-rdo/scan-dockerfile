//* import of bib core
export interface AnnotationProperties {
  /**
   * A title for the annotation.
   */
  title?: string;

  /**
   * The name of the file for which the annotation should be created.
   */
  file?: string;

  /**
   * The start line for the annotation.
   */
  startLine?: number;

  /**
   * The end line for the annotation. Defaults to `startLine` when `startLine` is provided.
   */
  endLine?: number;

  /**
   * The start column for the annotation. Cannot be sent when `startLine` and `endLine` are different values.
   */
  startColumn?: number;

  /**
   * The end column for the annotation. Cannot be sent when `startLine` and `endLine` are different values.
   * Defaults to `startColumn` when `startColumn` is provided.
   */
  endColumn?: number;
}
