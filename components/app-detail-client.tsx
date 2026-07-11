'use client';

import { useState } from 'react';
import { Download, Shield, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AppItem, AppListItem } from '@/lib/types';
import { formatDownloads } from '@/lib/queries';

export function DownloadButton({ app }: { app: AppItem }) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [downloadInfo, setDownloadInfo] = useState<{
    checksum: string;
    downloadUrl: string;
  } | null>(null);

  const handleDownload = async () => {
    setState('loading');
    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId: app.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Download failed');
      }

      const data = await res.json();
      setDownloadInfo({
        checksum: data.checksum,
        downloadUrl: data.download_url,
      });
      setState('success');
    } catch (err) {
      console.error('Download error:', err);
      setState('error');
    }
  };

  if (state === 'success' && downloadInfo) {
    return (
      <div className="space-y-3">
        <a
          href={downloadInfo.downloadUrl}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-success text-white font-semibold text-sm hover:shadow-lg hover:shadow-success/40 transition-all"
        >
          <Download className="w-4 h-4" />
          Descargar APK
        </a>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle className="w-4 h-4 text-success" />
          <span>Token verificado — SHA-256: {downloadInfo.checksum?.slice(0, 16)}...</span>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-destructive text-destructive-foreground font-semibold text-sm hover:shadow-lg transition-all"
        >
          <AlertTriangle className="w-4 h-4" />
          Reintentar
        </button>
        <p className="text-xs text-destructive">
          Error al generar token de descarga. Intenta de nuevo.
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleDownload}
      disabled={state === 'loading'}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-primary/40 transition-all hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
    >
      {state === 'loading' ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generando token...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Descargar APK
        </>
      )}
    </button>
  );
}

interface AppDetailClientProps {
  app: AppItem;
  related: AppListItem[];
}

export function AppDetailClient({ app, related: _related }: AppDetailClientProps) {
  return (
    <div className="min-h-screen container mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
        <a href="/" className="hover:text-primary">Inicio</a>
        <span>/</span>
        <a href={app.type === 'game' ? '/games' : '/apps'} className="hover:text-primary capitalize">
          {app.type === 'game' ? 'Juegos' : 'Apps'}
        </a>
        <span>/</span>
        <span className="text-foreground">{app.title}</span>
      </div>

      <div className="glass-card p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden ring-2 ring-border/50 shrink-0">
            <img
              src={app.icon_url}
              alt={app.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{app.title}</h1>
            <p className="text-sm text-muted-foreground mb-3">
              by {app.developer}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold">{app.rating}</span>
                <span className="text-warning">★★★★★</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {formatDownloads(app.downloads)} descargas
              </div>
              <div className="text-sm text-muted-foreground">
                {app.file_size}
              </div>
              <div className="text-sm text-muted-foreground">
                v{app.version}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DownloadButton app={app} />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground glass px-3 py-2 rounded-full">
                <Shield className="w-3.5 h-3.5 text-success" />
                SHA-256 Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8 mb-6">
        <h2 className="text-lg font-bold mb-3">Descripcion</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {app.description}
        </p>
      </div>

      {app.screenshots && app.screenshots.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Capturas de pantalla</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {app.screenshots.map((screenshot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="shrink-0 w-[200px] md:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden ring-2 ring-border/50"
              >
                <img
                  src={screenshot}
                  alt={`${app.title} screenshot ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="glass-card p-6 md:p-8 mb-6">
        <h2 className="text-lg font-bold mb-4">Informacion</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InfoItem label="Version" value={app.version} />
          <InfoItem label="Tamaño" value={app.file_size} />
          <InfoItem label="Desarrollador" value={app.developer} />
          <InfoItem label="Categoria" value={app.category?.name || 'N/A'} />
          <InfoItem label="Descargas" value={formatDownloads(app.downloads)} />
          <InfoItem label="Valoracion" value={`${app.rating} / 5`} />
          <InfoItem label="Tipo" value={app.type === 'game' ? 'Juego' : 'App'} />
          <InfoItem
            label="Actualizado"
            value={new Date(app.updated_at).toLocaleDateString('es')}
          />
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-success" />
          <h2 className="text-lg font-bold">Seguridad e Integridad</h2>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success shrink-0" />
            <span>Archivo verificado con checksum SHA-256</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success shrink-0" />
            <span>Descarga mediante token seguro (sin hotlinking)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-success shrink-0" />
            <span>Almacenamiento en nube con acceso privado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-medium truncate">{value}</p>
    </div>
  );
}
