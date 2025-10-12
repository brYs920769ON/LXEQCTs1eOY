// 代码生成时间: 2025-10-12 22:59:44
 * Features:
 * - Matrix addition
 * - Matrix multiplication
 * - Matrix subtraction
 * - Matrix scalar multiplication
 * - Determinant calculation
 *
 * Usage:
 * const matrix = new Matrix([[1, 2], [3, 4]]);
 * const result = matrix.add(new Matrix([[5, 6], [7, 8]]));
 *
 */

interface IMatrix {
  rows: number[];
  columns: number;
}

class Matrix implements IMatrix {
  private matrix: number[][];

  constructor(matrix: number[][]) {
    this.matrix = matrix;
    this.rows = matrix.length;
    this.columns = matrix[0].length;
  }

  // Get the number of rows in the matrix
  public get rows(): number {
    return this.matrix.length;
  }

  // Get the number of columns in the matrix
  public get columns(): number {
    return this.rows > 0 ? this.matrix[0].length : 0;
  }

  // Add two matrices
  public add(matrix: Matrix): Matrix {
    if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
      throw new Error('Matrices must have the same dimensions for addition.');
    }

    const resultMatrix = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      resultMatrix[i] = new Array(this.columns);
      for (let j = 0; j < this.columns; j++) {
        resultMatrix[i][j] = this.matrix[i][j] + matrix.matrix[i][j];
      }
    }

    return new Matrix(resultMatrix);
  }

  // Subtract two matrices
  public subtract(matrix: Matrix): Matrix {
    if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
      throw new Error('Matrices must have the same dimensions for subtraction.');
    }

    const resultMatrix = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      resultMatrix[i] = new Array(this.columns);
      for (let j = 0; j < this.columns; j++) {
        resultMatrix[i][j] = this.matrix[i][j] - matrix.matrix[i][j];
      }
    }

    return new Matrix(resultMatrix);
  }

  // Multiply two matrices
  public multiply(matrix: Matrix): Matrix {
    if (this.columns !== matrix.rows) {
      throw new Error('The number of columns in the first matrix must be equal to the number of rows in the second matrix for multiplication.');
    }

    const resultMatrix = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      resultMatrix[i] = new Array(matrix.columns);
      for (let j = 0; j < matrix.columns; j++) {
        let sum = 0;
        for (let k = 0; k < this.columns; k++) {
          sum += this.matrix[i][k] * matrix.matrix[k][j];
        }
        resultMatrix[i][j] = sum;
      }
    }

    return new Matrix(resultMatrix);
  }

  // Multiply a matrix by a scalar
  public scalarMultiply(scalar: number): Matrix {
    const resultMatrix = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      resultMatrix[i] = new Array(this.columns);
      for (let j = 0; j < this.columns; j++) {
        resultMatrix[i][j] = this.matrix[i][j] * scalar;
      }
    }

    return new Matrix(resultMatrix);
  }

  // Calculate the determinant of a 2x2 matrix
  public determinant(): number {
    if (this.rows !== 2 || this.columns !== 2) {
      throw new Error('Determinant calculation is only supported for 2x2 matrices.');
    }

    return this.matrix[0][0] * this.matrix[1][1] - this.matrix[0][1] * this.matrix[1][0];
  }
}

// Example usage
try {
  const matrixA = new Matrix([[1, 2], [3, 4]]);
  const matrixB = new Matrix([[5, 6], [7, 8]]);
  const sum = matrixA.add(matrixB);
  const product = matrixA.multiply(matrixB);
  console.log('Sum:', sum.matrix);
  console.log('Product:', product.matrix);
} catch (error) {
  console.error(error.message);
}
