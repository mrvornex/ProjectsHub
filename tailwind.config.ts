// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#213448",
//         secondary: "#547792",
//         accent: "#94B4C1",
//         background: "#EAE0CF",
//       },
//     },
//   },
//   plugins: [],
// };

// export default config;

// module.exports = {
//   theme: {
//     extend: {
//       lineClamp: {
//         2: '2',
//         3: '3',
//       }
//     }
//   }
// }

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backdropBlur: {
        '3xl': '40px',
      }
    }
  }
}