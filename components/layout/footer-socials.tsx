'use client'

import { SocialIcon } from 'react-social-icons'

const socialLinks = [
  { url: 'https://twitter.com/omnicard', label: 'Twitter' },
  { url: 'https://linkedin.com/company/omnicard', label: 'LinkedIn' },
  { url: 'https://instagram.com/omnicard', label: 'Instagram' },
]

export function FooterSocials() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <SocialIcon
          key={social.url}
          url={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          style={{ width: 32, height: 32 }}
          bgColor="transparent"
          fgColor="currentColor"
          className="text-muted-foreground hover:text-foreground transition-colors"
        />
      ))}
    </div>
  )
}
