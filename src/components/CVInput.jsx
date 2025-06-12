
export default function CVInput({ onTextChange }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Candidate CV</h2>
      <textarea
        onChange={(e) => onTextChange(e.target.value)}
        rows="10"
        placeholder="Paste CV here..."
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
      />
    </div>
  );
}
