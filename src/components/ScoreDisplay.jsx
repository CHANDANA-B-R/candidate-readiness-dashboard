import { useState } from 'react';
import { callGeminiAPI } from '../utils/geminiAPI';

export default function ScoreDisplay({ cvText, jdText }) {
  const [response, setResponse] = useState('');
  const [optimizedCV, setOptimizedCV] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    const prompt = `Analyze the following Candidate CV and Job Description.
CV: ${cvText}
Job Description: ${jdText}

Provide a score for how well the CV matches the JD out of 100.
Then, provide an optimized version of the CV that is better tuned to the Job Description.
Finally, give a new score for the optimized CV out of 100.

Format your response clearly with these exact sections:
Original CV Match Score: [Score]%
Optimized CV Text: [Optimized CV Content]
Optimized CV Match Score: [Score]%`;

    const result = await callGeminiAPI(prompt);
    setResponse(result);

    const match = result.match(/Optimized CV Text:\s*([\s\S]*?)Optimized CV Match Score:/);
    if (match) {
      setOptimizedCV(match[1].trim());
    }

    setLoading(false);
  };

  const downloadOptimizedCV = () => {
    const blob = new Blob([optimizedCV], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'optimized_cv.txt';
    link.click();
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleMatch}
        disabled={loading}
        className={`px-6 py-2 font-semibold rounded-md text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Matching...' : 'Match & Score CV'}
      </button>

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">CV Match Report</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg border border-gray-300 text-sm text-gray-800 overflow-x-auto">
            {response}
          </pre>

          {optimizedCV && (
            <button
              onClick={downloadOptimizedCV}
              className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md"
            >
              Download Optimized CV
            </button>
          )}
        </div>
      )}
    </div>
  );
}
