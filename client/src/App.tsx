import { useState } from 'react';
import URLForm from './components/UrlForm';
import ResultsTable from './components/ResultsTable';
import type Result from './types';

export default function App() {
  const [results, setResults] = useState<Result[]>([]);

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <nav className="bg-[#fcfcfc] text-gray-700 py-6 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-8">
          <a href="/" className="text-xl font-semibold tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <span className="text-yellow-500">Ping</span>Verge
          </a>
        </div>
      </nav>
      <div className="p-8">
        <URLForm onResults={setResults} />
        {results.length > 0 && <ResultsTable results={results} />}
      </div>
    </div>
  );
}