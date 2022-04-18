import { UserOverlayModel } from "./UserOverlayModel";
import { UserOverlayView } from "./UserOverlayView";
import { Logger } from "../utils/Logger";

export class UserOverlayController {
  private _model: UserOverlayModel;
  private _view: UserOverlayView;
  private _logger: Logger;
  private _currentPage: string;

  constructor(model: UserOverlayModel, view: UserOverlayView, logger: Logger) {
    this._model = model;
    this._view = view;
    this._logger = logger;
  }

  get currentPage(): string {
    return this._currentPage;
  }

  public async run() {
    this._init();
  }

  private _init() {
    this._currentPage = location.href;
    this._model.init();
    this._view.init();
  }

  public reInit() {
    this._view.init();
    this._currentPage = location.href;
    this._logger.log("Re-init UserOverlayController");
  }
}
