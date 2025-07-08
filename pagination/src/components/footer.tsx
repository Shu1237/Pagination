



export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2025 Admin Panel. All rights reserved.
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </div>

            {/* Version info */}
            <div className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
