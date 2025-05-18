# Una función variádica es aquella que acepta un número variable de argumentos.

# Se declaran usando el rest parameter (...).

# Ejemplo básico de función variádica

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0)
}

sum(1, 2, 3) // 6
sum(10, 20, 30, 40) // 100
```

# Loop throug key-values

```ts
const obj = {
  name: 'Alice',
  age: 30,
  city: 'Madrid',
};

for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}

---

const map1 = new Map([
  ["name", "Alice"],
  ["age", 30]
])

for (const [key, value] of map1) {
  console.log(`${key}: ${value}`)
}
```
