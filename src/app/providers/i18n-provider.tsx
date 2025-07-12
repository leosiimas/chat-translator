'use client'

import { ReactNode, useState, useEffect } from 'react'
import { NextIntlClientProvider } from 'next-intl'

type Props = {
  children: ReactNode
}

export function I18nProvider({ children }: Props) {
  const [locale, setLocale] = useState('pt')
  const [messages, setMessages] = useState<Record<string, string> | null>(null)

  useEffect(() => {
    import(`../locale/${locale}.json`).then((mod) => {
      setMessages(mod.default)
    })
  }, [locale])

  if (!messages) return null

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LanguageContext.Provider value={{ locale, setLocale }}>
        {children}
      </LanguageContext.Provider>
    </NextIntlClientProvider>
  )
}

import { createContext, useContext } from 'react'

type LanguageContextType = {
  locale: string
  setLocale: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'pt',
  setLocale: () => {},
})

export const useLanguage = () => useContext(LanguageContext)
