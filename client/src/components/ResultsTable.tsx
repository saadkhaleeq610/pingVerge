import Result from "../types";

export default function ResultsTable({ results }: { results: Result[] }) {
  console.log("Rendering results:", results)
  return (
    <div className="mt-8 max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-sm font-medium text-gray-600">URL</th>
              <th className="p-3 text-sm font-medium text-gray-600">Status</th>
              <th className="p-3 text-sm font-medium text-gray-600">Code</th>
              <th className="p-3 text-sm font-medium text-gray-600">Time (ms)</th>
              <th className="p-3 text-sm font-medium text-gray-600">Error</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-3 text-sm text-blue-800 break-words">{result.url}</td>
                <td
                  className={`p-3 text-sm font-semibold ${
                    result.statusCode === "200 OK"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {result.statusCode}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {result.statusText}
                </td>
                <td className="p-3 text-sm text-gray-700">
                  {result.responseMS ?? "-"}
                </td>
                <td className="p-3 text-sm text-red-500 break-words max-w-[200px]">
                  {result.error || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
