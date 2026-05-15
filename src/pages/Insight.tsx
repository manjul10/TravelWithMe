import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";

const Insight = () => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);
  const { cities } = useAppSelector((state) => state.cities);

  const analyze = async () => {
    if (cities.length === 0 || loading) return;

    setIsLoading(true);
    setInsight("");

    try {
      const cityData = cities
        .map(
          (city) =>
            `- ${city.cityName}: ${city.notes || "No specific notes provided."}`,
        )
        .join("\n");

      const prompt = `You are a travel psychologist. Based on this travel history:
      ${cityData}

      Task: Provide a 3-sentence analysis of MY travel personality. 
      IMPORTANT: Speak directly to me using "You" and "Your". Do not say "The user".`;

      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen2:0.5b", 
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Ollama is not responding. Make sure it's running with OLLAMA_ORIGINS='http://localhost:5173' ollama serve");
      }

      const data = await response.json();
      setInsight(data.response);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to connect to local AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-1">
      <button
        onClick={analyze}
        disabled={loading || cities.length === 0}
        className="bg-purple-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-100
      disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none transition-all hover:bg-purple-700 active:scale-[0.98]"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Analyzing...</span>
          </div>
        ) : (
          "✨ Generate Travel Insights"
        )}
      </button>

      {insight && (
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
          <h3 className="text-purple-600 font-bold mb-3 uppercase text-[10px] tracking-[0.2em]">
            Your Travel Persona
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed italic">"{insight}"</p>
        </div>
      )}

      {cities.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-xs">Add cities to unlock AI analysis</p>
        </div>
      )}
    </div>
  );
};

export default Insight;
