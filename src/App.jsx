import { useState } from 'react';
import CVInput from './components/CVInput';
import JDInput from './components/JDInput';
import ScoreDisplay from './components/ScoreDisplay';
import SkillGaps from './components/SkillGaps';

function App() {
  const [cvText, setCvText] = useState('');
  const [jdText, setJdText] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-8">
          SKANJO Candidate Readiness Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <CVInput onTextChange={setCvText} />
          <JDInput onTextChange={setJdText} />
        </div>

        <ScoreDisplay cvText={cvText} jdText={jdText} />
        <SkillGaps cvText={cvText} jdText={jdText} />
      </div>
    </div>
  );
}

export default App;
