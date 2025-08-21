export default function Footer() {
  return (
    <footer className="mt-12 border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} Simple Store
      </div>
    </footer>
  );
}
