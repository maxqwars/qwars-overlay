import Logger from "./utils/Logger";

// TODO: Use MVC, btw!
// class QOverlayController {}
// class QOverlayModel {}
// class QOverlayView {}

class QWARSOverlay {
  private _logger: Logger;
  private _currentPage: string;

  constructor(logger: Logger) {
    this._logger = logger;
    this._currentPage = location.href;
  }

  get currentPage(): string {
    return this._currentPage;
  }

  reload() {
    this._currentPage = location.href;
    this._logger.log("Reload qwars-overlay config");
  }
}

// Init
const logger = new Logger("QWARS_OVERLAY_USER_SCRIPT:");
const overlay = new QWARSOverlay(logger);

// Watch url changes
setInterval(() => {
  if (overlay.currentPage !== location.href) {
    overlay.reload();
  }
}, 100);
