/** @type {import('tailwindcss').Config} */
import tailwindcss_animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			'geist': [
  				'Geist'
  			],
			'caveat': [
				'Caveat'
			],
			'dm_sans':[
				'DM Sans'
			]
  		},
  	}
  },
  plugins: [tailwindcss_animate],
}