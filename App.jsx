import React, { useState, useEffect } from "react";

function App() {
  const [participants, setParticipants] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamSize, setTeamSize] = useState(3);

  const BACKEND_URL = "http://127.0.0.1:8000";

  // Load participants & teams on mount
  useEffect(() => {
    fetch(`${BACKEND_URL}/participants`)
      .then((res) => res.json())
      .then((data) => {
        if (data.participants) setParticipants(data.participants);
      });

    fetch(`${BACKEND_URL}/teams`)
      .then((res) => res.json())
      .then((data) => {
        if (data.teams) setTeams(data.teams);
      });
  }, []);

  const formTeams = async () => {
    const res = await fetch(`${BACKEND_URL}/form_teams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_size: teamSize }),
    });

    const data = await res.json();
    if (data.teams) setTeams(data.teams);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800">
          🚀 Hackathon Team Maker
        </h1>

        {/* Two-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Side → Team Size + Participants */}
          <div className="flex flex-col bg-white p-6 rounded-xl shadow">
            {/* Team Size Input */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ⚙️ Team Settings
              </h2>
              <div className="flex items-center space-x-4">
                <label className="text-lg font-medium text-gray-700">
                  Team Size:
                </label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  onClick={formTeams}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow transition"
                >
                  Form Teams
                </button>
              </div>
            </div>

            {/* Participants */}
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                👥 Participants
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {participants.map((p, i) => (
                  <li key={i} className="leading-relaxed">
                    <span className="font-medium">{p.name}</span> –{" "}
                    {p.skills.join(", ")}{" "}
                    <span className="text-gray-500">(Exp {p.experience})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side → Teams */}
          <div className="flex flex-col bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🏆 Teams
            </h2>

            {teams.length === 0 && (
              <p className="text-gray-500 italic">No teams formed yet.</p>
            )}

            <div className="grid gap-6 mt-4 flex-1">
              {teams.map((team, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <h3 className="font-bold text-lg text-blue-700 mb-2">
                    Team {i + 1}
                  </h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700">
                    {team.map((member, j) => (
                      <li key={j} className="leading-relaxed">
                        <span className="font-medium">{member.name}</span> –{" "}
                        {member.skills.join(", ")}{" "}
                        <span className="text-gray-500">
                          (Exp {member.experience})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
