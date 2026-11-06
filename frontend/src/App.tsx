import { useEffect, useState } from 'react';

export default function App() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-slate-800">
        Mi Carrito {status === 'ok' && <span className="text-green-600 font-semibold">OK</span>}
      </h1>
    </div>
  );
}