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
  CONTROL_CONTAINER_CLS,
  PLACEHOLDER_DEFAULT
} from '../../../src/constants';

export const CLASS_NAME_HTML =
  `<div class="${SELECT_CONTAINER_CLS}">
  <div class="${CONTROL_CONTAINER_CLS}">
    <div>
      <div>${PLACEHOLDER_DEFAULT}</div>
      <div>
        <input
          value=""
          type="text"
          class="${AUTOSIZE_INPUT_CLS}"
        />
        ::after
      </div>
    </div>
    <div>
      <div>
        <svg
          aria-hidden="true"
          viewBox="0 0 14 16"
          class="${CLEAR_ICON_CLS}"
        >
          <path
            fillRule="evenodd"
            d="M7.71 8.23l3.75 3.75-1.48..."
          />
        </svg>
      </div>
      <span />
      <div>
        <div
          aria-hidden="true"
          class="${CARET_ICON_CLS}"
        />
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