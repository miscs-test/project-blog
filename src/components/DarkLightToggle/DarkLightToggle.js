"use client"
import React from 'react';
import { Sun, Moon } from 'react-feather';
import VisuallyHidden from '@/components/VisuallyHidden';
import styles from './DarkLightToggle.module.css'
import Cookies from 'js-cookie';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

function DarkLightToggle({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)

  function handleClick() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme)

    Cookies.set('color-theme', nextTheme, {
      expires: 365
    })

    const root = document.documentElement
    root.setAttribute('data-color-theme', nextTheme)

    const colors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS
    Object.keys(colors).forEach((key) => {
      root.style.setProperty(key, colors[key])
    })
  }

  return (
    <button className={styles.wrapper} onClick={handleClick} {...delegated}>
      {
        theme === 'light' ?
          <Sun size="1.5rem" />
          : <Moon size="1.5rem" />
      }
      <VisuallyHidden>
        Toggle dark / light mode
      </VisuallyHidden>
    </button>
  )
}

export default DarkLightToggle;
