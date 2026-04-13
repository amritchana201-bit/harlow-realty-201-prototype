import { Phone, Mail, MapPin } from 'lucide-react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#properties', label: 'Properties' },
  { href: '#agents', label: 'Agents' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#030F0F] text-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-8">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-2xl font-semibold mb-4">
                <span className="text-[#F5F5F5]">Harlow</span>{' '}
                <span className="text-[#27e9b5]">Realty</span>
              </h3>
              <p className="text-[#F5F5F5]/80 leading-relaxed max-w-md">
                Premium real estate services in Toronto and the Greater Toronto
                Area. Your trusted partner in finding the perfect home.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-start-1 row-start-2 md:col-start-auto md:row-start-auto">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-start-1 row-start-3 md:col-start-auto md:row-start-auto md:order-4 lg:order-none flex flex-col items-start md:items-start text-left md:text-left">
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4 w-full">
                <li className="flex justify-start md:justify-start">
                  <a
                    href="tel:4165550100"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Phone size={18} className="flex-shrink-0" />
                    <span>(416) 555-0100</span>
                  </a>
                </li>
                <li className="flex justify-start md:justify-start">
                  <a
                    href="mailto:info@harlowrealty.ca"
                    className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                  >
                    <Mail size={18} className="flex-shrink-0" />
                    <span>info@harlowrealty.ca</span>
                  </a>
                </li>
                <li className="flex justify-start md:justify-start">
                  <div className="flex items-start gap-3 text-white/80">
                    <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                    <span>
                      123 Bay Street, Suite 400
                      <br />
                      Toronto, ON M5J 2T2
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Hours */}
            <div className="col-start-2 row-start-2 md:col-start-auto md:row-start-auto md:order-3 lg:order-none flex flex-col items-end md:items-start text-right md:text-left">
              <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
              <ul className="space-y-2 text-white/80 w-full max-w-[220px] md:max-w-none text-sm md:text-base">
                <li className="flex justify-between gap-2 sm:gap-4">
                  <span className="whitespace-nowrap">Mon - Fri:</span>
                  <span className="whitespace-nowrap">9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between gap-2 sm:gap-4">
                  <span className="whitespace-nowrap">Saturday:</span>
                  <span className="whitespace-nowrap">10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between gap-2 sm:gap-4">
                  <span className="whitespace-nowrap">Sunday:</span>
                  <span className="whitespace-nowrap">By Appointment</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-white/70">
                {currentYear} Harlow Realty. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-white/70">
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  aria-label="Terms of Service"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}
