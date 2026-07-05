function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-3">
          CommUnity AI
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Turning Community Signals into Trusted Decisions
        </p>
        <button
          id="submit-incident-btn"
          type="button"
          className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg"
        >
          Submit Incident
        </button>
      </div>
    </main>
  );
}

export default LandingPage;
