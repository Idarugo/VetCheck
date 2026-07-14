import { useEffect, useState } from 'react'
import { Icon } from './Icon'
import './InstallPrompt.css'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  )
}

export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIosHelp, setShowIosHelp] = useState(false)
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem('vc-install-dismissed') === '1',
  )

  useEffect(() => {
    function onPrompt(e: Event) {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', () => setDeferred(null))
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (dismissed || isStandalone()) return null

  // Ni Android/desktop instalable ni iOS → no mostrar nada.
  const canInstall = deferred !== null
  const iosEligible = isIos()
  if (!canInstall && !iosEligible) return null

  function close() {
    setDismissed(true)
    sessionStorage.setItem('vc-install-dismissed', '1')
  }

  async function install() {
    if (!deferred) {
      setShowIosHelp(true)
      return
    }
    await deferred.prompt()
    await deferred.userChoice
    setDeferred(null)
  }

  return (
    <div className="install-bar" role="region" aria-label="Instalar aplicación">
      <div className="container install-inner">
        <span className="install-icon">
          <Icon name="shield-check" size={22} />
        </span>
        <div className="install-text">
          <strong>Instala VetCheck en tu celular</strong>
          {showIosHelp && iosEligible ? (
            <p>
              Toca el botón «Compartir» y luego «Agregar a pantalla de inicio».
            </p>
          ) : (
            <p>Úsala como app, a pantalla completa y con acceso directo.</p>
          )}
        </div>
        <button className="btn btn-cta install-btn" onClick={install}>
          <Icon name="upload" size={18} /> Instalar
        </button>
        <button className="install-close" onClick={close} aria-label="Cerrar aviso de instalación">
          <Icon name="x" size={18} />
        </button>
      </div>
    </div>
  )
}
