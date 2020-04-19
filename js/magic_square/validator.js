class MagicSquareValidator {
  /**
   * 
   * @param {number[][]} array 
   * @returns {bool}
   */
  static checkArrayIsMagicSquare(array) {
    const target = array[0].reduce((acc, cur) => acc + cur, 0);
    return MagicSquareValidator._checkSquare(array)
      && MagicSquareValidator._checkRange(array, 1, array.length * array.length)
      && MagicSquareValidator._checkRowSums(array, target)
      && MagicSquareValidator._checkColumnSums(array, target)
      && MagicSquareValidator._checkColumnSums(array, target)
      && MagicSquareValidator._checkDiagonals(array, target);
  }

  /**
   * 
   * @param {number[][]} array
   * @returns {bool}
   */
  static _checkSquare(array) {
    const rowCount = array.length;
    return array.reduce((previousValue, currentValue) => {
      return previousValue && (rowCount == currentValue.length);
    }, true);
  }

  /**
   * 
   * @param {number[][]} array 
   * @param {number} min 
   * @param {number} max 
   * @return {bool}
   */
  static _checkRange(array, min, max) {
    var elementSet = new Set();

    for (var row of array) {
      for (var element of row) {
        elementSet.add(element);
      }
    }

    return elementSet.size == (max - min + 1)
      && Math.min( ...elementSet ) == min
      && Math.max( ...elementSet ) == max;
  }

  /**
   * 
   * @param {number[][]} array 
   * @param {number} target 
   * @return bool
   */
  static _checkRowSums(array, target) {
    return array.reduce((previousValue, row) => {
      return previousValue && (row.reduce((cumulativeTotal, value) => {
        return cumulativeTotal + value;
      }, 0)) == target;
    }, true);
  }


  /**
   * 
   * @param {number[][]} square 
   * @param {number} target 
   * @return bool
   */
  static _checkColumnSums(square, target) {
    const zip = (arr, ...arrs) => {
      return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
    }
    const colSums = square.reduce((cumulativeTotal, row) => {
      return zip(cumulativeTotal, row).map(res => res[0] + res[1]);
    }, Utils.prepopulate1DArray(square.length, 0));
    return colSums.reduce((res, colSum) => res && (colSum == target), true)
  }


  /**
   * 
   * @param {number[][]} square 
   * @param {number} target 
   */
  static _checkDiagonals(square, target) {
    var leadingDiagonalSum = 0;
    var trailingDiagonalSum = 0;
    const size = square.length;
    for(var i = 0; i < size; i++) {
      leadingDiagonalSum += square[i][i];
      trailingDiagonalSum += square[i][size - 1 - i];
    }
    return leadingDiagonalSum == target && trailingDiagonalSum == target;
  }
}

