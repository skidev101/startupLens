import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-400 border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by monaski
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}