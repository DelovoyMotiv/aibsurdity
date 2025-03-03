
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontSize: {
				'2xs': '0.625rem', // 10px
			},
			fontFamily: {
				pixel: ['"Press Start 2P"', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				neon: {
					pink: '#ff00ff',
					blue: '#00ffff',
					green: '#00ff00',
					yellow: '#ffff00',
					purple: '#8B5CF6',
					orange: '#F97316'
				},
				absurd: {
					dark: '#1A1F2C',
					light: '#F2FCE2',
					accent: '#D946EF',
					muted: '#403E43',
					bg: '#221F26'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glitch': {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-5px, 5px)' },
					'40%': { transform: 'translate(-5px, -5px)' },
					'60%': { transform: 'translate(5px, 5px)' },
					'80%': { transform: 'translate(5px, -5px)' },
					'100%': { transform: 'translate(0)' }
				},
				'broken-glitch': {
					'0%': { transform: 'translate(0) skew(0deg)' },
					'20%': { transform: 'translate(-10px, 10px) skew(10deg, 5deg)' },
					'40%': { transform: 'translate(10px, -5px) skew(-5deg, 2deg)' },
					'60%': { transform: 'translate(-5px, 15px) skew(5deg, -2deg)' },
					'80%': { transform: 'translate(5px, -15px) skew(-10deg, 5deg)' },
					'100%': { transform: 'translate(0) skew(0deg)' }
				},
				'fragmented-glitch': {
					'0%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
					'10%': { transform: 'translate(-5px, 5px)', filter: 'hue-rotate(90deg)' },
					'20%': { transform: 'translate(5px, -5px)', filter: 'hue-rotate(180deg)' },
					'30%': { transform: 'translate(-3px, 3px)', filter: 'hue-rotate(270deg)' },
					'40%': { transform: 'translate(3px, -3px)', filter: 'hue-rotate(360deg)' },
					'50%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' },
					'60%': { transform: 'translate(5px, 5px)', filter: 'hue-rotate(180deg)' },
					'70%': { transform: 'translate(-5px, -5px)', filter: 'hue-rotate(90deg)' },
					'80%': { transform: 'translate(3px, 3px)', filter: 'hue-rotate(270deg)' },
					'90%': { transform: 'translate(-3px, -3px)', filter: 'hue-rotate(360deg)' },
					'100%': { transform: 'translate(0)', filter: 'hue-rotate(0deg)' }
				},
				'broken-warp': {
					'0%': { transform: 'perspective(500px) rotateX(0deg) rotateY(0deg)' },
					'25%': { transform: 'perspective(500px) rotateX(10deg) rotateY(-5deg)' },
					'50%': { transform: 'perspective(500px) rotateX(-5deg) rotateY(10deg)' },
					'75%': { transform: 'perspective(500px) rotateX(-10deg) rotateY(-5deg)' },
					'100%': { transform: 'perspective(500px) rotateX(0deg) rotateY(0deg)' }
				},
				'reality-glitch': {
					'0%': { clipPath: 'inset(0 0 0 0)' },
					'5%': { clipPath: 'inset(33% 0 66% 0)' },
					'10%': { clipPath: 'inset(0 0 0 0)' },
					'15%': { clipPath: 'inset(50% 0 50% 0)' },
					'20%': { clipPath: 'inset(0 0 0 0)' },
					'25%': { clipPath: 'inset(66% 0 33% 0)' },
					'30%': { clipPath: 'inset(0 0 0 0)' },
					'100%': { clipPath: 'inset(0 0 0 0)' }
				},
				'broken-flicker': {
					'0%, 100%': { opacity: '1' },
					'10%': { opacity: '0.2' },
					'13%': { opacity: '0.8' },
					'16%': { opacity: '0.1' },
					'18%': { opacity: '0.9' },
					'20%': { opacity: '0.4' },
					'50%': { opacity: '1' },
					'80%': { opacity: '0.7' },
					'90%': { opacity: '0.3' }
				},
				'broken-shake': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'10%': { transform: 'translate(-10px, 8px)' },
					'20%': { transform: 'translate(7px, -6px)' },
					'30%': { transform: 'translate(-15px, -4px)' },
					'40%': { transform: 'translate(12px, 10px)' },
					'50%': { transform: 'translate(-8px, -13px)' },
					'60%': { transform: 'translate(10px, 4px)' },
					'70%': { transform: 'translate(-6px, 12px)' },
					'80%': { transform: 'translate(14px, -13px)' },
					'90%': { transform: 'translate(-12px, 5px)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
				},
				'neon-pulse': {
					'0%, 100%': { 
						textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff'
					},
					'50%': { 
						textShadow: '0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff, 0 0 50px #00ffff'
					}
				},
				'broken-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'20%': { transform: 'rotate(45deg)' },
					'25%': { transform: 'rotate(30deg)' },
					'40%': { transform: 'rotate(-60deg)' },
					'45%': { transform: 'rotate(-45deg)' },
					'60%': { transform: 'rotate(90deg)' },
					'65%': { transform: 'rotate(80deg)' },
					'80%': { transform: 'rotate(-120deg)' },
					'85%': { transform: 'rotate(-100deg)' },
					'100%': { transform: 'rotate(0deg)' }
				},
				'tetris-fall': {
					'0%': { transform: 'translateY(-100vh)' },
					'100%': { transform: 'translateY(0)' }
				},
				'pixel-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
				'pixel-flicker': {
					'0%, 100%': { opacity: '1' },
					'10%, 30%, 50%, 70%, 90%': { opacity: '0.8' },
					'20%, 40%, 60%, 80%': { opacity: '1' }
				},
				'scan-line': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'distort-text': {
					'0%': { letterSpacing: 'normal', fontVariationSettings: "'wght' 400" },
					'25%': { letterSpacing: '-0.3em', fontVariationSettings: "'wght' 800" },
					'50%': { letterSpacing: '0.1em', fontVariationSettings: "'wght' 200" },
					'75%': { letterSpacing: '0.2em', fontVariationSettings: "'wght' 600" },
					'100%': { letterSpacing: 'normal', fontVariationSettings: "'wght' 400" }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.4s ease-in-out infinite',
				'broken-glitch': 'broken-glitch 0.8s cubic-bezier(.36,.07,.19,.97) infinite',
				'fragmented-glitch': 'fragmented-glitch 2s cubic-bezier(.36,.07,.19,.97) infinite',
				'broken-warp': 'broken-warp 5s ease-in-out infinite',
				'reality-glitch': 'reality-glitch 3s steps(1) infinite',
				'broken-flicker': 'broken-flicker 4s linear infinite',
				'broken-shake': 'broken-shake 0.5s cubic-bezier(.36,.07,.19,.97) infinite',
				'float': 'float 6s ease-in-out infinite',
				'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'broken-rotate': 'broken-rotate 8s linear infinite',
				'tetris-fall': 'tetris-fall 1.5s cubic-bezier(0.65, 0, 0.35, 1)',
				'pixel-bounce': 'pixel-bounce 0.5s ease-in-out infinite',
				'pixel-flicker': 'pixel-flicker 2s linear infinite',
				'scan-line': 'scan-line 2s linear infinite',
				'distort-text': 'distort-text 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
