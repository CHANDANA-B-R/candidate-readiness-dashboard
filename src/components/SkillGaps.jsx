import { useState } from 'react';
import { callGeminiAPI } from '../utils/geminiAPI';

export default function SkillGaps({ cvText, jdText }) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSkillGaps = async () => {
    setLoading(true);

    const prompt = `Based on the following Candidate CV and Job Description, identify 3-5 key skill gaps.
CV: ${cvText}
Job Description: ${jdText}

For each skill gap, suggest a very brief mini-assignment or learning snippet (1-2 sentences) to help close that gap.

Format your response clearly with these exact sections:
Skill Gaps:
- [Skill 1]: [Mini-assignment/Learning snippet]
- [Skill 2]: [Mini-assignment/Learning snippet]`;

    const result = await callGeminiAPI(prompt);
    setResponse(result);
    setLoading(false);
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleSkillGaps}
        disabled={loading}
        className={`px-6 py-2 font-semibold rounded-md text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {loading ? 'Identifying...' : 'Identify Skill Gaps'}
      </button>

      {response && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Skill Gaps & Suggestions</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg border border-gray-300 text-sm text-gray-800 overflow-x-auto">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
}
