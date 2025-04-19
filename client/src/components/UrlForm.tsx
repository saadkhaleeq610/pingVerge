import { useState } from 'react';
import type Result from '../types';


interface Props {
  onResults: (results: Result[]) => void;
}

export default function URLForm({ onResults }: Props) {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("clicked");
    e.preventDefault();
    const urlList = urls
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter(Boolean);

    if (!urlList.length) return;

    setLoading(true);
    try {
      console.log("Submitting URLs:", urlList);
      const res = await fetch("http://localhost:8080/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList }),
      });
      const data = await res.json();
      onResults(data);
      console.log("Results:", data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <textarea
        className="w-full p-4 border rounded-sm focus:outline-none focus:ring-0"
        rows={6}
        placeholder="Enter URLs separated by commas or new lines"
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer text-white py-2 rounded-sm transition disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check Status"}
      </button>
    </form>
  );
}  