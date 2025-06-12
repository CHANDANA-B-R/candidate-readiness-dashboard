export default function JDInput({ onTextChange }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Job Description</h2>
      <textarea
        onChange={(e) => onTextChange(e.target.value)}
        rows="10"
        placeholder="Paste JD here..."
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
      />
    </div>
  );
}
