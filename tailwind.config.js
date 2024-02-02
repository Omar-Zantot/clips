/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: ["bg-blue-400", "bg-green-400", "bg-red-400"],
  theme: {
    extend: {},
  },
  plugins: [],
};

/**
 * Complete tailwind is going to run into problems with the dynamic class.
 * In the alert component class, we're defining a getter function
 * for returning the background class of the component
 * Unfortunately, tailwind will not be able to understand what we're
 * trying to accomplish. These classes will never be added to the final bundle
 */
