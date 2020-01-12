import {
  OPTION_CLS,
  OPTION_FOCUSED_CLS,
  OPTION_DISABLED_CLS,
  OPTION_SELECTED_CLS,
  CARET_ICON_CLS,
  CLEAR_ICON_CLS,
  AUTOSIZE_INPUT_CLS,
  MENU_CONTAINER_CLS,
  SELECT_CONTAINER_CLS,
  CONTROL_CONTAINER_CLS
} from '../../src/constants/dom';

const CLASS_NAME_HTML =
  `<div class="${SELECT_CONTAINER_CLS}">
  <div class="${CONTROL_CONTAINER_CLS}">
    <div>
      <div>Select option..</div>
      <div>
        <input
          value=""
          type="text"
          class="${AUTOSIZE_INPUT_CLS}"
        />
      </div>
    </div>
    <div>
      <div aria-hidden="true">
        <div class="${CLEAR_ICON_CLS}">X</div>
      </div>
      <div />
      <div aria-hidden="true">
        <div class="${CARET_ICON_CLS}" />
      </div>
    </div>
  </div>
  <div class="${MENU_CONTAINER_CLS}">
    <div>
      <div>
        <div class="${OPTION_CLS}">
          Option 1
        </div>
        <div class="${OPTION_CLS} ${OPTION_FOCUSED_CLS}">
          Option 2
        </div>
        <div class="${OPTION_CLS} ${OPTION_SELECTED_CLS}">
          Option 3
        </div>
        <div class="${OPTION_CLS} ${OPTION_DISABLED_CLS}">
          Option 4
        </div>
      </div>
    </div>
  </div>
</div>`;

export default CLASS_NAME_HTML;