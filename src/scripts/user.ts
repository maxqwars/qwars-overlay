import { Logger } from "./utils/Logger";

import {
  UserOverlayController,
  UserOverlayModel,
  UserOverlayView,
} from "./UserOverlay";

const overlay = new UserOverlayController(
  new UserOverlayModel(),
  new UserOverlayView(),
  new Logger("USER_OVERLAY_DEBUG")
);

overlay.run();

setInterval(function () {
  if (overlay.currentPage !== location.href) {
    overlay.reInit();
  }
}, 100);
