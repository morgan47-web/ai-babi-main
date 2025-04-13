/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "0.5": "2.5px",
        "1": "5px",
        "1.5": "7.5px",
        "2": "10px",
        "2.5": "12.5px",
        "3": "15px",
        "3.5": "17.5px",
        "4": "20px",
        "4.5": "22.5px",
        "5": "25px",
        "5.5": "27.5px",
        "6": "30px",
        "6.5": "32.5px",
        "7": "35px",
        "7.5": "37.5px",
        "8": "40px",
        "8.5": "42.5px",
        "9": "45px",
        "9.5": "47.5px",
        "10": "50px",
        "10.5": "52.5px",
        "11": "55px",
        "11.5": "57.5px",
        "12": "60px",
        "12.5": "62.5px",
        "13": "65px",
        "13.5": "67.5px",
        "14": "70px",
        "14.5": "72.5px",
        "15": "75px",
        "15.5": "77.5px",
        "16": "80px",
        "16.5": "82.5px",
        "17": "85px",
        "17.5": "87.5px",
        "18": "90px",
        "18.5": "92.5px",
        "19": "95px",
        "19.5": "97.5px",
        "20": "100px",
        // continue as needed
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        trigger: {
          DEFAULT: "hsl(var(--trigger))",
          border: "hsl(var(--trigger-border))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        message: "hsl(var(--message))",
        success: "hsl(var(--success))",
        divider: "hsl(var(--divider))",
        menu: "hsl(var(--menu))",
        premium: "hsl(var(--premium))",
        "white-secondary": "hsl(var(--white-secondary))",
        "tertiary-text": "hsl(var(--tertiary-text))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontWeight: {
        light: "200",
        medium: "400",
        bold: "700",
        extrabold: "1000",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
      backgroundImage: {
        "active-stories": 'url("/active-stories.svg")',
        "active-card":
          "linear-gradient(180deg, hsl(var(--message)) 45%, hsl(var(--primary)) 100%)",
        card: "linear-gradient(90deg, #000 45%, #191B1F 100%)",
        "countdown-card":
          "linear-gradient(90deg, hsl(var(--secondary)) 0%, hsl(var(--primary)) 100%)",
        footer:
          "linear-gradient(30deg, #0B0C14 0%, rgba(0, 121, 255, 0.30) 30%, rgba(0, 121, 255, 0.30) 60%, #0B0C14 100%);",
        "generator-queue":
          "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/generator/queue.png')",
        toast: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75))",
      },
      animation: {
        rotate: "rotate 10s linear infinite",
        "loading-dot": "loading-dot 1.2s ease-out infinite",
        like: "like 0.4s cubic-bezier(.74,-0.73,0,2.12)",
        dislike: "dislike 0.4s cubic-bezier(.74,-0.73,0,2.12)",
        "loading-horizontal": "loading-horizontal 2s linear infinite alternate",
        "slide-in": "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        hide: "hide 100ms ease-in",
        "shrink-horizontal": "shrink-horizontal 150ms ease-in forwards",
      },
      keyframes: {
        rotate: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "loading-dot": {
          "0%": {
            height: "4px",
            width: "4px",
            backgroundColor: "rgba(245, 84, 44, 1)",
          },
          "25%": {
            height: "6px",
            width: "6px",
            backgroundColor: "rgba(245, 84, 44, 0.60)",
          },
          "50%": {
            height: "8px",
            width: "8px",
            backgroundColor: "rgba(245, 84, 44, 1)",
          },
          "75%": {
            height: "6px",
            width: "6px",
            backgroundColor: "rgba(245, 84, 44, 0.60)",
          },
          "100%": { height: "4px", width: "4px", backgroundColor: "#F5542C" },
        },
        like: {
          "0%": {
            height: "30px",
            width: "30px",
            fill: "var(--secondary)",
            color: "var(--secondary)",
          },
          "100%": {
            height: "26px",
            width: "26px",
            fill: "var(--secondary)",
            color: "var(--secondary)",
          },
        },
        dislike: {
          "0%": {
            height: "26px",
            width: "26px",
            fill: "var(--background)",
            color: "var(--primary)",
          },
          "100%": {
            height: "30px",
            width: "30px",
            fill: "hsl(var(--background))",
            color: "hsl(var(--primary))",
          },
        },
        hide: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
        "shrink-horizontal": {
          from: {
            transform: "scaleX(1)",
          },
          to: {
            transform: "scaleX(0)",
          },
        },
        slideIn: {
          from: {
            transform: "translateX(calc(100% + 25px))",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "loading-horizontal": {
          "0%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, rgba(196, 196, 196, 1) 20%)",
          },
          "10%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, rgba(196, 196, 196, 1) 30%)",
          },
          "20%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, rgba(196, 196, 196, 1) 40%)",
          },
          "30%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, rgba(196, 196, 196, 1) 50%)",
          },
          "40%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, rgba(196, 196, 196, 1) 60%)",
          },
          "50%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 0%, rgba(196, 196, 196, 1) 70%)",
          },
          "60%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 20%, rgba(196, 196, 196, 1) 80%)",
          },
          "70%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 40%, rgba(196, 196, 196, 1) 90%)",
          },
          "80%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 60%, rgba(196, 196, 196, 1) 100%)",
          },
          "90%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 80%, rgba(196, 196, 196, 1) 100%)",
          },
          "100%": {
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)) 100%, rgba(196, 196, 196, 1) 100%)",
          },
        },
      },
      boxShadow: {
        unlock: "0px 1px 5px 2px rgba(245, 84, 44, 0.5)",
        login: "0px 1px 5px 2px rgba(0, 121, 255, 0.5)",
        private: "0px 1px 20px 0px rgba(245, 84, 44, 1)",
        dialog: "0px 12px 24px -6px hsl(var(--primary))",
        "user-message": "0px 1px 40px -6px hsl(var(--primary))",
        "selected-subscription": "0px 1px 15px 0px rgba(148, 148, 148, 0.50)",
      },
      animationDelay: {
        "300ms": "0.3s",
        "600ms": "0.6s",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-textshadow"),
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: Record<string, any>) => void
    }) {
      addUtilities({
        ".delay-300ms": { "animation-delay": "0.3s" },
        ".delay-600ms": { "animation-delay": "0.6s" },
      })
    },
  ],
}
export default config
