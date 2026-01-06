/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        'mobile': 'repeat(4, minmax(0, 1fr))', // Adjust as needed
        'tablet': 'repeat(3, minmax(0, 1fr))', // Adjust as needed
        'laptop': 'repeat(2, minmax(0, 1fr))', // Adjust as needed
        'desktop': 'repeat(1, minmax(0, 1fr))', // Adjust as needed
      },
      gridTemplateColumns: {
        'mobile': 'repeat(1, minmax(0, 1fr))', // Adjust as needed
        'tablet': 'repeat(2, minmax(0, 1fr))', // Adjust as needed
        'laptop': 'repeat(3, minmax(0, 1fr))', // Adjust as needed
        'desktop': 'repeat(4, minmax(0, 1fr))', // Adjust as needed
      },
    },
  },
  plugins: [],
}
