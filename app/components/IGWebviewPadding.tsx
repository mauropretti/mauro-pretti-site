'use client'
import { useEffect } from 'react'

export default function IGWebviewPadding() {
  useEffect(() => {
    const ua = navigator.userAgent || ''
    if (/Instagram/.test(ua)) {
      document.documentElement.classList.add('ig-webview')
    }
  }, [])
  return null
}