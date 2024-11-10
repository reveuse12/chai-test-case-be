export function add(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Both arguments must be numbers");
  }
  return a + b;
}

export function fetchData(success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve("Data fetched successfully");
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000); // Simulate a 1-second delay
  });
}
