import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-garden-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-garden-100 text-sm leading-relaxed">
              The Greenville Garden Club was established in 1939. We are dedicated to promoting
              gardening, environmental awareness, and community beautification.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/history" className="text-garden-100 hover:text-white transition-colors">
                  Our History
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-garden-100 hover:text-white transition-colors">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link href="/plant-questions" className="text-garden-100 hover:text-white transition-colors">
                  Ask Plant Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-garden-100 hover:text-white transition-colors">
                  Blog & Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-garden-100 text-sm mb-4">
              Follow us on social media to stay updated on our latest events and gardening tips.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-garden-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-garden-700 text-center text-sm text-garden-100">
          <p>&copy; {currentYear} Greenville Garden Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

