const assert = require("assert");
const { isPalindromo } = require("../src/utils");

describe("Testing function isPalindromo()", function () {
  it("deberia obtener TRUE cuando el valor es de 1 char", function () {
    assert.strictEqual(isPalindromo(1), true);
    assert.strictEqual(isPalindromo("a"), true);
  });

  it("deberiamos obtener TRUE para palabras palindromos", function () {
    assert.strictEqual(isPalindromo(101), true);
    assert.strictEqual(isPalindromo(1001), true);
    assert.strictEqual(isPalindromo("luz azul"), true);
    assert.strictEqual(isPalindromo("abba"), true);
  });

  it("deberiamos obtener FALSE para palabras no palindromos", function () {
    assert.strictEqual(isPalindromo(1010), false);
    assert.strictEqual(isPalindromo(103401), false);
    assert.strictEqual(isPalindromo("luz verde"), false);
    assert.strictEqual(isPalindromo("osos baboso"), false);
  });
});
