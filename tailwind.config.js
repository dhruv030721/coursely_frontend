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
				'dm_sans': [
					'DM Sans'
				],
				'orbitron': [
					'Orbitron'
				],
			},
			animation: {
				'drawLine': 'drawLine 10s ease-in-out infinite',
				'candlestick': 'candlestick 3s ease-in-out infinite',
			},
			keyframes: {
				drawLine: {
					'0%': { opacity: '0', strokeDashoffset: '1000' },
					'10%': { opacity: '1' },
					'100%': { opacity: '1', strokeDashoffset: '0' }
				},
				candlestick: {
					'0%': { opacity: '0.3' },
					'50%': { opacity: '0.6' },
					'100%': { opacity: '0.3' }
				}
			}
		}
	},
	plugins: [tailwindcss_animate],
}